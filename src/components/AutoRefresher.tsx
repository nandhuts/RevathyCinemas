"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AutoRefresher() {
  const router = useRouter();

  useEffect(() => {
    // Refresh the router every 5 minutes (300,000 ms) automatically
    const interval = setInterval(() => {
      console.log("Auto-refreshing movies list to update Now Showing statuses...");
      router.refresh();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [router]);

  return null; // Invisible component
}
