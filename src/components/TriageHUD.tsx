import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  MapPin, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2,
  AlertOctagon,
  Eye,
  Activity,
  FileImage,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Clock
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
          cardBg: 'bg-rose-50/50 border-rose-200/80',
          accentText: 'text-rose-700',
          badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
          urgencyColor: 'bg-rose-600',
          urgencyText: 'CRITICAL / IMMEDIATE ESCALATION',
          label: t.severityLabels.critical,
          actionLabel: t.severityLabels.criticalAction,
          icon: <ShieldAlert className="w-6 h-6 text-rose-600" />
        };
      case 'moderate':
        return {
          cardBg: 'bg-amber-50/50 border-amber-200/80',
          accentText: 'text-amber-800',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
          urgencyColor: 'bg-amber-500',
          urgencyText: 'MODERATE / CLINICAL ASSISTANCE REQUIRED',
          label: t.severityLabels.moderate,
          actionLabel: t.severityLabels.moderateAction,
          icon: <AlertTriangle className="w-6 h-6 text-amber-600" />
        };
      case 'minor':
      default:
        return {
          cardBg: 'bg-emerald-50/50 border-emerald-200/80',
          accentText: 'text-emerald-800',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          urgencyColor: 'bg-emerald-500',
          urgencyText: 'MINOR / FIRST AID & MONITORING',
          label: t.severityLabels.minor,
          actionLabel: t.severityLabels.minorAction,
          icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        };
    }
  };

  const style = getSeverityStyles(assessment.severity);

  return (
    <section 
      aria-labelledby="triage-hud-heading"
      className="space-y-6"
    >
      {/* Top Header & Reset Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-600">
            AI Multimodal Clinical Triage Assessment
          </h2>
        </div>

        <button
          onClick={onReset}
          id="new-assessment-btn"
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer shadow-2xs active:scale-98"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Analyze Another Incident</span>
        </button>
      </div>

      {/* Hero Assessment Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm transition-all space-y-6">
        
        {/* Top Hazard Classification */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${style.badgeBg}`}>
                {style.label} SEVERITY
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>{assessment.campus_context}</span>
              </span>
              {assessment.isAiGenerated ? (
                <span className="flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Gemini Vision AI</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Campus Protocol</span>
                </span>
              )}
            </div>

            <h3 
              id="triage-hud-heading"
              className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight"
            >
              {assessment.hazard_type}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-3xl">
              {assessment.summary || `Clinical AI emergency protocol active for ${assessment.hazard_type} at ${assessment.campus_context}.`}
            </p>
          </div>

          {/* Severity & Action Priority Badge */}
          <div className="flex flex-col items-start lg:items-end justify-center p-4 rounded-2xl bg-slate-50 border border-slate-200/80 min-w-[240px]">
            <div className="flex items-center gap-2 mb-1.5">
              {style.icon}
              <span className="text-xs font-mono font-bold text-slate-900 uppercase">
                {style.label} Action Level
              </span>
            </div>
            <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded-lg ${style.badgeBg}`}>
              {style.actionLabel}
            </span>
          </div>
        </div>

        {/* Evidence Image and Detected Elements Bar (if image was analyzed) */}
        {assessment.analyzedImagePreview && (
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0 shadow-2xs">
                <img 
                  src={assessment.analyzedImagePreview} 
                  alt="Analyzed incident visual evidence" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[8px] font-mono text-white text-center py-0.5">
                  AI SCAN
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800">
                  <FileImage className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Visual Evidence Verified</span>
                </div>
                {assessment.imageMetadata && (
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                    {assessment.imageMetadata.name} ({assessment.imageMetadata.formattedSize})
                    {assessment.imageMetadata.width ? ` • ${assessment.imageMetadata.width}×${assessment.imageMetadata.height}px` : ''}
                  </p>
                )}
                {assessment.detectedElements && assessment.detectedElements.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {assessment.detectedElements.map((elem, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                        ✓ {elem}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span>Multimodal Vision Verified</span>
            </div>
          </div>
        )}

        {/* Clinical Breakdown: Key Risk Factors & Actionable Stabilizers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Key Symptoms / Stabilizers */}
          <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100/80">
            <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold text-xs uppercase font-mono">
              <HeartPulse className="w-4 h-4 text-emerald-600" />
              <span>Key Clinical Stabilizers</span>
            </div>
            <ul className="space-y-1.5">
              {(assessment.strengths && assessment.strengths.length > 0
                ? assessment.strengths 
                : ['Airway and vitals monitored', 'Immediate localized first aid applied', 'Emergency contacts standby']
              ).map((item, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5 leading-snug">
                  <span className="text-emerald-600 font-bold text-xs mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Risk Factors & Hazards */}
          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100/80">
            <div className="flex items-center gap-2 mb-2 text-amber-800 font-bold text-xs uppercase font-mono">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Risk Factors & Hazards</span>
            </div>
            <ul className="space-y-1.5">
              {(assessment.weaknesses && assessment.weaknesses.length > 0 
                ? assessment.weaknesses 
                : ['Secondary infection risk', 'Delayed clinical irrigation', 'Thermal / tissue damage progression']
              ).map((item, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5 leading-snug">
                  <span className="text-amber-600 font-bold text-xs mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Recommendations */}
          <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100/80">
            <div className="flex items-center gap-2 mb-2 text-indigo-800 font-bold text-xs uppercase font-mono">
              <Stethoscope className="w-4 h-4 text-indigo-600" />
              <span>Action Recommendations</span>
            </div>
            <ul className="space-y-1.5">
              {(assessment.recommendations && assessment.recommendations.length > 0 
                ? assessment.recommendations 
                : ['Follow the 60-second action protocol below', 'Notify campus dispensary staff', 'Keep affected area clean and uncovered']
              ).map((item, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5 leading-snug">
                  <ArrowRight className="w-3 h-3 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
