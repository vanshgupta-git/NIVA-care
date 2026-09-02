import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { 
  Camera, 
  PenTool, 
  Upload, 
  X, 
  MapPin, 
  Zap, 
  FlaskConical, 
  Flame, 
  ShieldAlert, 
  SunMedium, 
  ArrowRight,
  Sparkles,
  Phone,
  Radio,
  HeartPulse,
  Siren,
  MessageSquare,
  ShieldCheck,
  Building2,
  Clock,
  Compass,
  Activity,
  ChevronRight
} from 'lucide-react';
import { Language, IncidentPreset } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { INCIDENT_PRESETS } from '../data/presets';
import { compressImage } from '../services/geminiService';
import { AIOrb } from './AIOrb';
import { ECGWave } from './ECGWave';

interface IncidentConsoleProps {
  currentLanguage: Language;
  onAnalyze: (data: {
    text: string;
    imageBase64: string | null;
    imageMime: string | null;
    location: string;
  }) => void;
  onSelectPreset: (preset: IncidentPreset) => void;
  isAnalyzing: boolean;
}

export const IncidentConsole: React.FC<IncidentConsoleProps> = ({
  currentLanguage,
  onAnalyze,
  onSelectPreset,
  isAnalyzing
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [description, setDescription] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(t.campusLocations[0]);
  const [customLocation, setCustomLocation] = useState('');
  const [isCustomLoc, setIsCustomLoc] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Quick Suggestion Prompts for Indian Campus Health
  const quickSuggestions = [
    { label: '🧪 Acid / Chemical Splash', text: 'Acid chemical splash in chemistry lab on arm', location: 'Chemistry Lab — Lab Annex 3' },
    { label: '🐕 Stray Dog Bite', text: 'Stray dog bite near canteen with bleeding', location: 'Canteen Quadrangle' },
    { label: '☀️ Fainted / Heat Stroke', text: 'Student collapsed unconscious in direct sun on sports field', location: 'Sports Ground' },
    { label: '⚡ Electrical / Thermal Scald', text: 'Hot water scald burn in hostel pantry', location: 'Hostel Wing B — Pantry' },
    { label: '🩹 Deep Cut / Laceration', text: 'Deep cut on hand with continuous active bleeding', location: 'Mechanical Workshop' }
  ];

  const handleFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    try {
      setIsCompressing(true);
      const { base64, mimeType } = await compressImage(file);
      setImagePreview(base64);
      setImageMime(mimeType);
    } catch (e) {
      console.error('Image compression error:', e);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageMime(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() && !imagePreview) return;
    
    const finalLocation = isCustomLoc && customLocation.trim() 
      ? customLocation.trim() 
      : selectedLocation;

    onAnalyze({
      text: description.trim(),
      imageBase64: imagePreview,
      imageMime: imageMime,
      location: finalLocation
    });
  };

  const handleQuickChip = (chip: typeof quickSuggestions[0]) => {
    setDescription(chip.text);
    setSelectedLocation(chip.location);
    setIsCustomLoc(false);
  };

  const getPresetIcon = (type: IncidentPreset['iconType']) => {
    switch (type) {
      case 'chemistry':
        return <FlaskConical className="w-5 h-5 text-red-400" />;
      case 'electrical':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'animal':
        return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case 'heat':
        return <SunMedium className="w-5 h-5 text-red-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in relative z-10">
      
      {/* Top Asymmetric Grid: Main AI Intake Hub (Left 65%) + Live Campus Command Deck (Right 35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================= */}
        {/* LEFT / CENTERPIECE: NIVA AI MULTIMODAL HEALTH ASSISTANT */}
        {/* ========================================================= */}
        <section 
          aria-labelledby="intake-hub-heading"
          className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Subtle Ambient Radial Glow inside Card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Header & Centerpiece AI Orb */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/[0.08] relative z-10">
            <div className="flex items-center gap-5">
              <AIOrb isAnalyzing={isAnalyzing} size="lg" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-cyan-400">
                    Neural Triage Core
                  </span>
                </div>
                <h2 id="intake-hub-heading" className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                  How can NIVA help you right now?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                  Upload a photo or describe symptoms for instant 60-second emergency medical protocol.
                </p>
              </div>
            </div>
          </div>

          {/* Suggested Quick Prompt Chips */}
          <div className="mt-5 relative z-10">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block mb-2.5">
              Common Campus Incidents:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickChip(chip)}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-cyan-500/15 border border-white/[0.08] hover:border-cyan-500/30 text-slate-300 hover:text-cyan-200 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Form Intake */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-6 relative z-10">
            
            {/* Hidden inputs for camera capture & file picking */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileInputChange}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />

            {/* Multimodal Image Drop / Camera Capture Pod */}
            {imagePreview ? (
              <div className="space-y-2">
                <div className="relative rounded-2xl border-2 border-cyan-500/40 bg-slate-950/80 overflow-hidden shadow-xl">
                  <img
                    src={imagePreview}
                    alt="Incident capture"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-black/40 flex flex-col justify-between p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1 rounded-full font-bold uppercase flex items-center gap-1.5 shadow-md">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        IMAGE-FIRST VISION TRIAGE ACTIVE
                      </span>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="p-1.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-red-600 transition cursor-pointer border border-white/10"
                        title={t.removePhoto}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-cyan-200 font-medium flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-cyan-500/20">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Gemini Vision will diagnose directly from this photo. Text description is completely optional.</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-7 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : 'border-white/10 hover:border-cyan-500/40 bg-white/[0.02] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-950 to-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
                    {isCompressing ? (
                      <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Camera className="w-7 h-7 text-cyan-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
                      <span>{t.dragDropPhoto}</span>
                      <span className="text-cyan-400 text-xs font-mono">(Direct Vision)</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Snap wound/spill with camera, drag & drop, or select JPG, PNG, WEBP
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        cameraInputRef.current?.click();
                      }}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 shadow-sm transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{t.takePhoto}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 text-white shadow-sm transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{t.uploadPhoto}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Description Text Box */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label 
                  htmlFor="incident-description-input"
                  className="block text-[11px] font-mono uppercase tracking-widest font-bold text-slate-400"
                >
                  {imagePreview ? 'INCIDENT NOTES (OPTIONAL WITH PHOTO)' : 'INCIDENT SYMPTOMS & OBSERVATION'}
                </label>
                {imagePreview ? (
                  <span className="text-[10px] text-cyan-400 font-mono uppercase bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                    Optional
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono">
                    Multilingual Input Supported
                  </span>
                )}
              </div>
              <textarea
                id="incident-description-input"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  imagePreview 
                    ? '(Optional) Add any specific context, or click analyze to diagnose purely from the image...' 
                    : t.describePlaceholder
                }
                className="w-full rounded-2xl glass-input p-4 text-sm text-slate-100 placeholder:text-slate-500 transition resize-none leading-relaxed"
              />
            </div>

            {/* Location Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="location-selector"
                  className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest font-bold text-slate-400 mb-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{t.locationLabel}</span>
                </label>
                <select
                  id="location-selector"
                  value={isCustomLoc ? 'custom' : selectedLocation}
                  onChange={(e) => {
                    if (e.target.value === 'custom') {
                      setIsCustomLoc(true);
                    } else {
                      setIsCustomLoc(false);
                      setSelectedLocation(e.target.value);
                    }
                  }}
                  className="w-full rounded-xl glass-input px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-200 cursor-pointer"
                >
                  {t.campusLocations.map((loc) => (
                    <option key={loc} value={loc} className="bg-slate-900 text-slate-100">
                      {loc}
                    </option>
                  ))}
                  <option value="custom" className="bg-slate-900 text-cyan-300 font-bold">
                    + Other / Custom Room Specification
                  </option>
                </select>
              </div>

              {isCustomLoc ? (
                <div>
                  <label 
                    htmlFor="custom-location-input"
                    className="block text-[11px] font-mono uppercase tracking-widest font-bold text-slate-400 mb-2"
                  >
                    SPECIFY ROOM / WING / LAB
                  </label>
                  <input
                    id="custom-location-input"
                    type="text"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    placeholder={t.customLocationPlaceholder}
                    className="w-full rounded-xl glass-input px-3.5 py-3 text-xs sm:text-sm text-slate-100"
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase mb-1">
                    Telemetry Coordinates
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.06]">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span>CAMPUS GEO-FENCE: ACTIVE (0.01ms)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Launch AI Protocol CTA Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="analyze-submit-btn"
                disabled={isAnalyzing || (!description.trim() && !imagePreview)}
                className={`w-full py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl cursor-pointer flex items-center justify-center gap-3 relative overflow-hidden group ${
                  isAnalyzing || (!description.trim() && !imagePreview)
                    ? 'bg-white/[0.05] text-slate-600 border border-white/[0.05] cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] border border-cyan-400/30'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>TRIAGING INCIDENT & CALCULATING TIMELINE...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-cyan-200 fill-cyan-200 animate-pulse" />
                    <span>{imagePreview ? '⚡ ANALYZE PHOTO WITH GEMINI VISION' : '⚡ ANALYZE & LAUNCH 60-SEC PROTOCOL'}</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

          </form>
        </section>

        {/* ========================================================= */}
        {/* RIGHT / SIDE COMMAND DECK (EMERGENCY SPEED-DIAL & STATUS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 1. Instant Campus Speed-Dial & SOS Card */}
          <div className="glass-panel-red rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-red-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400">
                  <Siren className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Instant SOS Hotlines
                  </h3>
                  <p className="text-[10px] text-red-300/80 font-mono">
                    24/7 Priority Emergency Line
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 animate-pulse">
                HOT
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {/* Dispensary Hotline */}
              <a
                href="tel:01126591111"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-red-500/15 border border-white/[0.08] hover:border-red-500/30 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <HeartPulse className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-red-200">
                      Campus Dispensary
                    </p>
                    <p className="text-[10px] font-mono text-slate-400">
                      011-2659-1111 (24/7)
                    </p>
                  </div>
                </div>
                <Phone className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
              </a>

              {/* Security Command */}
              <a
                href="tel:01126591000"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-blue-500/15 border border-white/[0.08] hover:border-blue-500/30 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-blue-200">
                      Security Control Room
                    </p>
                    <p className="text-[10px] font-mono text-slate-400">
                      011-2659-1000 (Main Gate)
                    </p>
                  </div>
                </div>
                <Phone className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
              </a>

              {/* National 112 */}
              <a
                href="tel:112"
                className="flex items-center justify-between p-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Siren className="w-4 h-4 text-red-400" />
                  <div>
                    <p className="text-xs font-bold text-white">
                      National Ambulance (112)
                    </p>
                    <p className="text-[10px] font-mono text-red-300/80">
                      Direct India Emergency
                    </p>
                  </div>
                </div>
                <Phone className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* 2. Campus Health Facilities Live Status */}
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Campus Facilities Status
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                ONLINE
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="font-semibold text-slate-300">Dispensary Annex</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-300 font-bold">2 Doctors on Duty</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="font-semibold text-slate-300">Ambulance Unit</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-300 font-bold">Standby (0-min)</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="font-semibold text-slate-300">AED Stations</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">4 Active Nodes</span>
              </div>
            </div>

            {/* Animated ECG Heartbeat waveform */}
            <div className="pt-2 border-t border-white/[0.06]">
              <ECGWave color="#06B6D4" height={22} />
            </div>
          </div>

          {/* 3. Safety Standards & Offline Compliance */}
          <div className="glass-card rounded-2xl p-4 flex items-center gap-3 text-slate-300 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white text-[11px]">ICMR & WHO First-Aid Verified</p>
              <p className="text-[10px] text-slate-400">Protocols execute locally with zero-network fallback.</p>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* BOTTOM SECTION: INSTANT VERIFIED SCENARIOS & PRESETS */}
      {/* ========================================================= */}
      <section 
        aria-labelledby="presets-heading"
        className="space-y-4 pt-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <h2 id="presets-heading" className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold text-amber-400">
                Verified Scenario Library
              </h2>
            </div>
            <p className="text-lg font-bold text-white mt-0.5">
              Launch instant 60-second procedural guidance for standard emergencies:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INCIDENT_PRESETS.map((preset) => {
            const localizedData = preset.data[currentLanguage] || preset.data.en;
            const isCritical = localizedData.severity === 'critical';

            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                id={`preset-card-${preset.id}`}
                className="glass-card-interactive text-left p-5 rounded-2xl flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl border ${
                      isCritical ? 'bg-red-500/15 border-red-500/30' : 'bg-amber-500/15 border-amber-500/30'
                    }`}>
                      {getPresetIcon(preset.iconType)}
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                      isCritical
                        ? 'bg-red-950/80 text-red-300 border-red-500/30'
                        : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                    }`}>
                      {localizedData.severity}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {localizedData.hazard_type}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {localizedData.campus_context}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono font-bold text-cyan-400">
                  <span className="text-[11px] text-slate-400 group-hover:text-cyan-300 transition-colors">
                    {localizedData.steps.length} Steps • 60s
                  </span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>LAUNCH</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

    </div>
  );
};
