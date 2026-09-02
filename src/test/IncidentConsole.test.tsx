import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IncidentConsole } from '../components/IncidentConsole';
import { INCIDENT_PRESETS } from '../data/presets';

describe('IncidentConsole Component', () => {
  const mockOnAnalyze = vi.fn();
  const mockOnSelectPreset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders intake hub and scenario prompt chips', () => {
    render(
      <IncidentConsole
        currentLanguage="en"
        onAnalyze={mockOnAnalyze}
        onSelectPreset={mockOnSelectPreset}
        isAnalyzing={false}
      />
    );

    expect(screen.getByText(/Upload Image for AI Evaluation/i)).toBeInTheDocument();
    expect(screen.getByText(/Drop an image to analyze/i)).toBeInTheDocument();
    expect(screen.getByText(/Acid \/ Chemical Splash/i)).toBeInTheDocument();
    expect(screen.getByText(/Stray Dog Bite/i)).toBeInTheDocument();
  });

  it('populates description and location when quick prompt chip is clicked', () => {
    render(
      <IncidentConsole
        currentLanguage="en"
        onAnalyze={mockOnAnalyze}
        onSelectPreset={mockOnSelectPreset}
        isAnalyzing={false}
      />
    );

    const acidChip = screen.getByText(/Acid \/ Chemical Splash/i);
    fireEvent.click(acidChip);

    const textarea = screen.getByLabelText(/SYMPTOMS \/ PROBLEM DESCRIPTION/i) as HTMLTextAreaElement;
    expect(textarea.value).toContain('Acid chemical splash');

    const select = screen.getByLabelText(/CAMPUS LOCATION/i) as HTMLSelectElement;
    expect(select.value).toContain('Chemistry Lab');
  });

  it('disables submit button when inputs are empty and enables when text is provided', () => {
    render(
      <IncidentConsole
        currentLanguage="en"
        onAnalyze={mockOnAnalyze}
        onSelectPreset={mockOnSelectPreset}
        isAnalyzing={false}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /ANALYZE & GENERATE EVALUATION/i });
    expect(submitBtn).toBeDisabled();

    const textarea = screen.getByLabelText(/SYMPTOMS \/ PROBLEM DESCRIPTION/i);
    fireEvent.change(textarea, { target: { value: 'Student fainted in heat' } });

    expect(submitBtn).not.toBeDisabled();
  });

  it('submits incident data with correct parameters on form submission', () => {
    render(
      <IncidentConsole
        currentLanguage="en"
        onAnalyze={mockOnAnalyze}
        onSelectPreset={mockOnSelectPreset}
        isAnalyzing={false}
      />
    );

    const textarea = screen.getByLabelText(/SYMPTOMS \/ PROBLEM DESCRIPTION/i);
    fireEvent.change(textarea, { target: { value: 'Burn on hand from boiling water' } });

    const submitBtn = screen.getByRole('button', { name: /ANALYZE & GENERATE EVALUATION/i });
    fireEvent.click(submitBtn);

    expect(mockOnAnalyze).toHaveBeenCalledTimes(1);
    expect(mockOnAnalyze).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'Burn on hand from boiling water',
        imageBase64: null,
        imageMime: null,
      })
    );
  });

  it('triggers onSelectPreset when a verified scenario card is clicked', () => {
    render(
      <IncidentConsole
        currentLanguage="en"
        onAnalyze={mockOnAnalyze}
        onSelectPreset={mockOnSelectPreset}
        isAnalyzing={false}
      />
    );

    const presetBtn = screen.getByText(/Chemical exposure \/ acid burn/i).closest('button');
    expect(presetBtn).toBeTruthy();
    if (presetBtn) {
      fireEvent.click(presetBtn);
      expect(mockOnSelectPreset).toHaveBeenCalledWith(INCIDENT_PRESETS[0]);
    }
  });

  it('shows processing state and elapsed time when isAnalyzing is true', () => {
    render(
      <IncidentConsole
        currentLanguage="en"
        onAnalyze={mockOnAnalyze}
        onSelectPreset={mockOnSelectPreset}
        isAnalyzing={true}
      />
    );

    expect(screen.getByText(/ANALYZING IMAGE & EVALUATING QUALITY/i)).toBeInTheDocument();
    expect(screen.getByText(/Reading and validating image file/i)).toBeInTheDocument();
  });
});
