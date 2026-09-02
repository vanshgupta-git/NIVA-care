export type Language = 'en' | 'hi' | 'ta' | 'te';

export type Severity = 'minor' | 'moderate' | 'critical';

export interface ProtocolStep {
  title: string;
  duration_seconds: number;
  action_detail: string;
}

export interface CategoryScores {
  codeQuality: number;
  security: number;
  efficiency: number;
  testing: number;
  accessibility: number;
  problemStatementAlignment: number;
}

export interface ImageMetadata {
  name: string;
  sizeBytes: number;
  formattedSize: string;
  width?: number;
  height?: number;
  type: string;
}

export interface SafetyAssessment {
  hazard_type: string;
  severity: Severity;
  overallScore?: number;
  scores?: CategoryScores;
  summary?: string;
  strengths?: string[];
  weaknesses?: string[];
  recommendations?: string[];
  detectedElements?: string[];
  campus_context: string;
  do_not_rules: string[];
  steps: ProtocolStep[];
  whatsapp_message: string;
  why_guidance?: string;
  isAiGenerated?: boolean;
  timestamp?: string;
  analyzedImagePreview?: string | null;
  imageMetadata?: ImageMetadata | null;
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

export function parseScore(val: any, fallback: number = 0): number {
  if (typeof val === 'number' && !isNaN(val)) {
    return Math.max(0, Math.min(100, Math.round(val)));
  }
  if (typeof val === 'string') {
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      return Math.max(0, Math.min(100, num));
    }
  }
  return fallback;
}
