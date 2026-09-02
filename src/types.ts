export type Language = 'en' | 'hi' | 'ta' | 'te';

export type Severity = 'minor' | 'moderate' | 'critical';

export interface ProtocolStep {
  title: string;
  duration_seconds: number;
  action_detail: string;
}

export interface SafetyAssessment {
  hazard_type: string;
  severity: Severity;
  score?: number; // 0-100 Urgency Index
  summary?: string;
  strengths?: string[]; // Positive/protective signs (e.g. "Airway clear", "Localized to epidermis")
  weaknesses?: string[]; // Risk factors (e.g. "Tissue necrosis risk", "Chemical permeation")
  detectedElements?: string[]; // Visual findings detected in the image
  actionableImprovements?: string[]; // Medical follow-up recommendations
  campus_context: string;
  do_not_rules: string[];
  steps: ProtocolStep[];
  whatsapp_message: string;
  why_guidance?: string;
  isAiGenerated?: boolean;
  timestamp?: string;
  analyzedImagePreview?: string | null;
}

export interface IncidentPreset {
  id: string;
  code: string;
  title: string;
  descriptionSnippet: string;
  location: string;
  iconType: 'chemistry' | 'electrical' | 'animal' | 'heat';
  data: Record<Language, SafetyAssessment>;
}

export type AppScreenState = 'IDLE' | 'ANALYZING' | 'TRIAGE_AND_PROTOCOL';

export interface ContactInfo {
  name: string;
  role: string;
  phone: string;
  displayPhone: string;
  iconType: 'dispensary' | 'security' | 'emergency';
  badge: string;
}
