import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProtocolRunner } from '../components/ProtocolRunner';
import { ProtocolStep } from '../types';

describe('ProtocolRunner Component', () => {
  const mockSteps: ProtocolStep[] = [
    {
      title: 'Move away from the spill',
      duration_seconds: 10,
      action_detail: 'Move to a safe area while avoiding further contact.'
    },
    {
      title: 'Start continuous water flushing',
      duration_seconds: 900,
      action_detail: 'Flush the affected skin with copious running tap water.'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial step title and instructions', () => {
    render(
      <ProtocolRunner
        steps={mockSteps}
        currentLanguage="en"
      />
    );

    expect(screen.getAllByText(/Move away from the spill/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Move to a safe area while avoiding further contact/i)).toBeInTheDocument();
    expect(screen.getByText(/STEP 01/i)).toBeInTheDocument();
    expect(screen.getByText(/OF 02/i)).toBeInTheDocument();
  });

  it('advances to next step when Next button is clicked', () => {
    render(
      <ProtocolRunner
        steps={mockSteps}
        currentLanguage="en"
      />
    );

    const nextBtn = screen.getByRole('button', { name: /Next Step/i });
    fireEvent.click(nextBtn);

    expect(screen.getAllByText(/Start continuous water flushing/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Flush the affected skin with copious running tap water/i)).toBeInTheDocument();
    expect(screen.getByText(/STEP 02/i)).toBeInTheDocument();
  });

  it('toggles timer between pause and resume', () => {
    render(
      <ProtocolRunner
        steps={mockSteps}
        currentLanguage="en"
      />
    );

    const pauseBtn = screen.getByRole('button', { name: /Pause/i });
    fireEvent.click(pauseBtn);

    expect(screen.getByRole('button', { name: /Resume/i })).toBeInTheDocument();

    const resumeBtn = screen.getByRole('button', { name: /Resume/i });
    fireEvent.click(resumeBtn);

    expect(screen.getByRole('button', { name: /Pause/i })).toBeInTheDocument();
  });

  it('resets timer when Reset Timer button is clicked', () => {
    render(
      <ProtocolRunner
        steps={mockSteps}
        currentLanguage="en"
      />
    );

    const resetBtn = screen.getByRole('button', { name: /Reset Timer/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText('00:10')).toBeInTheDocument();
  });

  it('triggers voice guidance synthesis on voice toggle', () => {
    render(
      <ProtocolRunner
        steps={mockSteps}
        currentLanguage="en"
      />
    );

    const voiceBtn = screen.getByRole('button', { name: /Voice Guidance/i });
    fireEvent.click(voiceBtn);

    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });
});
