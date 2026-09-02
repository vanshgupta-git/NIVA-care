import { SafetyAssessment, Language } from '../types';
import { INCIDENT_PRESETS } from '../data/presets';

// Validate file before processing
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(file.type.toLowerCase())) {
    return { valid: false, error: 'Unsupported format. Please upload a JPG, PNG, or WEBP image.' };
  }

  const MAX_SIZE_MB = 15;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return { valid: false, error: `File too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum size is ${MAX_SIZE_MB}MB.` };
  }

  return { valid: true };
}

// Compress and encode image cleanly with memory management
export async function compressImage(file: File): Promise<{ base64: string; mimeType: string; previewUrl: string }> {
  return new Promise((resolve, reject) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      reject(new Error(validation.error));
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      // Clean up object URL immediately after image is loaded into memory
      URL.revokeObjectURL(objectUrl);

      const canvas = document.createElement('canvas');
      const MAX_DIM = 1200;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_DIM) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        }
      } else {
        if (height > MAX_DIM) {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        // Fallback to reading file directly
        const fallbackReader = new FileReader();
        fallbackReader.onload = (e) => {
          const res = e.target?.result as string;
          resolve({ base64: res, mimeType: file.type || 'image/jpeg', previewUrl: res });
        };
        fallbackReader.onerror = (err) => reject(err);
        fallbackReader.readAsDataURL(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

      resolve({
        base64: dataUrl,
        mimeType: 'image/jpeg',
        previewUrl: dataUrl
      });
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to decode image.'));
    };

    img.src = objectUrl;
  });
}

export async function analyzeIncident(params: {
  text: string;
  imageBase64?: string | null;
  imageMime?: string | null;
  campusContext: string;
  language: Language;
}): Promise<SafetyAssessment> {
  const { text, imageBase64, imageMime, campusContext, language } = params;

  try {
    const response = await fetch('/api/analyze-incident', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text || '',
        imageBase64: imageBase64 || null,
        imageMime: imageMime || (imageBase64 ? 'image/jpeg' : null),
        campusContext: campusContext || 'Indian Campus',
        language: language || 'en'
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data.hazard_type || !Array.isArray(data.steps) || data.steps.length === 0) {
      throw new Error('Malformed safety assessment received from server');
    }

    // Default calculated score based on severity if score is not provided
    const defaultScore = data.severity === 'critical' ? 92 : data.severity === 'moderate' ? 68 : 35;

    return {
      hazard_type: data.hazard_type,
      severity: data.severity || 'moderate',
      score: typeof data.score === 'number' ? data.score : defaultScore,
      summary: data.summary || `Clinical triage diagnosis for ${data.hazard_type} at ${data.campus_context}.`,
      strengths: Array.isArray(data.strengths) && data.strengths.length > 0 
        ? data.strengths 
        : ['Vital signs stable', 'Consciousness preserved', 'No arterial pulsatile bleeding'],
      weaknesses: Array.isArray(data.weaknesses) && data.weaknesses.length > 0 
        ? data.weaknesses 
        : ['Acute physical trauma risk', 'Dermal integrity compromised', 'Infection & secondary inflammation risk'],
      detectedElements: Array.isArray(data.detectedElements) && data.detectedElements.length > 0 
        ? data.detectedElements 
        : [data.hazard_type, 'Tissue irritation', 'Immediate decontamination required'],
      actionableImprovements: Array.isArray(data.actionableImprovements) && data.actionableImprovements.length > 0 
        ? data.actionableImprovements 
        : ['Proceed to Campus Health Centre for physician review', 'Keep sterile dressing dry & clean', 'Monitor for swelling or fever'],
      campus_context: data.campus_context || campusContext,
      do_not_rules: Array.isArray(data.do_not_rules) ? data.do_not_rules : [],
      steps: data.steps,
      whatsapp_message: data.whatsapp_message || '',
      why_guidance: data.why_guidance,
      isAiGenerated: data.isAiGenerated !== false,
      timestamp: data.timestamp || new Date().toISOString(),
      analyzedImagePreview: imageBase64 || null
    };

  } catch (error) {
    console.warn('Multimodal incident analysis fallback:', error);
    
    // Select closest fallback preset based on input keywords or image presence
    const lower = (text || '').toLowerCase();
    let selectedPreset = INCIDENT_PRESETS[1]; // default scald

    if (lower.includes('acid') || lower.includes('chemical') || lower.includes('lab') || lower.includes('spill') || lower.includes('h2so4')) {
      selectedPreset = INCIDENT_PRESETS[0]; // acid splash
    } else if (lower.includes('dog') || lower.includes('bite') || lower.includes('scratch') || lower.includes('animal') || lower.includes('canteen')) {
      selectedPreset = INCIDENT_PRESETS[2]; // dog bite
    } else if (lower.includes('heat') || lower.includes('faint') || lower.includes('sun') || lower.includes('collapse') || lower.includes('stroke') || lower.includes('ground')) {
      selectedPreset = INCIDENT_PRESETS[3]; // heat stroke
    }

    const fallbackData = selectedPreset.data[language] || selectedPreset.data.en;
    const fallbackScore = fallbackData.severity === 'critical' ? 90 : fallbackData.severity === 'moderate' ? 65 : 30;

    return {
      ...fallbackData,
      score: fallbackScore,
      summary: `Clinical assessment protocol for ${fallbackData.hazard_type} at ${campusContext || fallbackData.campus_context}.`,
      strengths: ['Airway clear', 'Local first-aid protocol activated', 'Campus emergency grid reachable'],
      weaknesses: ['Trauma progression risk', 'Potential secondary infection', 'Delayed medical evaluation hazard'],
      detectedElements: [fallbackData.hazard_type, 'Acute physical symptoms', 'Procedural triage indicated'],
      actionableImprovements: ['Complete 60-second sequence before moving', 'Report to dispensary for clinical clearance'],
      campus_context: campusContext || fallbackData.campus_context,
      isAiGenerated: false,
      timestamp: new Date().toISOString(),
      analyzedImagePreview: imageBase64 || null
    };
  }
}
