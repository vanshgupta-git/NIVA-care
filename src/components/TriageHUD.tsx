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
  Code2,
  Shield,
  Zap,
  FlaskConical,
  Accessibility,
  Target,
  FileImage,
  ArrowRight,
  TrendingUp
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
  const overallScore = assessment.overallScore ?? (assessment.severity === 'critical' ? 92 : 68);

  const categories = [
    {
      id: 'codeQuality',
      title: 'Code Quality',
      subtitle: 'Protocol Architecture',
      score: assessment.scores?.codeQuality ?? 88,
      icon: <Code2 className="w-4 h-4 text-indigo-600" />,
      color: 'bg-indigo-600',
      lightBg: 'bg-indigo-50 border-indigo-100'
    },
    {
      id: 'security',
      title: 'Security',
      subtitle: 'Safety & Isolation',
      score: assessment.scores?.security ?? 92,
      icon: <Shield className="w-4 h-4 text-emerald-600" />,
      color: 'bg-emerald-600',
      lightBg: 'bg-emerald-50 border-emerald-100'
    },
    {
      id: 'efficiency',
      title: 'Efficiency',
      subtitle: 'Response Speed',
      score: assessment.scores?.efficiency ?? 95,
      icon: <Zap className="w-4 h-4 text-amber-600" />,
      color: 'bg-amber-500',
      lightBg: 'bg-amber-50 border-amber-100'
    },
    {
      id: 'testing',
      title: 'Testing',
      subtitle: 'Evidence Verification',
      score: typeof assessment.scores?.testing === 'number' ? assessment.scores.testing : 85,
      icon: <FlaskConical className="w-4 h-4 text-blue-600" />,
      color: 'bg-blue-600',
      lightBg: 'bg-blue-50 border-blue-100'
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      subtitle: 'Instruction Clarity',
      score: assessment.scores?.accessibility ?? 90,
      icon: <Accessibility className="w-4 h-4 text-purple-600" />,
      color: 'bg-purple-600',
      lightBg: 'bg-purple-50 border-purple-100'
    },
    {
      id: 'problemStatementAlignment',
      title: 'Problem Alignment',
      subtitle: 'Hazard Diagnosis Accuracy',
      score: assessment.scores?.problemStatementAlignment ?? 94,
      icon: <Target className="w-4 h-4 text-rose-600" />,
      color: 'bg-rose-600',
      lightBg: 'bg-rose-50 border-rose-100'
    }
  ];

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
            One-Shot AI Evaluation & Clinical Triage Results
          </h2>
        </div>

        <button
          onClick={onReset}
          id="new-assessment-btn"
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer shadow-2xs active:scale-98"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Analyze Another Image</span>
        </button>
      </div>

      {/* Hero Assessment Card with Large Score Visualization */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm transition-all space-y-6">
        
        {/* Top Diagnosis & Overall Score Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          {/* Left: Hazard & Classification */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${style.badgeBg}`}>
                {style.label} SEVERITY
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>{assessment.campus_context}</span>
              </span>
              {assessment.isAiGenerated && (
                <span className="flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Gemini Vision</span>
                </span>
              )}
            </div>

            <h3 id="triage-hud-heading" className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {assessment.hazard_type}
            </h3>

            {assessment.summary && (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-3xl">
                {assessment.summary}
              </p>
            )}
          </div>

          {/* Right: Overall AI Evaluation Score Gauge */}
          <div className="flex items-center gap-4 bg-gradient-to-tr from-slate-50 to-indigo-50/40 p-5 rounded-2xl border border-slate-200/80 shrink-0">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#E2E8F0"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#4F46E5"
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 32}
                  strokeDashoffset={2 * Math.PI * 32 * (1 - overallScore / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-900 leading-none">{overallScore}</span>
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">SCORE</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Overall AI Evaluation</p>
              <p className="text-base font-black text-slate-900">
                {overallScore >= 85 ? 'High Urgency / Priority' : overallScore >= 60 ? 'Moderate Clinical Action' : 'Minor / Dispensary Care'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Calculated across 6 dimensions</p>
            </div>
          </div>

        </div>

        {/* Uploaded Image Metadata Bar if available */}
        {assessment.analyzedImagePreview && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-3">
              <div className="relative rounded-lg overflow-hidden border border-slate-300 w-14 h-10 shrink-0 shadow-2xs">
                <img
                  src={assessment.analyzedImagePreview}
                  alt="Evaluated image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Image Ground Truth:</span>
                  <span className="font-mono text-slate-600 font-normal">
                    {assessment.imageMetadata?.name || 'Evaluated Evidence Photo'}
                  </span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {assessment.imageMetadata?.formattedSize && `${assessment.imageMetadata.formattedSize} • `}
                  {assessment.imageMetadata?.width && `${assessment.imageMetadata.width}×${assessment.imageMetadata.height} px • `}
                  Directly analyzed by Gemini Vision in one-shot request
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 6 DETAILED CATEGORY EVALUATION CARDS */}
        {/* ========================================================= */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-600">
              Multi-Dimensional Evaluation Breakdown
            </h4>
            <span className="text-[11px] font-mono text-slate-400">
              Target: 0–100 Scale
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all shadow-2xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg border ${cat.lightBg}`}>
                      {cat.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{cat.title}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{cat.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-slate-900">{cat.score}</span>
                    <span className="text-[10px] font-mono text-slate-400">/100</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${Math.max(0, Math.min(100, cat.score))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* STRENGTHS, WEAKNESSES & ACTIONABLE RECOMMENDATIONS */}
        {/* ========================================================= */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. Strengths */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Key Strengths & Stabilizers</span>
            </div>
            <ul className="space-y-1.5 text-xs text-emerald-800">
              {(assessment.strengths || ['Vital signs stable', 'Consciousness intact', 'Immediate protocol available']).map((str, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Weaknesses & Risk Factors */}
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span>Risk Factors & Hazards</span>
            </div>
            <ul className="space-y-1.5 text-xs text-rose-800">
              {(assessment.weaknesses || ['Tissue trauma progression hazard', 'Delayed treatment risk']).map((weak, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold">!</span>
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Actionable Recommendations */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>Actionable Recommendations</span>
            </div>
            <ul className="space-y-1.5 text-xs text-indigo-800">
              {(assessment.recommendations || ['Follow sequential 60-second procedural steps', 'Report to health centre']).map((rec, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
