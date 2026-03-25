import OrderFlow from '@/components/order/OrderFlow';
import { Suspense } from 'react';

export const metadata = {
  title: 'Smart Order Flow | Revathy Cinemax',
};

export default function OrderPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 bg-black relative">
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <Suspense fallback={<div className="text-white text-center py-20 font-[var(--font-cinematic)] animate-pulse">Loading Cinematic Experience...</div>}>
          <OrderFlow />
        </Suspense>
      </div>
    </div>
  );
}
