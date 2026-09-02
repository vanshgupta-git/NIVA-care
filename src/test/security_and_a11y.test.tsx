import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';
import { Header } from '../components/Header';
import { IncidentConsole } from '../components/IncidentConsole';

describe('Security & Accessibility Verification', () => {
  describe('Security Constraints', () => {
    it('does not expose Gemini API keys in the rendered DOM', () => {
      const { container } = render(<App />);
      const domHtml = container.innerHTML;

      expect(domHtml).not.toContain('GEMINI_API_KEY');
      expect(domHtml).not.toContain('AIzaSy');
      expect((window as any).GEMINI_API_KEY).toBeUndefined();
    });
  });

  describe('Accessibility (a11y) Conformance', () => {
    it('provides accessible names for all primary interactive buttons', () => {
      render(
        <Header
          currentLanguage="en"
          onLanguageChange={() => {}}
          onOpenEmergencyCall={() => {}}
        />
      );

      expect(screen.getByRole('button', { name: /CAMPUS SOS/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'हिन्दी' })).toBeInTheDocument();
    });

    it('associates inputs with explicit labels in IncidentConsole', () => {
      render(
        <IncidentConsole
          currentLanguage="en"
          onAnalyze={() => {}}
          onSelectPreset={() => {}}
          isAnalyzing={false}
        />
      );

      const textarea = screen.getByLabelText(/SYMPTOMS \/ PROBLEM DESCRIPTION/i);
      expect(textarea).toBeInTheDocument();

      const locationSelect = screen.getByLabelText(/CAMPUS LOCATION/i);
      expect(locationSelect).toBeInTheDocument();
    });
  });
});
