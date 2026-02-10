import { useState, useEffect, useRef } from 'react';

type OrderStatus = 'idle' | 'Order Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';

const statusProgression: OrderStatus[] = ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'];

export function useOrderTracking() {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const runIdRef = useRef<number>(0);

  // Clear any pending timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Start tracking for a new order
  const startTracking = () => {
    // Increment run ID to invalidate any pending updates from previous runs
    runIdRef.current += 1;
    const currentRunId = runIdRef.current;

    // Clear any existing timer
    clearTimer();

    // Start at "Order Received"
    setCurrentStatus('Order Received');
    setCurrentStepIndex(0);

    // Schedule progression through remaining statuses
    const scheduleNextStatus = (stepIndex: number) => {
      if (stepIndex >= statusProgression.length - 1) {
        // Already at the last status
        return;
      }

      timerRef.current = setTimeout(() => {
        // Only update if this is still the current run
        if (runIdRef.current === currentRunId) {
          const nextIndex = stepIndex + 1;
          setCurrentStatus(statusProgression[nextIndex]);
          setCurrentStepIndex(nextIndex);
          scheduleNextStatus(nextIndex);
        }
      }, 3000); // 3 seconds between each status
    };

    scheduleNextStatus(0);
  };

  // Reset tracking to idle state
  const resetTracking = () => {
    runIdRef.current += 1;
    clearTimer();
    setCurrentStatus('idle');
    setCurrentStepIndex(-1);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  return {
    currentStatus,
    currentStepIndex,
    startTracking,
    resetTracking,
    hasActiveOrder: currentStatus !== 'idle',
  };
}
