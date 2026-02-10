import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Store, Truck } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  const portals = [
    {
      title: 'Customer Portal',
      description: 'Browse restaurants, order food, and track your delivery',
      icon: ShoppingBag,
      path: '/customer',
      color: 'text-chart-1',
    },
    {
      title: 'Restaurant Portal',
      description: 'Manage orders, update menu, and track business',
      icon: Store,
      path: '/restaurant',
      color: 'text-chart-2',
    },
    {
      title: 'Delivery Partner Portal',
      description: 'View assigned orders and update delivery status',
      icon: Truck,
      path: '/delivery',
      color: 'text-chart-3',
    },
  ];

  return (
    <div className="container py-12 md:py-20">
      {/* Hero Section */}
      <div className="mx-auto max-w-4xl text-center space-y-6 mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          Online Food Ordering System
        </h1>
        <p className="text-xl md:text-2xl text-primary font-semibold">
          Order your favorite food anytime, anywhere
        </p>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A comprehensive platform that seamlessly connects customers, restaurants, and delivery partners. 
          Experience the complete food ordering workflow from browsing menus to doorstep delivery.
        </p>
      </div>

      {/* Portal Cards */}
      <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {portals.map((portal) => {
          const Icon = portal.icon;
          return (
            <Card
              key={portal.path}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className={`h-10 w-10 ${portal.color}`} />
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold text-foreground">{portal.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {portal.description}
                  </p>
                </div>
                <Button
                  onClick={() => navigate({ to: portal.path })}
                  className="w-full"
                  size="lg"
                >
                  Enter Portal
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
