import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../components/Header';
import { OfflineIndicator } from '../components/OfflineIndicator';

describe('Header and Navigation Components', () => {
  it('renders brand identity, telemetry status, and language switchers', () => {
    const mockLangChange = vi.fn();
    const mockOpenEmergency = vi.fn();

    render(
      <Header
        currentLanguage="en"
        onLanguageChange={mockLangChange}
        onOpenEmergencyCall={mockOpenEmergency}
      />
    );

    expect(screen.getByText('NIVA')).toBeInTheDocument();
    expect(screen.getByText(/Campus Health Grid Active/i)).toBeInTheDocument();

    const hindiBtn = screen.getByRole('button', { name: 'हिन्दी' });
    fireEvent.click(hindiBtn);
    expect(mockLangChange).toHaveBeenCalledWith('hi');

    const sosBtn = screen.getByRole('button', { name: /CAMPUS SOS/i });
    fireEvent.click(sosBtn);
    expect(mockOpenEmergency).toHaveBeenCalledTimes(1);
  });

  it('renders offline alert only when network status is offline', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false
    });

    render(<OfflineIndicator currentLanguage="en" />);

    expect(screen.getByText(/Offline mode active/i)).toBeInTheDocument();
  });
});
