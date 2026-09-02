import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Info, 
  MapPin, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { SafetyAssessment, Language, Severity } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface TriageHUDProps {
  assessment: SafetyAssessment;
  currentLanguage: Language;
  onReset: () => void;
}

export const TriageHUD: React.FC<TriageHUDProps> = ({
  assessment,
  currentLanguage,
  onReset
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const getSeverityStyles = (severity: Severity) => {
    switch (severity) {
      case 'critical':
        return {
          cardBorder: 'border-[#D92D20]',
          accentText: 'text-[#D92D20]',
          badgeBg: 'bg-[#D92D20] text-white',
          label: t.severityLabels.critical,
          actionLabel: t.severityLabels.criticalAction,
          icon: <ShieldAlert className="w-5 h-5 text-[#D92D20]" />
        };
      case 'moderate':
        return {
          cardBorder: 'border-[#F2994A]',
          accentText: 'text-[#F2994A]',
          badgeBg: 'bg-[#F2994A] text-white',
          label: t.severityLabels.moderate,
          actionLabel: t.severityLabels.moderateAction,
          icon: <AlertTriangle className="w-5 h-5 text-[#F2994A]" />
        };
      case 'minor':
      default:
        return {
          cardBorder: 'border-[#12B76A]',
          accentText: 'text-[#027A48]',
          badgeBg: 'bg-[#027A48] text-white',
          label: t.severityLabels.minor,
          actionLabel: t.severityLabels.minorAction,
          icon: <CheckCircle2 className="w-5 h-5 text-[#12B76A]" />
        };
    }
  };

  const style = getSeverityStyles(assessment.severity);

  return (
    <section 
      aria-labelledby="triage-hud-heading"
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#888]">
          Current Assessment
        </h2>
        <button
          onClick={onReset}
          id="new-assessment-btn"
          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#666] hover:text-[#1A1A1A] border border-[#E5E2DD] rounded hover:bg-[#F9F8F6] transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>{t.newAssessmentBtn}</span>
        </button>
      </div>

      {/* Main Assessment Box */}
      <div className={`p-5 bg-white border ${style.cardBorder} rounded-lg shadow-xs transition-all`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E2DD]">
          <div className="flex items-center gap-2">
            {style.icon}
            <span className={`font-black text-xl tracking-tight uppercase ${style.accentText}`}>
              {style.label}
            </span>
            <span className="text-xs font-mono font-bold text-[#666]">
              ({style.actionLabel})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] font-mono text-[#666] bg-[#F5F2ED] px-2.5 py-1 rounded border border-[#E5E2DD]">
              <MapPin className="w-3 h-3 text-[#D92D20]" />
              <span>{assessment.campus_context}</span>
            </span>
            {assessment.isAiGenerated && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#F0F9F4] text-[#027A48] border border-[#D1FADF]">
                AI VERIFIED
              </span>
            )}
          </div>
        </div>

        <div className="mt-3">
          <h3 id="triage-hud-heading" className="text-base sm:text-lg font-bold text-[#1A1A1A] leading-snug">
            {assessment.hazard_type}
          </h3>
          {assessment.why_guidance && (
            <p className="text-[13px] text-[#666] leading-relaxed mt-1">
              <strong className="text-[#1A1A1A] font-semibold">{t.whyGuidance}: </strong>
              {assessment.why_guidance}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
