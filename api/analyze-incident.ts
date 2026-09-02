import { GoogleGenAI, Type } from '@google/genai';

// Safe clinical fallback analyzer if network/AI is completely unreachable
function getFallbackAssessment(text: string, location: string, hasImage: boolean = false, language: string = 'en') {
  const lower = (text || '').toLowerCase();
  
  if (lower.includes('acid') || lower.includes('chemical') || lower.includes('h2so4') || lower.includes('spill') || lower.includes('lab')) {
    return {
      hazard_type: 'Chemical exposure / Acid burn',
      severity: 'critical' as const,
      campus_context: location || 'Chemistry Lab — Lab Annex 3',
      why_guidance: 'Identified potential corrosive chemical contact requiring immediate copious water dilution.',
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

  if (lower.includes('heat') || lower.includes('faint') || lower.includes('collapse') || lower.includes('sun') || lower.includes('stroke') || lower.includes('ground')) {
    return {
      hazard_type: 'Heat illness / Severe exhaustion',
      severity: 'critical' as const,
      campus_context: location || 'Sports Ground',
      why_guidance: 'Detected acute thermal breakdown / collapse requiring rapid cooling and airway protection.',
      do_not_rules: [
        'Do NOT leave the person alone.',
        'Do NOT give fluids if the person is unconscious or unable to swallow.',
        'Do NOT delay emergency medical assistance if severe symptoms are present.'
      ],
      steps: [
        { title: 'Move to a cooler shaded area', duration_seconds: 30, action_detail: 'Move the person away from direct heat immediately.' },
        { title: 'Check responsiveness & airway', duration_seconds: 20, action_detail: 'Ensure person is breathing and elevate feet slightly if conscious.' },
        { title: 'Cool with damp cloth & fanning', duration_seconds: 120, action_detail: 'Apply cool water to neck, armpits, and forehead.' },
        { title: 'Call campus ambulance / 112', duration_seconds: 30, action_detail: 'Contact campus emergency medical team immediately.' }
      ],
      whatsapp_message: `🚨 CAMPUS EMERGENCY ALERT 🚨\n📍 Location: ${location || 'Sports Ground'}\n⚠️ Incident: Suspected severe heat illness / collapse\n🩹 Immediate Action: Cooling initiated\n🚑 Action Needed: Campus emergency medical response`
    };
  }

  // Generic trauma / visual assessment fallback
  return {
    hazard_type: hasImage ? 'Physical trauma / Acute injury (Visual Triage)' : 'Thermal / Mechanical injury',
    severity: 'moderate' as const,
    campus_context: location || 'Hostel / Campus Annex',
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
    whatsapp_message: `🚨 CAMPUS HEALTH ALERT 🚨\n📍 Location: ${location || 'Hostel'}\n⚠️ Incident: Acute injury / trauma\n🩹 Immediate Action: First aid stabilization initiated\n🏥 Action Needed: Medical Health Centre evaluation`
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

    const systemInstruction = `You are NIVA — AI Campus Health & Emergency Co-Pilot for Indian college, university, and engineering campuses (e.g. IITs, NITs, central universities).
Your mission is to guide a stressed student through the safest immediate 60-second procedural actions with minimum cognitive load.
You must NOT behave like a conversational chatbot. Output strictly structured clinical emergency triage JSON.

${hasImage ? `PRIMARY VISUAL-FIRST DIRECTIVE:
An image has been uploaded as the ground-truth evidence. You MUST inspect and diagnose directly from the visual evidence in the image (e.g., wound characteristics, burn depth, chemical discoloration, laceration, bleeding, animal bite marks, swelling, eye trauma, skin rash, or physical posture).
DO NOT default to thermal burns unless the photo explicitly shows a thermal burn. Accurately identify what is visible in the photograph (e.g. cut/laceration, abrasion, animal bite, chemical spill, eye injury, fracture/swelling, rash, etc.).
DO NOT rely on, require, or wait for text descriptions.` : ''}

LANGUAGE DIRECTIVE:
Respond in the language specified: '${langCode}' (en = English, hi = Hindi, ta = Tamil, te = Telugu).
All text in hazard_type, do_not_rules, steps (title and action_detail), and whatsapp_message MUST be translated clearly into the target language.

STRICT SCHEMA RULES:
- hazard_type: Concise, specific medical or physical hazard diagnosis (e.g., "Chemical exposure / Acid burn", "Deep laceration with bleeding", "Canine bite wound", "Abrasion trauma", "Contact dermatitis / Chemical rash", "Thermal scald").
- severity: Must be EXACTLY one of: "minor", "moderate", "critical".
  * "minor" -> Low risk, Dispensary / Self-care
  * "moderate" -> Moderate risk, Health Centre Transfer needed
  * "critical" -> Life-threatening / organ risk, 112 + Campus SOS required
- campus_context: Location string (e.g., "${locationStr}").
- do_not_rules: Array of 2-4 critical things to NEVER do (e.g., "Do NOT apply toothpaste, butter or ghee", "Do NOT apply turmeric on open wounds", "Do NOT rub the wound", "Do NOT give fluids to unconscious person").
- steps: Array of 3 to 5 chronological, executable steps.
  Each step has:
  * title: Short, imperative command (e.g. "Direct pressure on wound", "Flush with running water").
  * duration_seconds: Numeric duration in seconds (e.g. 15, 30, 60, 600, 900).
  * action_detail: One clear, specific sentence on what to do.
- whatsapp_message: A formatted WhatsApp dispatch text with emojis (🚨, 📍, ⚠️, 🩹, 🚑) containing Location, Incident, Immediate Action, and Action Needed.`;

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
      ? `[VISUAL-FIRST CLINICAL EMERGENCY TRIAGE]
Location: ${locationStr}
User Notes: "${text ? text : 'Diagnose purely from the attached image.'}"
Target Language: ${langCode}

CRITICAL TASK: Analyze the uploaded photograph directly. Accurately diagnose the exact injury, wound, chemical spill, or physical trauma shown in this image. DO NOT default to a burn unless it is visibly a burn. Provide exact medical triage schema.`
      : `Campus Emergency Incident:
Location: ${locationStr}
Description: "${text || 'Emergency assessment requested'}"
Target Language: ${langCode}

Analyze the incident evidence immediately. Output the structured JSON schema.`;

    parts.push({ text: promptText });

    // Try primary model, with fallback models if first is unavailable
    const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
    let lastError: any = null;
    let responseText = '';

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: parts, // CORRECT format for @google/genai is the parts array directly
          config: {
            systemInstruction,
            temperature: 0.2,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                hazard_type: {
                  type: Type.STRING,
                  description: 'Specific medical or physical hazard diagnosis from image/text',
                },
                severity: {
                  type: Type.STRING,
                  enum: ['minor', 'moderate', 'critical'],
                  description: 'Triage severity classification',
                },
                campus_context: {
                  type: Type.STRING,
                  description: 'Campus location identifier',
                },
                do_not_rules: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: '2 to 4 strict contraindications',
                },
                steps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING, description: 'Short imperative action header' },
                      duration_seconds: { type: Type.INTEGER, description: 'Step duration in seconds' },
                      action_detail: { type: Type.STRING, description: 'Clear instructional detail' },
                    },
                    required: ['title', 'duration_seconds', 'action_detail'],
                  },
                  description: 'Chronological procedural emergency steps',
                },
                whatsapp_message: {
                  type: Type.STRING,
                  description: 'Pre-formatted SOS dispatch payload',
                },
              },
              required: ['hazard_type', 'severity', 'campus_context', 'do_not_rules', 'steps', 'whatsapp_message'],
            },
          },
        });

        responseText = response.text?.trim() || '';
        if (responseText) {
          break; // Success!
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
      why_guidance: `NIVA assessed this ${parsedData.hazard_type} based on multimodal evidence at ${locationStr}.`,
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
