import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { analyzeIncident, processAndOptimizeImage } from '../services/geminiService';
import { INCIDENT_PRESETS } from '../data/presets';

describe('Gemini and Incident Services', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('analyzeIncident', () => {
    it('returns structured SafetyAssessment on successful API response', async () => {
      const mockApiResponse = {
        hazard_type: 'Chemical exposure / Acid burn',
        severity: 'critical',
        overallScore: 94,
        codeQuality: 92,
        security: 96,
        efficiency: 95,
        testing: 88,
        accessibility: 90,
        problemStatementAlignment: 98,
        summary: 'High-risk corrosive chemical splash identified.',
        strengths: ['Immediate hazard classification', 'Rapid flushing'],
        weaknesses: ['Tissue necrosis hazard', 'Chemical permeation'],
        recommendations: ['Continuous 15-minute flush', 'Transport to dispensary'],
        detectedElements: ['Chemical splash pattern'],
        campus_context: 'Chemistry Lab — Lab Annex 3',
        do_not_rules: ['Do NOT rub affected area.'],
        steps: [
          { title: 'Move away', duration_seconds: 10, action_detail: 'Move to safety.' },
          { title: 'Flush water', duration_seconds: 900, action_detail: 'Flush with tap water.' }
        ],
        whatsapp_message: '🚨 EMERGENCY ALERT: Chemical exposure'
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse
      });

      const result = await analyzeIncident({
        text: 'Acid spilled on forearm',
        campusContext: 'Chemistry Lab',
        language: 'en'
      });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result.hazard_type).toBe('Chemical exposure / Acid burn');
      expect(result.severity).toBe('critical');
      expect(result.overallScore).toBe(94);
      expect(result.scores.testing).toBe(88);
      expect(result.scores.codeQuality).toBe(92);
      expect(result.isAiGenerated).toBe(true);
      expect(result.steps.length).toBe(2);
    });

    it('falls back gracefully to verified presets on server 500 failure', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500
      });

      const result = await analyzeIncident({
        text: 'H2SO4 acid spill on hand in lab',
        campusContext: 'Chemistry Lab',
        language: 'en'
      });

      expect(result).toBeDefined();
      expect(result.hazard_type).toContain('Chemical exposure');
      expect(result.severity).toBe('critical');
      expect(result.isAiGenerated).toBe(false);
      expect(result.steps.length).toBeGreaterThan(0);
    });

    it('selects dog bite preset when dog keywords are provided and server fails', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));

      const result = await analyzeIncident({
        text: 'Stray dog bite near canteen with bleeding',
        campusContext: 'Canteen Quadrangle',
        language: 'en'
      });

      expect(result.hazard_type).toContain('Animal bite');
      expect(result.severity).toBe('moderate');
      expect(result.isAiGenerated).toBe(false);
    });

    it('selects heat stroke preset when heat collapse keywords are provided and server fails', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));

      const result = await analyzeIncident({
        text: 'Student collapsed unconscious in hot sun on ground',
        campusContext: 'Sports Ground',
        language: 'en'
      });

      expect(result.hazard_type.toLowerCase()).toContain('heat');
      expect(result.severity).toBe('critical');
      expect(result.isAiGenerated).toBe(false);
    });

    it('preserves image preview and metadata in the returned assessment', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          hazard_type: 'Thermal burn',
          severity: 'moderate',
          overallScore: 70,
          scores: { codeQuality: 80, security: 85, efficiency: 90, testing: 80, accessibility: 85, problemStatementAlignment: 90 },
          summary: 'Thermal burn assessment.',
          strengths: ['Stable vitals'],
          weaknesses: ['Dermal blister risk'],
          recommendations: ['Cool water flush'],
          campus_context: 'Hostel Pantry',
          do_not_rules: ['Do not apply toothpaste'],
          steps: [{ title: 'Cool water', duration_seconds: 600, action_detail: 'Cool with tap water' }],
          whatsapp_message: 'Alert'
        })
      });

      const mockMetadata = {
        name: 'burn_photo.jpg',
        sizeBytes: 1024 * 500,
        formattedSize: '500.0 KB',
        width: 1200,
        height: 800,
        type: 'image/jpeg'
      };

      const result = await analyzeIncident({
        text: '',
        imageBase64: 'data:image/jpeg;base64,samplebase64',
        imageMime: 'image/jpeg',
        imageMetadata: mockMetadata,
        campusContext: 'Hostel Pantry',
        language: 'en'
      });

      expect(result.analyzedImagePreview).toBe('data:image/jpeg;base64,samplebase64');
      expect(result.imageMetadata).toEqual(mockMetadata);
    });
  });

  describe('processAndOptimizeImage', () => {
    it('rejects unsupported file type', async () => {
      const invalidFile = new File(['mock content'], 'test.txt', { type: 'text/plain' });
      await expect(processAndOptimizeImage(invalidFile)).rejects.toThrow();
    });
  });
});
