import { describe, it, expect } from 'vitest';
import { validateImageFile, formatFileSize } from '../services/geminiService';
import { parseScore } from '../types';

describe('Validation and Formatting Utilities', () => {
  describe('validateImageFile', () => {
    it('rejects null or undefined file', () => {
      const result = validateImageFile(null as any);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('No image file');
    });

    it('accepts valid JPEG image file', () => {
      const file = new File(['mock content'], 'photo.jpg', { type: 'image/jpeg' });
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('accepts valid PNG image file', () => {
      const file = new File(['mock content'], 'evidence.png', { type: 'image/png' });
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('accepts valid WEBP image file', () => {
      const file = new File(['mock content'], 'sample.webp', { type: 'image/webp' });
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
    });

    it('rejects unsupported file types (e.g. text, pdf, exe)', () => {
      const txtFile = new File(['notes'], 'notes.txt', { type: 'text/plain' });
      expect(validateImageFile(txtFile).valid).toBe(false);

      const pdfFile = new File(['pdf data'], 'report.pdf', { type: 'application/pdf' });
      expect(validateImageFile(pdfFile).valid).toBe(false);
    });

    it('rejects oversized files exceeding 15MB limit', () => {
      // 16MB file
      const largeFile = new File([new ArrayBuffer(16 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
      const result = validateImageFile(largeFile);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('too large');
    });
  });

  describe('formatFileSize', () => {
    it('formats bytes correctly', () => {
      expect(formatFileSize(500)).toBe('500 B');
    });

    it('formats kilobytes correctly', () => {
      expect(formatFileSize(1024 * 50)).toBe('50.0 KB');
    });

    it('formats megabytes correctly', () => {
      expect(formatFileSize(1024 * 1024 * 2.5)).toBe('2.5 MB');
    });
  });

  describe('parseScore', () => {
    it('parses valid numeric score correctly', () => {
      expect(parseScore(85)).toBe(85);
      expect(parseScore(100)).toBe(100);
      expect(parseScore(0)).toBe(0);
    });

    it('parses string representations of numbers', () => {
      expect(parseScore('92')).toBe(92);
      expect(parseScore('0')).toBe(0);
    });

    it('clamps scores between 0 and 100', () => {
      expect(parseScore(150)).toBe(100);
      expect(parseScore(-20)).toBe(0);
    });

    it('returns fallback score on invalid or NaN input', () => {
      expect(parseScore(NaN, 70)).toBe(70);
      expect(parseScore(undefined, 80)).toBe(80);
      expect(parseScore('invalid-text', 50)).toBe(50);
      expect(parseScore(null, 65)).toBe(65);
    });

    it('distinguishes legitimate 0 from missing value', () => {
      // Critical check: 0 is a valid score and should NOT be overridden by fallback
      expect(parseScore(0, 85)).toBe(0);
    });
  });
});
