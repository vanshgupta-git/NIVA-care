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
import { Language, SafetyAssessment, IncidentPreset, AppScreenState } from './types';
import { TRANSLATIONS } from './data/translations';
import { INCIDENT_PRESETS } from './data/presets';
import { analyzeIncident } from './services/geminiService';
import { ShieldCheck, ArrowLeft, Loader2, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#F2994A] selection:text-white">
      
      {/* Top Application Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onOpenEmergencyCall={() => setIsEmergencyDrawerOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* State 1: IDLE / INTAKE CONSOLE */}
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
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E2DD]">
              <button
                onClick={handleReset}
                id="back-to-intake-btn"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F9F8F6] bg-white border border-[#E5E2DD] px-3.5 py-2 rounded-md shadow-2xs transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK TO INTAKE CONSOLE</span>
              </button>
              
              <span className="text-[10px] font-mono text-[#666] font-bold uppercase tracking-wider">
                NIVA EMERGENCY ACTION RUNNER
              </span>
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

      {/* Footer */}
      <footer className="border-t border-[#E5E2DD] bg-[#FDFCFB] py-8 px-4 text-xs text-[#666]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#027A48]" />
            <span className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[11px]">NIVA CAMPUS HEALTH & EMERGENCY CO-PILOT</span>
            <span className="text-[#999]">•</span>
            <span className="text-[11px] text-[#666]">Indian University Safety Standards</span>
          </div>
          <div className="text-[10px] font-mono text-[#888] uppercase tracking-wider">
            PWA Offline • Web Speech • Gemini Multimodal
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
