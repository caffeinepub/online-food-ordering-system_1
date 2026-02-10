import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Truck, Package, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const sampleDeliveries = [
  {
    id: 'ORD001',
    restaurant: 'Spice Garden',
    address: '123 Main St, City',
    status: 'assigned',
  },
  {
    id: 'ORD002',
    restaurant: 'Pizza Palace',
    address: '456 Oak Ave, Town',
    status: 'assigned',
  },
  {
    id: 'ORD003',
    restaurant: 'Burger Hub',
    address: '789 Pine Rd, Village',
    status: 'picked-up',
  },
];

export function DeliveryPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deliveries, setDeliveries] = useState(sampleDeliveries);

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast.success('Delivery partner logged in successfully!');
  };

  const handlePickedUp = (orderId: string) => {
    setDeliveries(deliveries.map(delivery =>
      delivery.id === orderId ? { ...delivery, status: 'picked-up' } : delivery
    ));
    toast.success(`Order ${orderId} picked up!`);
  };

  const handleDelivered = (orderId: string) => {
    setDeliveries(deliveries.map(delivery =>
      delivery.id === orderId ? { ...delivery, status: 'delivered' } : delivery
    ));
    toast.success(`Order ${orderId} delivered successfully!`);
  };

  const assignedOrders = deliveries.filter(d => d.status === 'assigned');
  const pickedUpOrders = deliveries.filter(d => d.status === 'picked-up');
  const deliveredOrders = deliveries.filter(d => d.status === 'delivered');

  if (!isLoggedIn) {
    return (
      <div className="container py-12 max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-4">
                <Truck className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Delivery Partner Login</CardTitle>
            <CardDescription className="text-center">
              Access your delivery dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="delivery-email">Email</Label>
              <Input id="delivery-email" type="email" placeholder="delivery@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery-password">Password</Label>
              <Input id="delivery-password" type="password" placeholder="••••••••" />
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
        <h1 className="text-3xl font-bold mb-2">Delivery Partner Portal</h1>
        <p className="text-muted-foreground">Manage your deliveries and update status</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned</CardTitle>
            <Badge variant="destructive" className="text-lg px-3">
              {assignedOrders.length}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{assignedOrders.length}</p>
            <p className="text-xs text-muted-foreground">Ready for pickup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Badge variant="secondary" className="text-lg px-3">
              {pickedUpOrders.length}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pickedUpOrders.length}</p>
            <p className="text-xs text-muted-foreground">Out for delivery</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Badge className="text-lg px-3 bg-chart-1">
              {deliveredOrders.length}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{deliveredOrders.length}</p>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Orders */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Assigned Orders</CardTitle>
          <CardDescription>Orders ready for pickup</CardDescription>
        </CardHeader>
        <CardContent>
          {assignedOrders.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No assigned orders</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Pickup Restaurant</TableHead>
                    <TableHead>Delivery Address</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignedOrders.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-medium">{delivery.id}</TableCell>
                      <TableCell>{delivery.restaurant}</TableCell>
                      <TableCell>{delivery.address}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => handlePickedUp(delivery.id)}
                          className="bg-chart-2 hover:bg-chart-2/90"
                        >
                          <Package className="h-4 w-4 mr-1" />
                          Picked Up
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

      {/* In Transit Orders */}
      <Card>
        <CardHeader>
          <CardTitle>In Transit</CardTitle>
          <CardDescription>Orders out for delivery</CardDescription>
        </CardHeader>
        <CardContent>
          {pickedUpOrders.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No orders in transit</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Pickup Restaurant</TableHead>
                    <TableHead>Delivery Address</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pickedUpOrders.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-medium">{delivery.id}</TableCell>
                      <TableCell>{delivery.restaurant}</TableCell>
                      <TableCell>{delivery.address}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => handleDelivered(delivery.id)}
                          className="bg-chart-1 hover:bg-chart-1/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Delivered
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
    </div>
  );
}
