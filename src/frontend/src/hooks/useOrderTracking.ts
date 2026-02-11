import { useState, useEffect, useRef } from 'react';

type OrderStatus = 'idle' | 'Order Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';

const statusProgression: OrderStatus[] = ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'];

export function useOrderTracking() {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const runIdRef = useRef<number>(0);
  const isMountedRef = useRef<boolean>(true);

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
    if (isMountedRef.current) {
      setCurrentStatus('Order Received');
      setCurrentStepIndex(0);
    }

    // Schedule progression through remaining statuses
    const scheduleNextStatus = (stepIndex: number) => {
      if (stepIndex >= statusProgression.length - 1) {
        // Already at the last status
        return;
      }

      timerRef.current = setTimeout(() => {
        // Only update if this is still the current run and component is mounted
        if (runIdRef.current === currentRunId && isMountedRef.current) {
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
    if (isMountedRef.current) {
      setCurrentStatus('idle');
      setCurrentStepIndex(-1);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
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
