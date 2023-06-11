'use client';

import { useRouter } from 'next/navigation';

type BackButtonProps = {
  cssClass?: string;
};

export default function BackButton({ cssClass }: BackButtonProps) {
  const router = useRouter();

  return (
    <button type="button" className={cssClass} onClick={() => router.back()}>
      Back
    </button>
  );
}
