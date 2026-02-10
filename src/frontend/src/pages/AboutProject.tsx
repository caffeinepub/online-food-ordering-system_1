import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Database, Globe, Users } from 'lucide-react';

export function AboutProject() {
  const features = [
    {
      icon: Users,
      title: 'Customer Portal',
      description: 'Browse restaurants, order food, and track delivery in real-time',
    },
    {
      icon: Globe,
      title: 'Restaurant Portal',
      description: 'Manage menu items, accept orders, and update order status',
    },
    {
      icon: Database,
      title: 'Delivery Portal',
      description: 'View assigned orders and update delivery status',
    },
    {
      icon: Code,
      title: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, and Tailwind CSS',
    },
  ];

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About This Project</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            This is a frontend prototype of an Online Food Ordering System developed using a no-code website builder. Backend and database operations are explained conceptually.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>A comprehensive food ordering system demonstration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This college mini project demonstrates a complete food ordering workflow with three main portals:
              Customer, Restaurant, and Delivery Partner. The system showcases modern web development practices
              and user interface design.
            </p>
            <p className="text-muted-foreground">
              The application is built as a frontend prototype to demonstrate the user experience and interface
              design. While the backend and database operations are conceptual, the project illustrates how
              such a system would function in a real-world scenario.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Step-by-step ordering process with clear navigation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Real-time order tracking with status updates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Responsive design that works on all devices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Clean and intuitive user interface</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Separate portals for different user roles</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              This is a frontend prototype for educational purposes. No real transactions or data storage occur.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
