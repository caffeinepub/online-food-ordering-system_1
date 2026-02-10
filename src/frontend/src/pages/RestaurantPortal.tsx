import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Store, CheckCircle, XCircle, UtensilsCrossed } from 'lucide-react';
import { toast } from 'sonner';

const sampleOrders = [
  { id: 'ORD001', item: 'Pizza', quantity: 2, customer: 'John Doe', status: 'new' },
  { id: 'ORD002', item: 'Burger', quantity: 1, customer: 'Jane Smith', status: 'new' },
  { id: 'ORD003', item: 'Biryani', quantity: 3, customer: 'Mike Johnson', status: 'accepted' },
  { id: 'ORD004', item: 'Pasta', quantity: 1, customer: 'Sarah Williams', status: 'accepted' },
];

const menuItems = [
  { id: 1, name: 'Pizza', price: 199, category: 'Italian' },
  { id: 2, name: 'Burger', price: 129, category: 'American' },
  { id: 3, name: 'Biryani', price: 249, category: 'Indian' },
  { id: 4, name: 'Pasta', price: 179, category: 'Italian' },
];

export function RestaurantPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState(sampleOrders);

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast.success('Restaurant logged in successfully!');
  };

  const handleAcceptOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'accepted' } : order
    ));
    toast.success(`Order ${orderId} accepted!`);
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
    toast.error(`Order ${orderId} rejected`);
  };

  const newOrders = orders.filter(order => order.status === 'new');
  const acceptedOrders = orders.filter(order => order.status === 'accepted');

  if (!isLoggedIn) {
    return (
      <div className="container py-12 max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-4">
                <Store className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Restaurant Login</CardTitle>
            <CardDescription className="text-center">
              Access your restaurant dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurant-email">Restaurant Email</Label>
              <Input id="restaurant-email" type="email" placeholder="restaurant@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restaurant-password">Password</Label>
              <Input id="restaurant-password" type="password" placeholder="••••••••" />
            </div>
            <Button onClick={handleLogin} className="w-full" size="lg">
              Login
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              UI Only - No real authentication
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Restaurant Portal</h1>
        <p className="text-muted-foreground">Manage orders and update your menu</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="menu">Menu Management</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Orders</CardTitle>
                <Badge variant="destructive" className="text-lg px-3">
                  {newOrders.length}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{newOrders.length} pending</p>
                <p className="text-xs text-muted-foreground">Awaiting your response</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accepted Orders</CardTitle>
                <Badge variant="secondary" className="text-lg px-3">
                  {acceptedOrders.length}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{acceptedOrders.length} active</p>
                <p className="text-xs text-muted-foreground">Currently being prepared</p>
              </CardContent>
            </Card>
          </div>

          {/* New Orders */}
          <Card>
            <CardHeader>
              <CardTitle>New Orders</CardTitle>
              <CardDescription>Review and accept incoming orders</CardDescription>
            </CardHeader>
            <CardContent>
              {newOrders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No new orders</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {newOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.item}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleAcceptOrder(order.id)}
                              className="bg-chart-1 hover:bg-chart-1/90"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectOrder(order.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Accepted Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Accepted Orders</CardTitle>
              <CardDescription>Orders currently being prepared</CardDescription>
            </CardHeader>
            <CardContent>
              {acceptedOrders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No accepted orders</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {acceptedOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.item}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Preparing</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="menu" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Menu Management</CardTitle>
              <CardDescription>View and manage your food items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {menuItems.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <UtensilsCrossed className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                      </div>
                      <Badge variant="outline">{item.category}</Badge>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">₹{item.price}</span>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
