import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Layout, Server } from 'lucide-react';

export function Technologies() {
  const technologies = [
    {
      category: 'Frontend',
      icon: Layout,
      color: 'text-chart-1',
      items: [
        { name: 'React', description: 'UI library for building interactive interfaces' },
        { name: 'TypeScript', description: 'Type-safe JavaScript for better code quality' },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework for styling' },
        { name: 'Shadcn/ui', description: 'Beautiful, accessible component library' },
        { name: 'TanStack Router', description: 'Type-safe routing for React applications' },
      ],
    },
    {
      category: 'Backend (Conceptual)',
      icon: Server,
      color: 'text-chart-2',
      items: [
        { name: 'Firebase', description: 'Cloud-based backend service (conceptual)' },
        { name: 'Authentication', description: 'User login and session management' },
        { name: 'Real-time Updates', description: 'Live order status synchronization' },
        { name: 'API Endpoints', description: 'RESTful services for data operations' },
      ],
    },
    {
      category: 'Database (Conceptual)',
      icon: Database,
      color: 'text-chart-3',
      items: [
        { name: 'Firestore', description: 'NoSQL cloud database (conceptual)' },
        { name: 'Collections', description: 'Users, Orders, Restaurants, Menu Items' },
        { name: 'Real-time Sync', description: 'Automatic data synchronization' },
        { name: 'Security Rules', description: 'Access control and data validation' },
      ],
    },
    {
      category: 'Development Tools',
      icon: Code,
      color: 'text-chart-4',
      items: [
        { name: 'Vite', description: 'Fast build tool and development server' },
        { name: 'ESLint', description: 'Code quality and consistency checking' },
        { name: 'Git', description: 'Version control system' },
        { name: 'Responsive Design', description: 'Mobile-first approach for all devices' },
      ],
    },
  ];

  return (
    <div className="container py-12 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Technologies Used</h1>
        <p className="text-lg text-muted-foreground">
          Modern web technologies powering this food ordering system
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {technologies.map((tech) => {
          const Icon = tech.icon;
          return (
            <Card key={tech.category} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Icon className={`h-6 w-6 ${tech.color}`} />
                  </div>
                  <CardTitle>{tech.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tech.items.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{item.name}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground pl-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8 bg-muted/30">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-center">Technology Stack Summary</h3>
            <div className="grid gap-4 sm:grid-cols-3 text-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Frontend</p>
                <p className="font-semibold">React + TypeScript</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Backend</p>
                <p className="font-semibold">Conceptual (Firebase)</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Database</p>
                <p className="font-semibold">Conceptual (Firestore)</p>
              </div>
            </div>
            <p className="text-xs text-center text-muted-foreground pt-2">
              This project demonstrates frontend capabilities with conceptual backend architecture
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
