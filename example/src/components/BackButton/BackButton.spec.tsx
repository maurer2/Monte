import React, { ComponentPropsWithoutRef } from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, afterEach } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import mockRouter from 'next-router-mock';

expect.extend(matchers);

import Component from '.';

type Props = ComponentPropsWithoutRef<typeof Component>;

describe('BackButton', () => {
  vi.mock('next/navigation', () => require('next-router-mock'));

  const propsDefault: Props = {
    cssClass: 'meow-large',
  };

  afterEach(() => {
    cleanup();
  });

  const setup = (props?: Props) => render(
    <Component {...propsDefault} {...props} />
  );

  it('renders the component', () => {
    setup();

    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('is a button', () => {
    setup();

    expect(screen.getByRole('button', { name: 'Back' }).nodeName).toBe('BUTTON');
  });

  it('applies props', () => {
    setup();

    expect(screen.getByRole('button', { name: 'Back' })).toHaveClass('meow-large');
  });

  it.skip('triggers goBack on click', async () => {
    setup();

    mockRouter.push('/last-page');
    mockRouter.push('/current-page');

    await userEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(mockRouter).toMatchObject({
      asPath: '/last-page',
      pathname: '/last-page',
    });
  });
});
