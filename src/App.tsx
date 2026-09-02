import React, { useState } from 'react';
import { Header } from './components/Header';
import { IncidentConsole } from './components/IncidentConsole';
import { TriageHUD } from './components/TriageHUD';
import { ProtocolRunner } from './components/ProtocolRunner';
import { DoNotWarnings } from './components/DoNotWarnings';
import { EmergencyDispatchPanel } from './components/EmergencyDispatchPanel';
import { WhatsAppModal } from './components/WhatsAppModal';
import { EmergencyCallDrawer } from './components/EmergencyCallDrawer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AmbientBackground } from './components/AmbientBackground';
import { Language, SafetyAssessment, IncidentPreset, AppScreenState } from './types';
import { TRANSLATIONS } from './data/translations';
import { INCIDENT_PRESETS } from './data/presets';
import { analyzeIncident } from './services/geminiService';
import { ShieldCheck, ArrowLeft, Loader2, Sparkles, Activity, Radio, PhoneCall } from 'lucide-react';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [screenState, setScreenState] = useState<AppScreenState>('IDLE');
  const [currentAssessment, setCurrentAssessment] = useState<SafetyAssessment | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Modal states
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isEmergencyDrawerOpen, setIsEmergencyDrawerOpen] = useState(false);

  const t = TRANSLATIONS[currentLanguage];

  // Handle language change
  const handleLanguageChange = (newLang: Language) => {
    setCurrentLanguage(newLang);
    // If active assessment is from a preset, update it to the new language translation
    if (activePresetId) {
      const preset = INCIDENT_PRESETS.find((p) => p.id === activePresetId);
      if (preset) {
        const localizedData = preset.data[newLang] || preset.data.en;
        setCurrentAssessment({
          ...localizedData,
          isAiGenerated: false,
          timestamp: new Date().toISOString()
        });
      }
    }
  };

  // Launch preset
  const handleSelectPreset = (preset: IncidentPreset) => {
    setActivePresetId(preset.id);
    const localizedData = preset.data[currentLanguage] || preset.data.en;
    setCurrentAssessment({
      ...localizedData,
      isAiGenerated: false,
      timestamp: new Date().toISOString()
    });
    setScreenState('TRIAGE_AND_PROTOCOL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle multimodal / text analysis
  const handleAnalyze = async (data: {
    text: string;
    imageBase64: string | null;
    imageMime: string | null;
    location: string;
  }) => {
    try {
      setIsAnalyzing(true);
      setActivePresetId(null);
      
      const assessment = await analyzeIncident({
        text: data.text,
        imageBase64: data.imageBase64,
        imageMime: data.imageMime,
        campusContext: data.location,
        language: currentLanguage
      });

      setCurrentAssessment(assessment);
      setScreenState('TRIAGE_AND_PROTOCOL');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Incident triage failure:', err);
      // Fallback
      handleSelectPreset(INCIDENT_PRESETS[1]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Reset to intake
  const handleReset = () => {
    setScreenState('IDLE');
    setCurrentAssessment(null);
    setActivePresetId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#06090F] text-[#F8FAFC] flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      
      {/* Background Animated Ambient Lights & Grid */}
      <AmbientBackground />

      {/* Floating Glass Application Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onOpenEmergencyCall={() => setIsEmergencyDrawerOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        
        {/* State 1: IDLE / INTAKE DASHBOARD */}
        {screenState === 'IDLE' && (
          <IncidentConsole
            currentLanguage={currentLanguage}
            onAnalyze={handleAnalyze}
            onSelectPreset={handleSelectPreset}
            isAnalyzing={isAnalyzing}
          />
        )}

        {/* State 2: ACTIVE TRIAGE & 60-SECOND PROTOCOL RUNNER */}
        {screenState === 'TRIAGE_AND_PROTOCOL' && currentAssessment && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Back to Intake Navigation */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <button
                onClick={handleReset}
                id="back-to-intake-btn"
                className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-cyan-400" />
                <span>BACK TO INTAKE CONSOLE</span>
              </button>
              
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-3 py-1.5 rounded-full border border-cyan-500/30">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>EMERGENCY ACTION RUNNER ACTIVE</span>
              </div>
            </div>

            {/* 1. Triage HUD */}
            <TriageHUD
              assessment={currentAssessment}
              currentLanguage={currentLanguage}
              onReset={handleReset}
            />

            {/* 2. 60-Second Safety Protocol Runner */}
            <ProtocolRunner
              steps={currentAssessment.steps}
              currentLanguage={currentLanguage}
            />

            {/* 3. Prohibited "DO NOT" Contraindications */}
            <DoNotWarnings
              rules={currentAssessment.do_not_rules}
              currentLanguage={currentLanguage}
            />

            {/* 4. Human Help & WhatsApp Dispatch Grid */}
            <EmergencyDispatchPanel
              currentLanguage={currentLanguage}
              onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
            />

          </div>
        )}

      </main>

      {/* Floating Emergency SOS bar for Mobile */}
      <div className="md:hidden fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsEmergencyDrawerOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-700 text-white px-5 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-2xl shadow-red-600/50 border border-red-500/40 animate-emergency-beacon cursor-pointer active:scale-95"
        >
          <PhoneCall className="w-4 h-4 animate-pulse" />
          <span>CAMPUS SOS</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#06090F]/90 backdrop-blur-xl py-8 px-4 text-xs text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">NIVA CAMPUS HEALTH & EMERGENCY CO-PILOT</span>
            <span className="text-slate-600">•</span>
            <span className="text-[11px] text-slate-400">Indian Engineering Campus Safety Standards</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <span>PWA Offline Cache</span>
            <span>•</span>
            <span>Web Speech API</span>
            <span>•</span>
            <span>Gemini Multimodal Vision</span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        message={currentAssessment?.whatsapp_message || ''}
        currentLanguage={currentLanguage}
      />

      <EmergencyCallDrawer
        isOpen={isEmergencyDrawerOpen}
        onClose={() => setIsEmergencyDrawerOpen(false)}
        currentLanguage={currentLanguage}
      />

      <OfflineIndicator currentLanguage={currentLanguage} />

    </div>
  );
}
