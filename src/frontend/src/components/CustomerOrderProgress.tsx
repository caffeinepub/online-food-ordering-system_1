import { Card } from '@/components/ui/card';

interface CustomerOrderProgressProps {
  currentStep: number;
}

export function CustomerOrderProgress({ currentStep }: CustomerOrderProgressProps) {
  const stepLabels = [
    'Restaurant & Menu',
    'Cart',
    'Delivery Details',
    'Order Tracking',
  ];

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Current Step</p>
          <p className="text-lg font-semibold">
            Step {currentStep}/4: {stepLabels[currentStep - 1]}
          </p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 w-8 rounded-full transition-colors ${
                step <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
