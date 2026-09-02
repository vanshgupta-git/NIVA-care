import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DoNotWarnings } from '../components/DoNotWarnings';

describe('DoNotWarnings Component', () => {
  it('renders prohibited rules and contraindications', () => {
    const rules = [
      'Do NOT apply toothpaste or ghee on burns.',
      'Do NOT attempt to neutralize chemical.'
    ];

    render(
      <DoNotWarnings
        rules={rules}
        currentLanguage="en"
      />
    );

    expect(screen.getByText(/Critical Safety Contraindications/i)).toBeInTheDocument();
    expect(screen.getByText(/Do NOT apply toothpaste or ghee on burns./i)).toBeInTheDocument();
    expect(screen.getByText(/Do NOT attempt to neutralize chemical./i)).toBeInTheDocument();
  });

  it('renders nothing if rules array is empty', () => {
    const { container } = render(
      <DoNotWarnings
        rules={[]}
        currentLanguage="en"
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
