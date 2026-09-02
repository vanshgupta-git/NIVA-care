import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TriageHUD } from '../components/TriageHUD';
import { SafetyAssessment } from '../types';

describe('TriageHUD Component', () => {
  const mockAssessment: SafetyAssessment = {
    hazard_type: 'Chemical exposure / Acid burn',
    severity: 'critical',
    overallScore: 94,
    scores: {
      codeQuality: 92,
      security: 96,
      efficiency: 95,
      testing: 88,
      accessibility: 90,
      problemStatementAlignment: 98
    },
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

  it('renders overall score gauge, hazard type, and summary', () => {
    render(
      <TriageHUD
        assessment={mockAssessment}
        currentLanguage="en"
        onReset={mockReset}
      />
    );

    expect(screen.getByText(/Chemical exposure \/ Acid burn/i)).toBeInTheDocument();
    expect(screen.getByText(/High-risk corrosive chemical contact identified/i)).toBeInTheDocument();
    expect(screen.getByText('94')).toBeInTheDocument();
    expect(screen.getByText(/Chemistry Lab — Lab Annex 3/i)).toBeInTheDocument();
  });

  it('renders all 6 category scores accurately', () => {
    render(
      <TriageHUD
        assessment={mockAssessment}
        currentLanguage="en"
        onReset={mockReset}
      />
    );

    expect(screen.getByText('Code Quality')).toBeInTheDocument();
    expect(screen.getByText('92')).toBeInTheDocument();

    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('96')).toBeInTheDocument();

    expect(screen.getByText('Efficiency')).toBeInTheDocument();
    expect(screen.getByText('95')).toBeInTheDocument();

    expect(screen.getByText('Testing')).toBeInTheDocument();
    expect(screen.getByText('88')).toBeInTheDocument();

    expect(screen.getByText('Accessibility')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();

    expect(screen.getByText('Problem Alignment')).toBeInTheDocument();
    expect(screen.getByText('98')).toBeInTheDocument();
  });

  it('renders strengths, weaknesses, and recommendations', () => {
    render(
      <TriageHUD
        assessment={mockAssessment}
        currentLanguage="en"
        onReset={mockReset}
      />
    );

    expect(screen.getByText(/Key Strengths & Stabilizers/i)).toBeInTheDocument();
    expect(screen.getByText(/Immediate chemical hazard classification/i)).toBeInTheDocument();

    expect(screen.getByText(/Risk Factors & Hazards/i)).toBeInTheDocument();
    expect(screen.getByText(/Corrosive chemical penetration into dermis/i)).toBeInTheDocument();

    expect(screen.getByText(/Actionable Recommendations/i)).toBeInTheDocument();
    expect(screen.getByText(/Flush continuously with water for 15 minutes/i)).toBeInTheDocument();
  });

  it('calls onReset when Analyze Another Image button is clicked', () => {
    render(
      <TriageHUD
        assessment={mockAssessment}
        currentLanguage="en"
        onReset={mockReset}
      />
    );

    const resetBtn = screen.getByRole('button', { name: /Analyze Another Image/i });
    fireEvent.click(resetBtn);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
