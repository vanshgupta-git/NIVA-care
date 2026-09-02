import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmergencyDispatchPanel } from '../components/EmergencyDispatchPanel';
import { EmergencyCallDrawer } from '../components/EmergencyCallDrawer';
import { WhatsAppModal } from '../components/WhatsAppModal';

describe('Emergency Dispatch Components', () => {
  describe('EmergencyDispatchPanel', () => {
    it('renders dispensary, security, 112, and WhatsApp dispatch cards', () => {
      const mockOpenWhatsApp = vi.fn();

      render(
        <EmergencyDispatchPanel
          currentLanguage="en"
          onOpenWhatsAppModal={mockOpenWhatsApp}
        />
      );

      expect(screen.getByText(/CAMPUS DISPENSARY/i)).toBeInTheDocument();
      expect(screen.getByText('011-2659-1111')).toBeInTheDocument();

      expect(screen.getByText(/CAMPUS SECURITY/i)).toBeInTheDocument();
      expect(screen.getByText('011-2659-1000')).toBeInTheDocument();

      expect(screen.getByText(/112 EMERGENCY/i)).toBeInTheDocument();
      expect(screen.getByText('DIAL 112')).toBeInTheDocument();

      const broadcastBtn = screen.getByRole('button', { name: /DISPATCH SOS/i });
      fireEvent.click(broadcastBtn);
      expect(mockOpenWhatsApp).toHaveBeenCalledTimes(1);
    });
  });

  describe('EmergencyCallDrawer', () => {
    it('renders call drawer modal when isOpen is true and handles close action', () => {
      const mockClose = vi.fn();

      const { rerender } = render(
        <EmergencyCallDrawer
          isOpen={false}
          onClose={mockClose}
          currentLanguage="en"
        />
      );

      expect(screen.queryByText(/CAMPUS SPEED-DIAL/i)).not.toBeInTheDocument();

      rerender(
        <EmergencyCallDrawer
          isOpen={true}
          onClose={mockClose}
          currentLanguage="en"
        />
      );

      expect(screen.getByText(/CAMPUS SPEED-DIAL/i)).toBeInTheDocument();

      const closeBtn = screen.getByRole('button', { name: /Close/i });
      fireEvent.click(closeBtn);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('WhatsAppModal', () => {
    it('renders formatted SOS message, copies to clipboard, and opens external WhatsApp', async () => {
      const mockClose = vi.fn();
      const mockMessage = '🚨 CAMPUS EMERGENCY ALERT: Chemistry Lab acid burn';
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

      render(
        <WhatsAppModal
          isOpen={true}
          onClose={mockClose}
          message={mockMessage}
          currentLanguage="en"
        />
      );

      expect(screen.getByText(/CAMPUS BROADCAST/i)).toBeInTheDocument();
      expect(screen.getByText(mockMessage)).toBeInTheDocument();

      // Test copy inside act
      const copyBtn = screen.getByRole('button', { name: /COPY SOS TEXT/i });
      await act(async () => {
        fireEvent.click(copyBtn);
      });
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockMessage);

      // Test WhatsApp link trigger
      const openWhatsAppBtn = screen.getByRole('button', { name: /OPEN WHATSAPP & SEND/i });
      fireEvent.click(openWhatsAppBtn);
      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining('api.whatsapp.com'),
        '_blank'
      );
    });
  });
});
