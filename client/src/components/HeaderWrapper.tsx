'use client';

import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

export default function HeaderWrapper() {
  const router = useRouter();

  function handleBusca(termo: string) {
    router.push(`/?busca=${termo}`);
  }

  return <Header />;
}