import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Package } from 'lucide-react';
import { useCustomerOrderFlow } from '@/hooks/useCustomerOrderFlow';
import { useOrderTracking } from '@/hooks/useOrderTracking';
import { CustomerOrderProgress } from '@/components/CustomerOrderProgress';
import { DishImageModal } from '@/components/DishImageModal';

// Map dish names to image paths
const dishImages: Record<string, string> = {
  Pizza: '/assets/generated/pizza.dim_800x600.png',
  Burger: '/assets/generated/burger.dim_800x600.png',
  Biryani: '/assets/generated/biryani.dim_800x600.png',
};

export function CustomerPortal() {
  const {
    currentStep,
    menuItems,
    cart,
    totalPrice,
    hasCartItems,
    canAccessStep4,
    addToCart,
    goToCart,
    continueShopping,
    proceedToDetails,
    placeOrder,
  } = useCustomerOrderFlow();

  const { currentStatus, startTracking, resetTracking, hasActiveOrder } = useOrderTracking();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const [selectedDishImage, setSelectedDishImage] = useState<{ src: string; name: string } | null>(null);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(formData);
    // Reset any previous tracking and start fresh
    resetTracking();
    startTracking();
  };

  const openImageModal = (dishName: string) => {
    const imageSrc = dishImages[dishName];
    if (imageSrc) {
      setSelectedDishImage({ src: imageSrc, name: dishName });
    }
  };

  const closeImageModal = () => {
    setSelectedDishImage(null);
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Online Food Ordering System</h1>
        <p className="text-muted-foreground">Complete your order in simple steps</p>
      </div>

      <CustomerOrderProgress currentStep={currentStep} />

      {/* STEP 1: RESTAURANT & MENU */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spice Garden Restaurant</CardTitle>
              <CardDescription>Browse our delicious menu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {menuItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0 space-y-4">
                      {/* Dish Image - clickable */}
                      <div
                        className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
                        onClick={() => openImageModal(item.name)}
                      >
                        <img
                          src={dishImages[item.name]}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </div>
                      
                      {/* Dish Details */}
                      <div className="px-6 pb-6 space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-xl">{item.name}</h3>
                          <p className="text-2xl font-bold text-primary">₹{item.price}</p>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item);
                          }}
                          className="w-full"
                          size="lg"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {hasCartItems && (
            <div className="flex justify-center">
              <Button onClick={goToCart} size="lg" className="min-w-[200px]">
                Go to Cart
              </Button>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: CART PAGE */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Cart</CardTitle>
            <CardDescription>Review your selected items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {cart.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">{cartItem.item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {cartItem.quantity}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-primary">
                    ₹{cartItem.item.price * cartItem.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-xl font-bold">
                <span>Total Price:</span>
                <span className="text-primary">₹{totalPrice}</span>
              </div>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <Button onClick={continueShopping} variant="outline" size="lg" className="flex-1">
                Continue Shopping
              </Button>
              <Button onClick={proceedToDetails} size="lg" className="flex-1">
                Proceed to Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 3: DELIVERY DETAILS */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Delivery Details</CardTitle>
            <CardDescription>Enter your delivery information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your complete delivery address"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Place Order
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* STEP 4: ORDER TRACKING */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
            <CardDescription>Track your order status in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            {!canAccessStep4() || !hasActiveOrder ? (
              <div className="py-12 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-muted p-6">
                    <Package className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">No Active Order</h3>
                  <p className="text-muted-foreground">
                    There is no active order to track. Please place an order first.
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8">
                <div className="max-w-md mx-auto">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="flex justify-center">
                        <div className="rounded-full bg-primary/10 p-6">
                          <Package className="h-16 w-16 text-primary" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground font-medium">
                          Current Status
                        </p>
                        <p className="text-3xl font-bold text-primary">{currentStatus}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your order is being processed. Status updates automatically.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dish Image Modal */}
      {selectedDishImage && (
        <DishImageModal
          isOpen={!!selectedDishImage}
          onClose={closeImageModal}
          imageSrc={selectedDishImage.src}
          dishName={selectedDishImage.name}
        />
      )}
    </div>
  );
}
