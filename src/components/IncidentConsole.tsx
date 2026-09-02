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
  Sparkles
} from 'lucide-react';
import { Language, IncidentPreset } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { INCIDENT_PRESETS } from '../data/presets';
import { compressImage } from '../services/geminiService';

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

  const [activeTab, setActiveTab] = useState<'both' | 'camera' | 'text'>('both');
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

  const getPresetIcon = (type: IncidentPreset['iconType']) => {
    switch (type) {
      case 'chemistry':
        return <FlaskConical className="w-4 h-4 text-[#D92D20]" />;
      case 'electrical':
        return <Flame className="w-4 h-4 text-[#F2994A]" />;
      case 'animal':
        return <ShieldAlert className="w-4 h-4 text-[#F2994A]" />;
      case 'heat':
        return <SunMedium className="w-4 h-4 text-[#D92D20]" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Main Incident Console Card */}
      <section 
        aria-labelledby="console-heading"
        className="bg-white border border-[#E5E2DD] rounded-xl p-6 sm:p-8 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-[#E5E2DD]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D92D20] animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D92D20]">
                Emergency Intake
              </span>
            </div>
            <h2 id="console-heading" className="text-2xl sm:text-3xl font-black tracking-tight text-[#1A1A1A] uppercase leading-none">
              {t.somethingHappened}
            </h2>
            <p className="text-sm text-[#666] font-medium mt-1.5">
              {t.showNivaSubtitle}
            </p>
          </div>

          {/* Mode Switchers */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              id="mode-camera-btn"
              onClick={() => {
                setActiveTab('camera');
                cameraInputRef.current?.click();
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'camera' || imagePreview
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'border border-[#E5E2DD] text-[#666] hover:bg-[#F9F8F6] hover:text-[#1A1A1A]'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t.showNivaBtn}</span>
            </button>

            <button
              type="button"
              id="mode-describe-btn"
              onClick={() => setActiveTab('text')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'border border-[#E5E2DD] text-[#666] hover:bg-[#F9F8F6] hover:text-[#1A1A1A]'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>{t.describeBtn}</span>
            </button>
          </div>
        </div>

        {/* Form Formats */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          
          {/* Hidden inputs for camera and file upload */}
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

          {/* Multimodal Photo Attachment Zone */}
          {imagePreview ? (
            <div className="relative rounded-lg border-2 border-[#1A1A1A] bg-[#1A1A1A] overflow-hidden max-w-md mx-auto sm:mx-0 shadow-md">
              <img
                src={imagePreview}
                alt="Incident capture"
                className="w-full h-56 sm:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider bg-[#D92D20] text-white px-2 py-0.5 rounded font-bold uppercase">
                    IMAGE READY FOR TRIAGE
                  </span>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-1.5 rounded bg-black/60 text-white hover:bg-[#D92D20] transition cursor-pointer"
                    title={t.removePhoto}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-white/90 font-medium">
                  {t.photoCaptured}
                </p>
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
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#D92D20] bg-[#FFF4F2]'
                  : 'border-[#E5E2DD] hover:border-[#888] bg-[#FDFCFB] hover:bg-[#F9F8F6]'
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-white border border-[#E5E2DD] flex items-center justify-center text-[#1A1A1A] shadow-xs">
                  {isCompressing ? (
                    <div className="w-5 h-5 border-2 border-[#D92D20] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Camera className="w-6 h-6 text-[#1A1A1A]" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A]">
                    {t.dragDropPhoto}
                  </p>
                  <p className="text-xs text-[#888] mt-0.5">
                    Supports camera capture, gallery upload, PNG, JPG, WEBP
                  </p>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      cameraInputRef.current?.click();
                    }}
                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border border-[#E5E2DD] bg-white text-[#1A1A1A] hover:bg-[#F9F8F6] shadow-2xs"
                  >
                    {t.takePhoto}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border border-[#E5E2DD] bg-white text-[#1A1A1A] hover:bg-[#F9F8F6] shadow-2xs"
                  >
                    {t.uploadPhoto}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Text Description Box */}
          <div>
            <label 
              htmlFor="incident-description-input"
              className="block text-[11px] uppercase tracking-[0.15em] font-bold text-[#888] mb-2"
            >
              INCIDENT DETAILS (WHAT HAPPENED?)
            </label>
            <textarea
              id="incident-description-input"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.describePlaceholder}
              className="w-full rounded-md border border-[#E5E2DD] bg-[#FDFCFB] p-4 text-sm text-[#1A1A1A] placeholder:text-[#999] focus:border-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] transition resize-none leading-relaxed"
            />
          </div>

          {/* Location Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label 
                htmlFor="location-selector"
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-bold text-[#888] mb-2"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D92D20]" />
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
                className="w-full rounded-md border border-[#E5E2DD] bg-[#FDFCFB] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
              >
                {t.campusLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
                <option value="custom">+ Other / Custom Location</option>
              </select>
            </div>

            {isCustomLoc && (
              <div>
                <label 
                  htmlFor="custom-location-input"
                  className="block text-[11px] uppercase tracking-[0.15em] font-bold text-[#888] mb-2"
                >
                  SPECIFY ROOM / WING
                </label>
                <input
                  id="custom-location-input"
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder={t.customLocationPlaceholder}
                  className="w-full rounded-md border border-[#E5E2DD] bg-[#FDFCFB] px-3.5 py-2.5 text-xs sm:text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
                />
              </div>
            )}
          </div>

          {/* Analyze CTA */}
          <div className="pt-2">
            <button
              type="submit"
              id="analyze-submit-btn"
              disabled={isAnalyzing || (!description.trim() && !imagePreview)}
              className={`w-full py-4 px-6 rounded font-bold uppercase tracking-widest text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-3 ${
                isAnalyzing || (!description.trim() && !imagePreview)
                  ? 'bg-[#E5E2DD] text-[#999] cursor-not-allowed shadow-none'
                  : 'bg-[#1A1A1A] text-white hover:bg-[#333] active:scale-99'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.analyzingTitle}</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-[#F2994A] fill-[#F2994A]" />
                  <span>{t.analyzeBtn}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </section>

      {/* Instant Campus Incident Presets */}
      <section 
        aria-labelledby="presets-heading"
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 id="presets-heading" className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#888]">
              {t.instantPresetsTitle}
            </h2>
            <p className="text-sm font-semibold text-[#1A1A1A] mt-0.5">
              {t.instantPresetsSubtitle}
            </p>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider text-[#666] bg-[#F5F2ED] px-2.5 py-1 rounded border border-[#E5E2DD]">
            1-TAP VERIFIED PROTOCOLS
          </span>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {INCIDENT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              id={`preset-btn-${preset.id}`}
              onClick={() => onSelectPreset(preset)}
              className="flex flex-col justify-between text-left p-4 rounded-md border border-[#E5E2DD] bg-white hover:bg-[#F9F8F6] transition-all group active:scale-98 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[10px] font-bold text-[#999] group-hover:text-[#F2994A] uppercase tracking-wider">
                    {preset.code}
                  </p>
                  <div className="p-1 rounded bg-[#F9F8F6] border border-[#E5E2DD]">
                    {getPresetIcon(preset.iconType)}
                  </div>
                </div>
                
                <h3 className="text-[13px] font-semibold text-[#1A1A1A] leading-snug line-clamp-2">
                  {preset.data[currentLanguage]?.hazard_type || preset.title}
                </h3>
                
                <p className="text-[12px] text-[#666] mt-1 line-clamp-1">
                  "{preset.descriptionSnippet}"
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#E5E2DD] flex items-center justify-between text-[11px] font-medium text-[#666]">
                <span className="flex items-center gap-1 text-[#888]">
                  <MapPin className="w-3 h-3 text-[#999]" />
                  <span className="truncate max-w-[120px]">{preset.location}</span>
                </span>
                <span className="font-bold text-[#D92D20] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform text-[10px] uppercase tracking-wider">
                  LAUNCH →
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
