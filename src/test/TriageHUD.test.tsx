import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TriageHUD } from '../components/TriageHUD';
import { SafetyAssessment } from '../types';

describe('TriageHUD Component', () => {
  const mockAssessment: SafetyAssessment = {
    hazard_type: 'Chemical exposure / Acid burn',
    severity: 'critical',
    summary: 'High-risk corrosive chemical contact identified.',
    strengths: ['Immediate chemical hazard classification', 'Rapid flushing'],
    weaknesses: ['Corrosive chemical penetration into dermis', 'Delayed irrigation risk'],
    recommendations: ['Flush continuously with water for 15 minutes', 'Transport to dispensary'],
    detectedElements: ['Chemical splash pattern'],
    campus_context: 'Chemistry Lab — Lab Annex 3',
    do_not_rules: ['Do NOT rub affected area.'],
    steps: [
      { title: 'Move away', duration_seconds: 10, action_detail: 'Move to safety.' }
    ],
    whatsapp_message: 'Alert',
    isAiGenerated: true,
    analyzedImagePreview: 'data:image/jpeg;base64,sample'
  };

  const mockReset = vi.fn();

  it('renders hazard type, severity level, campus location, and summary', () => {
    render(
      <TriageHUD
        assessment={mockAssessment}
        currentLanguage="en"
        onReset={mockReset}
      />
    );

    expect(screen.getByText(/Chemical exposure \/ Acid burn/i)).toBeInTheDocument();
    expect(screen.getByText(/High-risk corrosive chemical contact identified/i)).toBeInTheDocument();
    expect(screen.getByText(/CRITICAL SEVERITY/i)).toBeInTheDocument();
    expect(screen.getByText(/Chemistry Lab — Lab Annex 3/i)).toBeInTheDocument();
  });

  it('renders key clinical stabilizers, hazards, and action recommendations', () => {
    render(
      <TriageHUD
        assessment={mockAssessment}
        currentLanguage="en"
        onReset={mockReset}
      />
    );

    expect(screen.getByText(/Key Clinical Stabilizers/i)).toBeInTheDocument();
    expect(screen.getByText(/Immediate chemical hazard classification/i)).toBeInTheDocument();

    expect(screen.getByText(/Risk Factors & Hazards/i)).toBeInTheDocument();
    expect(screen.getByText(/Corrosive chemical penetration into dermis/i)).toBeInTheDocument();

    expect(screen.getByText(/Action Recommendations/i)).toBeInTheDocument();
    expect(screen.getByText(/Flush continuously with water for 15 minutes/i)).toBeInTheDocument();
  });

  it('calls onReset when Analyze Another Incident button is clicked', () => {
    render(
      <TriageHUD
        assessment={mockAssessment}
        currentLanguage="en"
        onReset={mockReset}
      />
    );

    const resetBtn = screen.getByRole('button', { name: /Analyze Another Incident/i });
    fireEvent.click(resetBtn);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
