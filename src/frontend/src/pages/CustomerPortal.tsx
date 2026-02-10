import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, User, Store as StoreIcon, CheckCircle2, Clock, Truck, Package } from 'lucide-react';
import { toast } from 'sonner';
import { DishImageModal } from '@/components/DishImageModal';

const sampleRestaurants = [
  { id: 1, name: 'Spice Garden', cuisine: 'Indian', rating: 4.5 },
  { id: 2, name: 'Pizza Palace', cuisine: 'Italian', rating: 4.7 },
  { id: 3, name: 'Burger Hub', cuisine: 'American', rating: 4.3 },
];

const sampleMenuItems = [
  { id: 1, name: 'Pizza', price: 199, category: 'Italian', image: '/assets/generated/dish-pizza.dim_512x512.png' },
  { id: 2, name: 'Burger', price: 129, category: 'American', image: '/assets/generated/dish-burger.dim_512x512.png' },
  { id: 3, name: 'Biryani', price: 249, category: 'Indian', image: '/assets/generated/dish-biryani.dim_512x512.png' },
  { id: 4, name: 'Pasta', price: 179, category: 'Italian', image: '/assets/generated/dish-pasta.dim_512x512.png' },
  { id: 5, name: 'Sandwich', price: 99, category: 'American', image: '/assets/generated/dish-sandwich.dim_512x512.png' },
  { id: 6, name: 'Noodles', price: 149, category: 'Chinese', image: '/assets/generated/dish-noodles.dim_512x512.png' },
];

const orderStatuses = [
  { status: 'Received', icon: CheckCircle2, color: 'text-chart-1' },
  { status: 'Preparing', icon: Clock, color: 'text-chart-2' },
  { status: 'Out for Delivery', icon: Truck, color: 'text-chart-3' },
  { status: 'Delivered', icon: Package, color: 'text-chart-4' },
];

export function CustomerPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof sampleMenuItems[0] | null>(null);
  const [currentOrderStatus, setCurrentOrderStatus] = useState(0);
  const [modalImage, setModalImage] = useState<{ src: string; name: string } | null>(null);

  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    quantity: '1',
    address: '',
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast.success('Logged in successfully!');
  };

  const handleOrderNow = (item: typeof sampleMenuItems[0]) => {
    setSelectedItem(item);
    toast.info(`${item.name} added to order form`);
  };

  const handleImageClick = (item: typeof sampleMenuItems[0]) => {
    setModalImage({ src: item.image, name: item.name });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) {
      toast.error('Please select a food item first');
      return;
    }
    toast.success('Order placed successfully!');
    setCurrentOrderStatus(0);
    setTimeout(() => setCurrentOrderStatus(1), 2000);
    setTimeout(() => setCurrentOrderStatus(2), 4000);
    setTimeout(() => setCurrentOrderStatus(3), 6000);
  };

  if (!isLoggedIn) {
    return (
      <div className="container py-12 max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-4">
                <User className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Customer Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the customer portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="customer@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
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
        <h1 className="text-3xl font-bold mb-2">Customer Portal</h1>
        <p className="text-muted-foreground">Browse restaurants, order food, and track delivery</p>
      </div>

      <Tabs defaultValue="restaurants" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="order">Place Order</TabsTrigger>
          <TabsTrigger value="track">Track Order</TabsTrigger>
        </TabsList>

        <TabsContent value="restaurants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Restaurants</CardTitle>
              <CardDescription>Choose from our partner restaurants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sampleRestaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <StoreIcon className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{restaurant.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">⭐ {restaurant.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="menu" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Food Menu</CardTitle>
              <CardDescription>Browse our delicious offerings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sampleMenuItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4 space-y-3">
                      <div
                        className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleImageClick(item)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">₹{item.price}</span>
                        <Button onClick={() => handleOrderNow(item)} size="sm">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Order Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="order" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Place Your Order</CardTitle>
              <CardDescription>Fill in the details to complete your order</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitOrder} className="space-y-4 max-w-lg">
                {selectedItem && (
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <p className="text-sm font-medium">Selected Item:</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{selectedItem.name}</span>
                      <span className="text-primary font-bold">₹{selectedItem.price}</span>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={orderForm.quantity}
                    onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                    placeholder="123 Main Street, City, PIN"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Place Order
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="track" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Track Your Order</CardTitle>
              <CardDescription>Real-time order status updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-2xl mx-auto space-y-8 py-4">
                {orderStatuses.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index <= currentOrderStatus;
                  const isCurrent = index === currentOrderStatus;

                  return (
                    <div key={step.status} className="relative">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                            isActive
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-muted bg-background text-muted-foreground'
                          } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-semibold ${
                              isActive ? 'text-foreground' : 'text-muted-foreground'
                            }`}
                          >
                            {step.status}
                          </p>
                          {isCurrent && (
                            <p className="text-sm text-primary font-medium">In Progress...</p>
                          )}
                        </div>
                      </div>
                      {index < orderStatuses.length - 1 && (
                        <div
                          className={`absolute left-6 top-12 h-8 w-0.5 ${
                            isActive ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <DishImageModal
        isOpen={!!modalImage}
        onClose={() => setModalImage(null)}
        imageSrc={modalImage?.src || ''}
        dishName={modalImage?.name || ''}
      />
    </div>
  );
}
