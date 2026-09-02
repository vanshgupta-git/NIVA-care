import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { 
  Camera, 
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
  HeartPulse,
  Siren,
  MessageSquare,
  ShieldCheck,
  Building2,
  AlertCircle,
  ChevronRight,
  CheckCircle2,
  FileImage
} from 'lucide-react';
import { Language, IncidentPreset } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { INCIDENT_PRESETS } from '../data/presets';
import { compressImage, validateImageFile } from '../services/geminiService';

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
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Quick Suggestion Prompts for Indian Campus Health
  const quickSuggestions = [
    { label: '🧪 Acid / Chemical Splash', text: 'Acid chemical splash in chemistry lab on arm', location: 'Chemistry Lab — Lab Annex 3' },
    { label: '🐕 Stray Dog Bite', text: 'Stray dog bite near canteen with bleeding', location: 'Canteen Quadrangle' },
    { label: '☀️ Fainted / Heat Stroke', text: 'Student collapsed unconscious in direct sun on sports field', location: 'Sports Ground' },
    { label: '⚡ Electrical / Thermal Scald', text: 'Hot water scald burn in hostel pantry', location: 'Hostel Wing B — Pantry' },
    { label: '🩹 Deep Cut / Bleeding', text: 'Deep cut on hand with continuous active bleeding', location: 'Mechanical Workshop' }
  ];

  const handleFile = async (file: File) => {
    if (!file) return;
    setUploadError(null);

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file.');
      return;
    }

    try {
      setIsCompressing(true);
      const { base64, mimeType } = await compressImage(file);
      setImagePreview(base64);
      setImageMime(mimeType);
      setImageFileName(file.name);
    } catch (e: any) {
      console.error('Image compression error:', e);
      setUploadError(e?.message || 'Failed to process image. Please try another.');
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
    setImageFileName(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnalyzing || (!description.trim() && !imagePreview)) return;
    
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
        return <FlaskConical className="w-5 h-5 text-rose-600" />;
      case 'electrical':
        return <Flame className="w-5 h-5 text-amber-600" />;
      case 'animal':
        return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      case 'heat':
        return <SunMedium className="w-5 h-5 text-rose-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Asymmetric Grid: Main AI Intake Hub (Left 65%) + Campus Hotlines Deck (Right 35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================= */}
        {/* LEFT / CENTERPIECE: NIVA AI MULTIMODAL HEALTH ASSISTANT */}
        {/* ========================================================= */}
        <section 
          aria-labelledby="intake-hub-heading"
          className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm relative"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-emerald-700">
                    Clinical AI Triage Active
                  </span>
                </div>
                <h2 id="intake-hub-heading" className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-tight">
                  How can NIVA assist right now?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Upload a photo of the wound/hazard or describe symptoms for instant 60-second guidance.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Scenario Chips */}
          <div className="mt-5">
            <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase block mb-2">
              Common Campus Emergencies:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickChip(chip)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 transition-all active:scale-98 cursor-pointer flex items-center gap-1.5"
                >
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Intake */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            
            {/* Hidden file & camera inputs */}
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
              accept="image/jpeg,image/png,image/webp,image/jpg"
              className="hidden"
              onChange={handleFileInputChange}
            />

            {/* Error banner if file is invalid */}
            {uploadError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Image Upload / Preview Zone */}
            {imagePreview ? (
              <div className="space-y-2">
                <div className="relative rounded-2xl border border-slate-200 bg-slate-900 overflow-hidden shadow-sm">
                  <img
                    src={imagePreview}
                    alt="Uploaded incident evidence"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 flex flex-col justify-between p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider bg-indigo-600 text-white px-3 py-1 rounded-full font-bold uppercase flex items-center gap-1.5 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        IMAGE READY FOR AI VISION
                      </span>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition cursor-pointer"
                        title="Remove photo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-black/50 backdrop-blur-xs p-2.5 rounded-xl text-white text-xs">
                      <span className="truncate max-w-[200px] text-slate-200 font-mono text-[11px]">
                        {imageFileName || 'image_evidence.jpg'}
                      </span>
                      <span className="text-emerald-300 font-semibold text-[11px]">
                        AI will diagnose directly from photo
                      </span>
                    </div>
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
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-indigo-500 bg-indigo-50/50'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-2.5">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-xs">
                    {isCompressing ? (
                      <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FileImage className="w-6 h-6 text-indigo-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1.5">
                      <span>{t.dragDropPhoto}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Upload wound, burn, bite, or chemical spill photo (JPG, PNG, WEBP)
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 mt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        cameraInputRef.current?.click();
                      }}
                      className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 shadow-xs transition active:scale-98 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-slate-600" />
                      <span>{t.takePhoto}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 shadow-xs transition active:scale-98 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{t.uploadPhoto}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Description Text Box */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="incident-description-input"
                  className="block text-[11px] font-mono uppercase tracking-wider font-bold text-slate-600"
                >
                  {imagePreview ? 'INCIDENT NOTES (OPTIONAL WITH PHOTO)' : 'INCIDENT SYMPTOMS & OBSERVATION'}
                </label>
                {imagePreview ? (
                  <span className="text-[10px] text-indigo-600 font-mono uppercase bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full font-bold">
                    Optional
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 font-mono">
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
                className="w-full rounded-xl niva-input p-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition resize-none leading-relaxed"
              />
            </div>

            {/* Location Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="location-selector"
                  className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-bold text-slate-600 mb-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
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
                  className="w-full rounded-xl niva-input px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer"
                >
                  {t.campusLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                  <option value="custom" className="font-bold text-indigo-700">
                    + Other / Custom Room Specification
                  </option>
                </select>
              </div>

              {isCustomLoc ? (
                <div>
                  <label 
                    htmlFor="custom-location-input"
                    className="block text-[11px] font-mono uppercase tracking-wider font-bold text-slate-600 mb-1.5"
                  >
                    SPECIFY ROOM / WING / LAB
                  </label>
                  <input
                    id="custom-location-input"
                    type="text"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    placeholder={t.customLocationPlaceholder}
                    className="w-full rounded-xl niva-input px-3.5 py-2.5 text-xs sm:text-sm text-slate-900"
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase mb-1">
                    Campus Geo-fence Status
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Campus Grid Active (Instant SOS Ready)</span>
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
                className={`w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2.5 ${
                  isAnalyzing || (!description.trim() && !imagePreview)
                    ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 active:scale-98'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>ANALYZING EVIDENCE & GENERATING CLINICAL PROTOCOL...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-white fill-white" />
                    <span>{imagePreview ? 'ANALYZE PHOTO WITH GEMINI VISION' : 'ANALYZE & GENERATE 60-SEC PROTOCOL'}</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
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
          
          {/* 1. Emergency Hotlines Card */}
          <div className="bg-rose-50/60 border border-rose-200/80 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3.5 border-b border-rose-200/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
                  <Siren className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Emergency Speed-Dial
                  </h3>
                  <p className="text-[11px] text-rose-700 font-medium">
                    24/7 Priority Assistance
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-800">
                LIVE
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {/* Dispensary */}
              <a
                href="tel:01126591111"
                className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-slate-50 border border-rose-100 hover:border-slate-300 transition-all group shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <HeartPulse className="w-4 h-4 text-emerald-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Campus Dispensary
                    </p>
                    <p className="text-[11px] font-mono text-slate-500">
                      011-2659-1111
                    </p>
                  </div>
                </div>
                <Phone className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
              </a>

              {/* Security */}
              <a
                href="tel:01126591000"
                className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-slate-50 border border-rose-100 hover:border-slate-300 transition-all group shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Security Control Room
                    </p>
                    <p className="text-[11px] font-mono text-slate-500">
                      011-2659-1000
                    </p>
                  </div>
                </div>
                <Phone className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
              </a>

              {/* National 112 */}
              <a
                href="tel:112"
                className="flex items-center justify-between p-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-all group shadow-sm shadow-rose-600/20"
              >
                <div className="flex items-center gap-2.5">
                  <Siren className="w-4 h-4 text-white" />
                  <div>
                    <p className="text-xs font-bold text-white">
                      National Ambulance (112)
                    </p>
                    <p className="text-[10px] text-rose-100">
                      Direct India Emergency
                    </p>
                  </div>
                </div>
                <Phone className="w-3.5 h-3.5 text-white" />
              </a>
            </div>
          </div>

          {/* 2. Campus Medical Facilities Status */}
          <div className="niva-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Campus Medical Facilities
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                OPEN 24/7
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-slate-700">Health Centre Doctors</span>
                </div>
                <span className="text-[11px] font-mono text-slate-900 font-bold">2 on Duty</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-slate-700">Campus Ambulance</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 font-bold">Standby (0-min)</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-slate-700">AED Stations</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 font-bold">4 Active Nodes</span>
              </div>
            </div>
          </div>

          {/* 3. Standards Compliance Tag */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 text-slate-700 text-xs shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 text-xs">WHO & ICMR Guidelines Aligned</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Emergency protocols verified for Indian university campuses.</p>
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
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-indigo-700">
              Verified Protocol Library
            </span>
            <h2 id="presets-heading" className="text-xl font-bold text-slate-900 mt-0.5">
              Instant 60-second procedural guidance for standard campus emergencies:
            </h2>
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
                className="niva-card-hover text-left p-5 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl border ${
                      isCritical ? 'bg-rose-50 border-rose-100' : 'bg-amber-50 border-amber-100'
                    }`}>
                      {getPresetIcon(preset.iconType)}
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                      isCritical
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {localizedData.severity}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {localizedData.hazard_type}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {localizedData.campus_context}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-indigo-600">
                  <span className="text-[11px] text-slate-400 font-normal">
                    {localizedData.steps.length} Steps • 60s
                  </span>
                  <div className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
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
