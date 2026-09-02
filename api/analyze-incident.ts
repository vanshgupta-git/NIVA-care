import { GoogleGenAI, Type } from '@google/genai';

// Predefined safe fallback analyzer based on keywords
function getFallbackAssessment(text: string, location: string, language: string = 'en') {
  const lower = (text || '').toLowerCase();
  
  if (lower.includes('acid') || lower.includes('chemical') || lower.includes('h2so4') || lower.includes('spill') || lower.includes('lab')) {
    return {
      hazard_type: 'Chemical exposure / acid burn',
      severity: 'critical' as const,
      campus_context: location || 'Chemistry Lab — Lab Annex 3',
      why_guidance: 'NIVA identified potential corrosive chemical contact requiring immediate copious water dilution.',
      do_not_rules: [
        'Do NOT rub the affected area.',
        'Do NOT attempt to neutralize the chemical with another substance.',
        'Do NOT apply creams, toothpaste, ghee or other home remedies.'
      ],
      steps: [
        {
          title: 'Move away from the spill',
          duration_seconds: 10,
          action_detail: 'Move to a safe area while avoiding further contact with the chemical.'
        },
        {
          title: 'Start continuous water flushing',
          duration_seconds: 900,
          action_detail: 'Flush the affected skin with copious running tap water.'
        },
        {
          title: 'Remove contaminated clothing',
          duration_seconds: 30,
          action_detail: 'Carefully remove contaminated clothing while continuing to avoid spreading the chemical.'
        },
        {
          title: 'Get medical assessment',
          duration_seconds: 60,
          action_detail: 'Contact the campus dispensary or emergency medical service.'
        }
      ],
      whatsapp_message: `🚨 CAMPUS EMERGENCY ALERT 🚨\n📍 Location: ${location || 'Chemistry Lab'}\n⚠️ Incident: Chemical exposure / acid burn\n🩹 Immediate Action: Continuous water flushing underway\n🚑 Action Needed: Campus medical response required`
    };
  }

  if (lower.includes('heat') || lower.includes('faint') || lower.includes('collapse') || lower.includes('sun') || lower.includes('stroke') || lower.includes('ground')) {
    return {
      hazard_type: 'Heat illness / possible heat stroke',
      severity: 'critical' as const,
      campus_context: location || 'Sports Ground',
      why_guidance: 'NIVA detected acute thermal breakdown / collapse requiring rapid cooling and airway protection.',
      do_not_rules: [
        'Do NOT leave the person alone.',
        'Do NOT give fluids if the person is unconscious or unable to swallow.',
        'Do NOT delay emergency medical assistance if severe symptoms are present.'
      ],
      steps: [
        {
          title: 'Move to a cooler area',
          duration_seconds: 30,
          action_detail: 'Move the person away from direct heat if it is safe to do so.'
        },
        {
          title: 'Check responsiveness',
          duration_seconds: 20,
          action_detail: 'Check whether the person responds and is breathing normally.'
        },
        {
          title: 'Cool the person',
          duration_seconds: 120,
          action_detail: 'Begin appropriate cooling while arranging emergency medical help.'
        },
        {
          title: 'Call emergency support',
          duration_seconds: 30,
          action_detail: 'Contact campus emergency personnel or 112 for severe symptoms.'
        }
      ],
      whatsapp_message: `🚨 CAMPUS EMERGENCY ALERT 🚨\n📍 Location: ${location || 'Sports Ground'}\n⚠️ Incident: Suspected severe heat illness / collapse\n🩹 Immediate Action: Cooling initiated\n🚑 Action Needed: Campus emergency medical response`
    };
  }

  if (lower.includes('dog') || lower.includes('bite') || lower.includes('scratch') || lower.includes('animal') || lower.includes('canteen')) {
    return {
      hazard_type: 'Animal bite / rabies exposure risk',
      severity: 'moderate' as const,
      campus_context: location || 'Canteen Quadrangle',
      why_guidance: 'NIVA identified high transmission risk bite needing urgent soap-water mechanical debridement and ARV vaccine tracking.',
      do_not_rules: [
        'Do NOT apply turmeric, chili powder, band-aid, or suture the wound.',
        'Do NOT delay seeking formal anti-rabies vaccination (ARV).',
        'Do NOT attempt to capture or agitate the animal.'
      ],
      steps: [
        {
          title: 'Wash under running water with soap',
          duration_seconds: 900,
          action_detail: 'Vigorously wash the wound under running tap water with soap for a full 15 minutes.'
        },
        {
          title: 'Disinfect with Betadine or Alcohol',
          duration_seconds: 60,
          action_detail: 'Apply povidone-iodine or alcohol solution if available. Leave wound unbandaged.'
        },
        {
          title: 'Proceed to Campus Health Centre',
          duration_seconds: 300,
          action_detail: 'Report to dispensary for Rabies Post-Exposure Prophylaxis (PEP) Day 0 dose and Tetanus Toxoid.'
        }
      ],
      whatsapp_message: `🚨 CAMPUS HEALTH ALERT 🚨\n📍 Location: ${location || 'Canteen Quadrangle'}\n⚠️ Incident: Stray animal bite / scratch\n🩹 Immediate Action: 15-min running soap water wash initiated\n🏥 Action Needed: Medical Health Centre ARV / Immunoglobulin protocol`
    };
  }

  return {
    hazard_type: 'Thermal burn / scald injury',
    severity: 'moderate' as const,
    campus_context: location || 'Hostel Wing B — Pantry',
    why_guidance: 'NIVA identified thermal skin trauma requiring immediate ambient water cooling to arrest thermal progression.',
    do_not_rules: [
      'Do NOT apply ice, ice water, toothpaste, butter, or oil.',
      'Do NOT pop any blisters that form.',
      'Do NOT peel stuck fabric from burned skin.'
    ],
    steps: [
      {
        title: 'Cool under cool running water',
        duration_seconds: 1200,
        action_detail: 'Hold the burned area under gentle cool (not ice cold) running water for 10-20 minutes.'
      },
      {
        title: 'Remove rings and tight items',
        duration_seconds: 30,
        action_detail: 'Gently remove rings, watches, or restrictive clothing before swelling begins.'
      },
      {
        title: 'Protect the affected area',
        duration_seconds: 30,
        action_detail: 'Keep the area clean and protected while waiting for medical assessment.'
      }
    ],
    whatsapp_message: `🚨 CAMPUS HEALTH ALERT 🚨\n📍 Location: ${location || 'Hostel Wing B'}\n⚠️ Incident: Electrical / thermal injury\n🩹 Immediate Action: Power isolated and burn cooling underway\n🏥 Action Needed: Campus medical assessment`
  };
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { text, imageBase64, imageMime, campusContext, language = 'en' } = req.body || {};

    const locationStr = campusContext || 'Indian Campus';
    const langCode = ['hi', 'ta', 'te'].includes(language) ? language : 'en';

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      console.log('Gemini API key missing or unconfigured. Serving verified fallback protocol.');
      const fallback = getFallbackAssessment(text, locationStr, langCode);
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

    const hasImage = Boolean(imageBase64);

    const systemInstruction = `You are NIVA — AI Campus Health & Emergency Co-Pilot for Indian college, university, and engineering campuses (e.g. IITs, NITs, central universities).
Your mission is to guide a stressed student through the safest immediate 60-second procedural actions with minimum cognitive load.
You must NOT behave like a conversational chatbot. Output strictly structured clinical emergency triage JSON.

${hasImage ? `PRIMARY VISUAL-FIRST DIRECTIVE:
An image has been uploaded as the ground-truth evidence. You MUST inspect and diagnose directly from the visual evidence in the image (e.g., wound characteristics, burn depth, chemical discoloration, laceration, bleeding, animal bite marks, swelling, eye trauma, or physical posture).
DO NOT rely on, require, or wait for text descriptions. Even if the text description is empty, generic, or incomplete, accurately diagnose what is physically visible in the photograph.` : ''}

LANGUAGE DIRECTIVE:
Respond in the language specified: '${langCode}' (en = English, hi = Hindi, ta = Tamil, te = Telugu).
All text in hazard_type, do_not_rules, steps (title and action_detail), and whatsapp_message MUST be translated clearly into the target language.

STRICT SCHEMA RULES:
- hazard_type: Concise, specific medical or physical hazard diagnosis (e.g., "Chemical exposure / acid burn", "Second-degree thermal burn", "Canine bite laceration", "Heat exhaustion").
- severity: Must be EXACTLY one of: "minor", "moderate", "critical".
  * "minor" -> Low risk, Dispensary / Self-care
  * "moderate" -> Moderate risk, Health Centre Transfer needed
  * "critical" -> Life-threatening / organ risk, 112 + Campus SOS required
- campus_context: Location string (e.g., "${locationStr}").
- do_not_rules: Array of 2-4 critical things to NEVER do (e.g., "Do NOT apply toothpaste or ghee on burns", "Do NOT neutralize acid yourself", "Do NOT give fluids to unconscious person"). Include common Indian home remedy hazards if relevant.
- steps: Array of 3 to 5 chronological, executable steps.
  Each step has:
  * title: Short, imperative command (e.g. "Move away from the spill", "Flush with running water").
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
Student Notes (if any): "${text ? text : 'No text provided. Perform comprehensive diagnosis directly from the uploaded image.'}"
Target Response Language: ${langCode}

CRITICAL TASK: Analyze the uploaded photograph directly. Diagnose the exact injury, hazard, or clinical condition visible in the image. Do not rely on description text. Extract severity, contraindications, and immediate 60-second procedural steps directly from visual evidence.`
      : `Campus Emergency Incident:
Location: ${locationStr}
Description provided by student: "${text || 'Emergency assessment requested'}"
Target Response Language: ${langCode}

Analyze the incident evidence immediately. Output the structured JSON schema.`;

    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts },
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hazard_type: {
              type: Type.STRING,
              description: 'Concise medical or physical hazard diagnosis',
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
              description: '2 to 4 strict contraindications / prohibited actions',
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
              description: 'Pre-formatted SOS dispatch payload for security and warden',
            },
          },
          required: ['hazard_type', 'severity', 'campus_context', 'do_not_rules', 'steps', 'whatsapp_message'],
        },
      },
    });

    const responseText = response.text?.trim();
    if (!responseText) {
      throw new Error('Empty response from Gemini');
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
      why_guidance: `NIVA assessed this ${parsedData.hazard_type} based on provided multimodal evidence at ${locationStr}.`,
      isAiGenerated: true,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Gemini analysis error:', error?.message || error);
    const fallback = getFallbackAssessment(req.body?.text || '', req.body?.campusContext || 'Campus', req.body?.language || 'en');
    return res.status(200).json({
      ...fallback,
      isAiGenerated: false,
      timestamp: new Date().toISOString()
    });
  }
}
