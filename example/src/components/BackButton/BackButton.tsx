'use client';

import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';

type BackButtonProps = {
  cssClass?: string;
};

export default function BackButton({ cssClass }: BackButtonProps): ReactElement {
  const router = useRouter();

  return (
    <button type="button" className={cssClass} onClick={() => router.back()}>
      Back
    </button>
  );
}
