import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';

describe('App Integration Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders application successfully on startup in IDLE state', () => {
    render(<App />);

    expect(screen.getByText('NIVA')).toBeInTheDocument();
    expect(screen.getByText(/Upload Image for AI Evaluation/i)).toBeInTheDocument();
    expect(screen.getByText(/Verified Benchmark Protocols/i)).toBeInTheDocument();
  });

  it('navigates from IDLE to TRIAGE_AND_PROTOCOL state when preset is clicked', () => {
    render(<App />);

    const presetBtn = screen.getByText(/Chemical exposure \/ acid burn/i).closest('button');
    expect(presetBtn).toBeTruthy();
    if (presetBtn) {
      fireEvent.click(presetBtn);
    }

    expect(screen.getByText(/Active 60-Second Action Protocol/i)).toBeInTheDocument();
    expect(screen.getByText(/BACK TO INTAKE CONSOLE/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Chemical exposure \/ acid burn/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Code Quality/i)).toBeInTheDocument();
    expect(screen.getByText(/Critical Safety Contraindications/i)).toBeInTheDocument();
  });

  it('navigates back to IDLE state when Back to Intake Console button is clicked', () => {
    render(<App />);

    const presetBtn = screen.getByText(/Chemical exposure \/ acid burn/i).closest('button');
    if (presetBtn) fireEvent.click(presetBtn);

    const backBtn = screen.getByRole('button', { name: /BACK TO INTAKE CONSOLE/i });
    fireEvent.click(backBtn);

    expect(screen.getByText(/Upload Image for AI Evaluation/i)).toBeInTheDocument();
  });

  it('opens and closes Emergency SOS drawer from Header', () => {
    render(<App />);

    const headerSosBtn = screen.getAllByRole('button', { name: /CAMPUS SOS/i })[0];
    fireEvent.click(headerSosBtn);

    expect(screen.getByText(/CAMPUS SPEED-DIAL/i)).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByText(/CAMPUS SPEED-DIAL/i)).not.toBeInTheDocument();
  });

  it('dynamically translates active assessment when language is changed', () => {
    render(<App />);

    // Select acid splash preset
    const presetBtn = screen.getByText(/Chemical exposure \/ acid burn/i).closest('button');
    if (presetBtn) fireEvent.click(presetBtn);

    // Switch to Hindi
    const hindiBtn = screen.getByRole('button', { name: 'हिन्दी' });
    fireEvent.click(hindiBtn);

    expect(screen.getAllByText(/रासायनिक रिसाव \/ एसिड बर्न/i)[0]).toBeInTheDocument();
  });

  it('performs full AI analysis workflow on incident submission', async () => {
    const mockApiResponse = {
      hazard_type: 'Severe Laceration Trauma',
      severity: 'moderate',
      overallScore: 78,
      codeQuality: 88,
      security: 82,
      efficiency: 85,
      testing: 80,
      accessibility: 90,
      problemStatementAlignment: 92,
      summary: 'Deep cut on palm requiring direct mechanical pressure.',
      strengths: ['Intact distal perfusion', 'Bleeding localized'],
      weaknesses: ['Secondary bacterial infection hazard'],
      recommendations: ['Direct sterile pressure for 10 minutes'],
      detectedElements: ['Laceration wound'],
      campus_context: 'Mechanical Workshop',
      do_not_rules: ['Do NOT apply turmeric powder.'],
      steps: [
        { title: 'Apply direct pressure', duration_seconds: 600, action_detail: 'Press sterile gauze firmly.' }
      ],
      whatsapp_message: 'Alert: Laceration',
      isAiGenerated: true
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    });

    render(<App />);

    const textarea = screen.getByLabelText(/SYMPTOMS \/ PROBLEM DESCRIPTION/i);
    fireEvent.change(textarea, { target: { value: 'Deep cut with continuous bleeding' } });

    const submitBtn = screen.getByRole('button', { name: /ANALYZE & GENERATE EVALUATION/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Severe Laceration Trauma/i)).toBeInTheDocument();
      expect(screen.getByText(/Deep cut on palm requiring direct mechanical pressure/i)).toBeInTheDocument();
      expect(screen.getByText('78')).toBeInTheDocument();
    });
  });
});
