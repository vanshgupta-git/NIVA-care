import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Info, 
  MapPin, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2,
  Radio
} from 'lucide-react';
import { SafetyAssessment, Language, Severity } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ECGWave } from './ECGWave';

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
          panelClass: 'glass-panel-red border-red-500/40',
          accentColor: '#EF4444',
          accentText: 'text-red-400',
          badgeBg: 'bg-red-950/90 text-red-300 border-red-500/40',
          label: t.severityLabels.critical,
          actionLabel: t.severityLabels.criticalAction,
          icon: <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse" />
        };
      case 'moderate':
        return {
          panelClass: 'glass-panel border-amber-500/30 shadow-amber-500/10',
          accentColor: '#F59E0B',
          accentText: 'text-amber-400',
          badgeBg: 'bg-amber-950/90 text-amber-300 border-amber-500/40',
          label: t.severityLabels.moderate,
          actionLabel: t.severityLabels.moderateAction,
          icon: <AlertTriangle className="w-5 h-5 text-amber-400" />
        };
      case 'minor':
      default:
        return {
          panelClass: 'glass-panel border-emerald-500/30 shadow-emerald-500/10',
          accentColor: '#10B981',
          accentText: 'text-emerald-400',
          badgeBg: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40',
          label: t.severityLabels.minor,
          actionLabel: t.severityLabels.minorAction,
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
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
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold text-slate-400">
            Active Clinical Triage Assessment
          </h2>
        </div>

        <button
          onClick={onReset}
          id="new-assessment-btn"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold font-mono uppercase tracking-wider text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-all cursor-pointer active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.newAssessmentBtn}</span>
        </button>
      </div>

      {/* Main Assessment HUD Panel */}
      <div className={`${style.panelClass} rounded-2xl p-6 relative overflow-hidden transition-all shadow-2xl`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10">
              {style.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-black text-xl tracking-tight uppercase ${style.accentText}`}>
                  {style.label}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  [{style.actionLabel}]
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">
                TRIAGE LEVEL CLASSIFICATION
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-white/[0.05] px-3 py-1.5 rounded-xl border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>{assessment.campus_context}</span>
            </span>

            {assessment.isAiGenerated && (
              <span className="flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-xl bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>AI MULTIMODAL VERIFIED</span>
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 id="triage-hud-heading" className="text-xl sm:text-2xl font-black text-white leading-snug">
              {assessment.hazard_type}
            </h3>
            {assessment.why_guidance && (
              <p className="text-sm text-slate-300 leading-relaxed mt-1.5 font-medium">
                <strong className="text-white font-bold">{t.whyGuidance}: </strong>
                {assessment.why_guidance}
              </p>
            )}
          </div>

          {/* Minimal live telemetry ECG */}
          <div className="w-full md:w-48 shrink-0">
            <ECGWave color={style.accentColor} height={20} />
          </div>
        </div>
      </div>
    </section>
  );
};
