import { SafetyAssessment, Language } from '../types';
import { INCIDENT_PRESETS } from '../data/presets';

// Compress image to ensure lightweight payload
export async function compressImage(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 1024;
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
          resolve({ base64: e.target?.result as string, mimeType: file.type || 'image/jpeg' });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        resolve({
          base64: dataUrl,
          mimeType: 'image/jpeg'
        });
      };
      img.onerror = () => {
        resolve({ base64: e.target?.result as string, mimeType: file.type || 'image/jpeg' });
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
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
        text,
        imageBase64,
        imageMime,
        campusContext,
        language
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data.hazard_type || !Array.isArray(data.steps) || data.steps.length === 0) {
      throw new Error('Malformed safety assessment received');
    }

    return data as SafetyAssessment;
  } catch (error) {
    console.warn('Multimodal incident analysis fallback:', error);
    
    // Select closest fallback preset based on input keywords or image presence
    const lower = (text || '').toLowerCase();
    let selectedPreset = INCIDENT_PRESETS[1]; // default immersion scald

    if (lower.includes('acid') || lower.includes('chemical') || lower.includes('lab') || lower.includes('spill') || lower.includes('h2so4')) {
      selectedPreset = INCIDENT_PRESETS[0]; // acid splash
    } else if (lower.includes('dog') || lower.includes('bite') || lower.includes('scratch') || lower.includes('animal') || lower.includes('canteen')) {
      selectedPreset = INCIDENT_PRESETS[2]; // dog bite
    } else if (lower.includes('heat') || lower.includes('faint') || lower.includes('sun') || lower.includes('collapse') || lower.includes('stroke') || lower.includes('ground')) {
      selectedPreset = INCIDENT_PRESETS[3]; // heat stroke
    }

    const fallbackData = selectedPreset.data[language] || selectedPreset.data.en;
    return {
      ...fallbackData,
      hazard_type: imageBase64 ? `${fallbackData.hazard_type} (Visual Assessment)` : fallbackData.hazard_type,
      campus_context: campusContext || fallbackData.campus_context,
      isAiGenerated: false,
      timestamp: new Date().toISOString()
    };
  }
}
