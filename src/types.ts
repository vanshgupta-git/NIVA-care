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
  campus_context: string;
  do_not_rules: string[];
  steps: ProtocolStep[];
  whatsapp_message: string;
  why_guidance?: string;
  isAiGenerated?: boolean;
  timestamp?: string;
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
