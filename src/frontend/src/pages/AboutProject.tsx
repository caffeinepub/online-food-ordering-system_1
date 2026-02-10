import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Users, Workflow } from 'lucide-react';

export function AboutProject() {
  return (
    <div className="container py-12 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">About This Project</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive frontend demonstration of an online food ordering system
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Project Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This is a <strong className="text-foreground">frontend implementation</strong> of an Online Food Ordering System, 
              developed as a college mini project. The application demonstrates a complete workflow for food ordering 
              platforms, showcasing the interaction between three key stakeholders: customers, restaurants, and delivery partners.
            </p>
            <p>
              The project was built using modern web technologies and focuses on creating an intuitive, 
              responsive user interface that works seamlessly across all devices.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>User Roles</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-chart-1 pl-4">
                <h3 className="font-semibold text-lg mb-2">Customer Portal</h3>
                <p className="text-muted-foreground">
                  Browse restaurants, view menus, place orders, and track delivery status in real-time.
                </p>
              </div>
              <div className="border-l-4 border-chart-2 pl-4">
                <h3 className="font-semibold text-lg mb-2">Restaurant Portal</h3>
                <p className="text-muted-foreground">
                  Manage incoming orders, accept or reject requests, and maintain menu items with pricing.
                </p>
              </div>
              <div className="border-l-4 border-chart-3 pl-4">
                <h3 className="font-semibold text-lg mb-2">Delivery Partner Portal</h3>
                <p className="text-muted-foreground">
                  View assigned deliveries, update pickup status, and mark orders as delivered.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Workflow className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Implementation Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This project is a <strong className="text-foreground">UI-only demonstration</strong>. All login/authentication 
              screens are for display purposes and do not perform real authentication. The backend and database operations 
              are explained conceptually.
            </p>
            <p>
              In a production environment, this frontend would connect to a backend service (such as Firebase, Node.js, 
              or similar) to handle user authentication, order processing, real-time updates, and data persistence.
            </p>
            <p>
              The sample data (restaurants, menu items, orders) used throughout the application demonstrates how the 
              system would function with real data integration.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-center text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> This is an academic project created for educational 
              purposes to demonstrate frontend development skills and UI/UX design principles.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
