import { GoogleGenAI, Type } from '@google/genai';

// Safe clinical fallback analyzer if network/AI is unreachable
function getFallbackAssessment(text: string, location: string, hasImage: boolean = false, language: string = 'en') {
  const lower = (text || '').toLowerCase();
  
  if (lower.includes('acid') || lower.includes('chemical') || lower.includes('h2so4') || lower.includes('spill') || lower.includes('lab')) {
    return {
      hazard_type: 'Chemical exposure / Acid burn',
      severity: 'critical' as const,
      overallScore: 94,
      codeQuality: 92,
      security: 96,
      efficiency: 95,
      testing: 88,
      accessibility: 90,
      problemStatementAlignment: 98,
      summary: 'High-risk corrosive chemical contact identified. Immediate copious running water irrigation is required to arrest dermal destruction.',
      strengths: ['Immediate chemical hazard classification', 'Continuous water decontamination protocol initiated', 'Campus quick response grid active'],
      weaknesses: ['Corrosive chemical penetration into dermis', 'Delayed irrigation increases deep necrosis hazard', 'Chemical vapor inhalation risk'],
      recommendations: ['Flush continuously under running tap water for 15+ minutes', 'Carefully remove contaminated clothing without spreading', 'Immediate transport to Campus Emergency Dispensary'],
      detectedElements: ['Chemical splash pattern', 'Epidermal erythema & burning', 'Hazardous reagent contact'],
      campus_context: location || 'Chemistry Lab — Lab Annex 3',
      why_guidance: 'NIVA identified concentrated acid contact requiring continuous water irrigation to arrest dermal destruction.',
      do_not_rules: [
        'Do NOT rub the affected area.',
        'Do NOT attempt to neutralize the chemical with another substance.',
        'Do NOT apply creams, toothpaste, ghee or other home remedies.'
      ],
      steps: [
        { title: 'Move away from the spill', duration_seconds: 10, action_detail: 'Move to a safe area while avoiding further contact with the chemical.' },
        { title: 'Start continuous water flushing', duration_seconds: 900, action_detail: 'Flush the affected skin with copious running tap water for 15 minutes.' },
        { title: 'Remove contaminated clothing', duration_seconds: 30, action_detail: 'Carefully remove contaminated clothing while avoiding spread.' },
        { title: 'Get medical assessment', duration_seconds: 60, action_detail: 'Contact the campus dispensary or emergency medical service.' }
      ],
      whatsapp_message: `🚨 CAMPUS EMERGENCY ALERT 🚨\n📍 Location: ${location || 'Chemistry Lab'}\n⚠️ Incident: Chemical exposure / acid burn\n🩹 Immediate Action: Continuous water flushing underway\n🚑 Action Needed: Campus medical response required`
    };
  }

  if (lower.includes('dog') || lower.includes('bite') || lower.includes('scratch') || lower.includes('animal') || lower.includes('canteen')) {
    return {
      hazard_type: 'Animal bite / Rabies exposure risk',
      severity: 'moderate' as const,
      overallScore: 78,
      codeQuality: 88,
      security: 82,
      efficiency: 85,
      testing: 79,
      accessibility: 90,
      problemStatementAlignment: 92,
      summary: 'Stray animal bite or scratch with high rabies transmission risk requiring mechanical soap-water wash and prompt vaccine protocol.',
      strengths: ['Direct bite wound recognition', 'Circulation and vitals intact', 'Dispensary Anti-Rabies Vaccine protocol accessible'],
      weaknesses: ['Rabies neurotropism hazard', 'High bacterial infection rate from animal saliva', 'Potential delayed medical presentation'],
      recommendations: ['Perform mechanical debridement under running soap-water for full 15 minutes', 'Administer Anti-Rabies Vaccine (ARV) Day 0 and Tetanus Toxoid', 'Do not suture wound'],
      detectedElements: ['Puncture laceration', 'Salivary contact', 'Local tissue erythema'],
      campus_context: location || 'Canteen Quadrangle',
      why_guidance: 'Identified high transmission risk bite needing urgent soap-water mechanical wash and ARV vaccine tracking.',
      do_not_rules: [
        'Do NOT apply turmeric, chili powder, band-aid, or suture the wound.',
        'Do NOT delay seeking formal anti-rabies vaccination (ARV).',
        'Do NOT attempt to capture or agitate the animal.'
      ],
      steps: [
        { title: 'Wash under running water with soap', duration_seconds: 900, action_detail: 'Vigorously wash the wound under running tap water with soap for a full 15 minutes.' },
        { title: 'Disinfect with Betadine or Alcohol', duration_seconds: 60, action_detail: 'Apply povidone-iodine or alcohol solution if available. Leave wound unbandaged.' },
        { title: 'Proceed to Campus Health Centre', duration_seconds: 300, action_detail: 'Report to dispensary for Rabies Post-Exposure Prophylaxis (PEP) Day 0 dose and Tetanus Toxoid.' }
      ],
      whatsapp_message: `🚨 CAMPUS HEALTH ALERT 🚨\n📍 Location: ${location || 'Canteen Quadrangle'}\n⚠️ Incident: Stray animal bite / scratch\n🩹 Immediate Action: 15-min running soap water wash initiated\n🏥 Action Needed: Medical Health Centre ARV / Immunoglobulin protocol`
    };
  }

  // Default visual trauma assessment
  return {
    hazard_type: hasImage ? 'Acute injury / Physical trauma (Visual Triage)' : 'Thermal / Mechanical injury',
    severity: 'moderate' as const,
    overallScore: 72,
    codeQuality: 86,
    security: 80,
    efficiency: 88,
    testing: 84,
    accessibility: 91,
    problemStatementAlignment: 94,
    summary: 'Clinical triage evaluation prioritizing bleeding control, wound stabilization, and sterile cooling.',
    strengths: ['Airway patent & consciousness intact', 'Stabilization protocol activated', 'Campus dispensary reachable'],
    weaknesses: ['Dermal barrier disruption', 'Infection hazard', 'Progressive localized swelling'],
    recommendations: ['Flush with sterile saline or cool tap water', 'Apply sterile non-stick dressing loosely', 'Consult campus health dispensary physician'],
    detectedElements: ['Visible tissue trauma', 'Localized erythema', 'Acute swelling'],
    campus_context: location || 'Campus Annex',
    why_guidance: 'Clinical triage assessment prioritized immediate bleeding control, stabilization, and sterile cooling.',
    do_not_rules: [
      'Do NOT apply unverified home remedies (ghee, toothpaste, turmeric powder).',
      'Do NOT rub or apply excessive pressure on open wounds.',
      'Do NOT remove deeply embedded objects yourself.'
    ],
    steps: [
      { title: 'Inspect & stabilize affected area', duration_seconds: 30, action_detail: 'Keep the injured area stationary and protected from further contact.' },
      { title: 'Clean with cool running water or saline', duration_seconds: 300, action_detail: 'Gently flush the area with clean water or sterile saline to remove debris.' },
      { title: 'Protect with clean dressing', duration_seconds: 60, action_detail: 'Cover loosely with sterile gauze or clean cloth without wrapping tightly.' },
      { title: 'Report to Campus Health Centre', duration_seconds: 120, action_detail: 'Proceed to dispensary for clinical examination and tetanus evaluation.' }
    ],
    whatsapp_message: `🚨 CAMPUS HEALTH ALERT 🚨\n📍 Location: ${location || 'Campus'}\n⚠️ Incident: Acute injury / trauma\n🩹 Immediate Action: First aid stabilization initiated\n🏥 Action Needed: Medical Health Centre evaluation`
  };
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { text, imageBase64, imageMime, campusContext, language = 'en' } = req.body || {};
  const hasImage = Boolean(imageBase64);
  const locationStr = campusContext || 'Indian Campus';
  const langCode = ['hi', 'ta', 'te'].includes(language) ? language : 'en';

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      console.log('Gemini API key missing. Serving fallback.');
      const fallback = getFallbackAssessment(text, locationStr, hasImage, langCode);
      return res.status(200).json({
        ...fallback,
        isAiGenerated: false,
        timestamp: new Date().toISOString()
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `You are NIVA — AI Campus Health & Emergency Evaluation Co-Pilot for Indian college, university, and engineering campuses.
Your mission is to analyze the uploaded visual evidence and incident parameters in ONE efficient evaluation request, producing exact structured JSON scores, clinical assessments, and 60-second procedural actions.

${hasImage ? `PRIMARY VISUAL-FIRST DIRECTIVE:
An image has been uploaded as the ground-truth evidence. You MUST inspect and evaluate directly from the visual evidence in the image (e.g., wound characteristics, burn depth, chemical discoloration, laceration, bleeding, animal bite marks, swelling, eye trauma, skin rash, or physical posture).
DO NOT default to thermal burns unless the photo explicitly shows a thermal burn. Accurately identify what is visible in the photograph (e.g. cut/laceration, abrasion, animal bite, chemical spill, eye injury, fracture/swelling, rash, etc.).
DO NOT rely on, require, or wait for text descriptions.` : ''}

LANGUAGE DIRECTIVE:
Respond in the language specified: '${langCode}' (en = English, hi = Hindi, ta = Tamil, te = Telugu).
All text in hazard_type, summary, strengths, weaknesses, recommendations, do_not_rules, steps (title and action_detail), and whatsapp_message MUST be translated clearly into the target language.

STRICT SCORING & SCHEMA RULES:
- overallScore: Integer between 0 and 100 representing overall quality/safety urgency index.
- codeQuality: Integer between 0 and 100 representing clinical protocol quality & procedural adherence.
- security: Integer between 0 and 100 representing safety containment & hazard isolation.
- efficiency: Integer between 0 and 100 representing response speed & immediate action effectiveness.
- testing: Integer between 0 and 100 representing clinical verification & evidence validation score (if evidence is visible and validated, provide an accurate score between 70-98; if absent, rate appropriately).
- accessibility: Integer between 0 and 100 representing clarity and ease of instruction execution.
- problemStatementAlignment: Integer between 0 and 100 representing accuracy of visual diagnosis to the incident.
- hazard_type: Concise, specific medical or physical hazard diagnosis (e.g., "Chemical exposure / Acid burn", "Deep laceration with bleeding", "Canine bite wound", "Abrasion trauma", "Contact dermatitis / Chemical rash", "Thermal scald").
- severity: Must be EXACTLY one of: "minor", "moderate", "critical".
- summary: 1-2 sentence clinical evaluation of the image and incident evidence.
- strengths: Array of 2-3 positive indicators or stabilizing factors.
- weaknesses: Array of 2-3 primary risk factors or complications.
- recommendations: Array of 2-3 actionable clinical recommendations.
- detectedElements: Array of 2-4 visual features observed in the photo.
- campus_context: Location string (e.g., "${locationStr}").
- do_not_rules: Array of 2-4 critical things to NEVER do.
- steps: Array of 3 to 5 chronological, executable steps with title, duration_seconds, and action_detail.
- whatsapp_message: A formatted WhatsApp dispatch text with emojis.`;

    const parts: any[] = [];

    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType: imageMime || 'image/jpeg',
          data: cleanBase64,
        },
      });
    }

    const promptText = hasImage
      ? `[ONE-SHOT VISUAL EVALUATION & EMERGENCY TRIAGE]
Location: ${locationStr}
User Notes: "${text ? text : 'Diagnose and evaluate directly from attached image.'}"
Target Language: ${langCode}

CRITICAL TASK: Analyze the uploaded photograph in ONE comprehensive request. Output exact structured JSON with all category scores (overallScore, codeQuality, security, efficiency, testing, accessibility, problemStatementAlignment), diagnosis, strengths, weaknesses, recommendations, and 60-second procedural steps.`
      : `Campus Emergency Incident:
Location: ${locationStr}
Description: "${text || 'Emergency assessment requested'}"
Target Language: ${langCode}

Analyze the incident evidence immediately in ONE request. Output structured JSON.`;

    parts.push({ text: promptText });

    const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
    let lastError: any = null;
    let responseText = '';

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: parts,
          config: {
            systemInstruction,
            temperature: 0.2,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                overallScore: { type: Type.INTEGER, description: 'Overall evaluation score (0-100)' },
                codeQuality: { type: Type.INTEGER, description: 'Protocol quality score (0-100)' },
                security: { type: Type.INTEGER, description: 'Safety containment score (0-100)' },
                efficiency: { type: Type.INTEGER, description: 'Response efficiency score (0-100)' },
                testing: { type: Type.INTEGER, description: 'Evidence verification score (0-100)' },
                accessibility: { type: Type.INTEGER, description: 'Clarity and accessibility score (0-100)' },
                problemStatementAlignment: { type: Type.INTEGER, description: 'Alignment and diagnosis score (0-100)' },
                hazard_type: { type: Type.STRING, description: 'Specific medical or physical hazard diagnosis' },
                severity: { type: Type.STRING, enum: ['minor', 'moderate', 'critical'], description: 'Severity classification' },
                summary: { type: Type.STRING, description: 'Concise clinical evaluation summary' },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Positive indicators' },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Risk factors' },
                recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Actionable recommendations' },
                detectedElements: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Visual features in photo' },
                campus_context: { type: Type.STRING, description: 'Campus location identifier' },
                do_not_rules: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Contraindications' },
                steps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      duration_seconds: { type: Type.INTEGER },
                      action_detail: { type: Type.STRING },
                    },
                    required: ['title', 'duration_seconds', 'action_detail'],
                  },
                },
                whatsapp_message: { type: Type.STRING },
              },
              required: [
                'overallScore', 'codeQuality', 'security', 'efficiency', 'testing', 
                'accessibility', 'problemStatementAlignment', 'hazard_type', 'severity', 
                'summary', 'strengths', 'weaknesses', 'recommendations', 'campus_context', 
                'do_not_rules', 'steps', 'whatsapp_message'
              ],
            },
          },
        });

        responseText = response.text?.trim() || '';
        if (responseText) {
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed:`, err?.message || err);
      }
    }

    if (!responseText) {
      throw lastError || new Error('All Gemini models failed to generate response');
    }

    const parsedData = JSON.parse(responseText);

    if (!['minor', 'moderate', 'critical'].includes(parsedData.severity)) {
      parsedData.severity = 'moderate';
    }

    if (!Array.isArray(parsedData.steps) || parsedData.steps.length === 0) {
      throw new Error('Invalid steps structure from model');
    }

    return res.status(200).json({
      ...parsedData,
      why_guidance: parsedData.summary || `NIVA assessed this ${parsedData.hazard_type} based on multimodal evidence at ${locationStr}.`,
      isAiGenerated: true,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Gemini analysis error:', error?.message || error);
    const fallback = getFallbackAssessment(text || '', locationStr, hasImage, langCode);
    return res.status(200).json({
      ...fallback,
      isAiGenerated: false,
      timestamp: new Date().toISOString()
    });
  }
}
