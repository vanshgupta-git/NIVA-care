import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  MapPin, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2,
  CheckCircle,
  AlertOctagon,
  Eye,
  Activity,
  ArrowRight
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
          scoreBarColor: 'bg-rose-600',
          label: t.severityLabels.critical,
          actionLabel: t.severityLabels.criticalAction,
          icon: <ShieldAlert className="w-5 h-5 text-rose-600" />
        };
      case 'moderate':
        return {
          cardBg: 'bg-amber-50/50 border-amber-200/80',
          accentText: 'text-amber-800',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
          scoreBarColor: 'bg-amber-500',
          label: t.severityLabels.moderate,
          actionLabel: t.severityLabels.moderateAction,
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />
        };
      case 'minor':
      default:
        return {
          cardBg: 'bg-emerald-50/50 border-emerald-200/80',
          accentText: 'text-emerald-800',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          scoreBarColor: 'bg-emerald-500',
          label: t.severityLabels.minor,
          actionLabel: t.severityLabels.minorAction,
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        };
    }
  };

  const style = getSeverityStyles(assessment.severity);
  const score = assessment.score || (assessment.severity === 'critical' ? 92 : assessment.severity === 'moderate' ? 68 : 35);

  return (
    <section 
      aria-labelledby="triage-hud-heading"
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
          <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-600">
            Clinical AI Triage Assessment
          </h2>
        </div>

        <button
          onClick={onReset}
          id="new-assessment-btn"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer shadow-2xs active:scale-98"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>{t.newAssessmentBtn}</span>
        </button>
      </div>

      {/* Main Assessment Header Card */}
      <div className={`p-6 sm:p-7 rounded-3xl border ${style.cardBg} bg-white shadow-xs transition-all`}>
        
        {/* Top Status & Score Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              {style.icon}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className={`font-black text-xl tracking-tight uppercase ${style.accentText}`}>
                  {style.label}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  [{style.actionLabel}]
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 uppercase">
                Triage Urgency Rating
              </span>
            </div>
          </div>

          {/* Right: Score Gauge & Location */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Urgency Score Gauge */}
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
              <div className="text-right">
                <p className="text-[10px] font-mono text-slate-500 uppercase font-bold">Urgency Index</p>
                <p className="text-lg font-black text-slate-900 leading-none">{score}<span className="text-xs font-normal text-slate-400">/100</span></p>
              </div>
              <div className="w-12 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${style.scoreBarColor} transition-all duration-700`} 
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>

            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-700 bg-white px-3 py-2 rounded-2xl border border-slate-200 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>{assessment.campus_context}</span>
            </span>

            {assessment.isAiGenerated && (
              <span className="flex items-center gap-1 text-[11px] font-mono font-bold px-3 py-2 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI Verified</span>
              </span>
            )}
          </div>
        </div>

        {/* Diagnosis & Summary */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-8 space-y-3">
            <h3 id="triage-hud-heading" className="text-2xl font-black text-slate-900 leading-snug">
              {assessment.hazard_type}
            </h3>
            
            {assessment.summary && (
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {assessment.summary}
              </p>
            )}
          </div>

          {/* Uploaded Evidence Thumbnail (if present) */}
          {assessment.analyzedImagePreview && (
            <div className="lg:col-span-4 flex flex-col items-start sm:items-end">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 w-28 h-20 shadow-2xs">
                <img
                  src={assessment.analyzedImagePreview}
                  alt="Assessed evidence"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                  Evidence
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Detailed Findings Breakdown: Strengths vs Risks vs Detected Visual Elements */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. Visual Findings Detected in Image */}
          {assessment.detectedElements && assessment.detectedElements.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Eye className="w-4 h-4 text-indigo-600" />
                <span>Detected Visual Elements</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {assessment.detectedElements.map((elem, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{elem}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 2. Positive / Stabilizing Indicators */}
          {assessment.strengths && assessment.strengths.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Positive Indicators</span>
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-800">
                {assessment.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 3. Risk Factors & Complications */}
          {assessment.weaknesses && assessment.weaknesses.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                <span>Primary Risk Factors</span>
              </div>
              <ul className="space-y-1.5 text-xs text-rose-800">
                {assessment.weaknesses.map((weak, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">!</span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
