import { useState } from 'react';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface DeliveryDetails {
  name: string;
  phone: string;
  address: string;
}

type Step = 1 | 2 | 3 | 4;

export function useCustomerOrderFlow() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [cart, setCart] = useState<Map<number, CartItem>>(new Map());
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    name: '',
    phone: '',
    address: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Menu items - exactly 3 as required
  const menuItems: MenuItem[] = [
    { id: 1, name: 'Pizza', price: 199 },
    { id: 2, name: 'Burger', price: 129 },
    { id: 3, name: 'Biryani', price: 249 },
  ];

  // Add item to cart
  const addToCart = (item: MenuItem) => {
    const existingItem = cart.get(item.id);
    const newCart = new Map(cart);
    
    if (existingItem) {
      newCart.set(item.id, {
        item,
        quantity: existingItem.quantity + 1,
      });
    } else {
      newCart.set(item.id, { item, quantity: 1 });
    }
    
    setCart(newCart);
  };

  // Get cart items as array
  const getCartItems = (): CartItem[] => {
    return Array.from(cart.values());
  };

  // Calculate total price
  const getTotalPrice = (): number => {
    return getCartItems().reduce((total, cartItem) => {
      return total + cartItem.item.price * cartItem.quantity;
    }, 0);
  };

  // Check if cart has items
  const hasCartItems = (): boolean => {
    return cart.size > 0;
  };

  // Navigation helpers
  const goToCart = () => {
    if (hasCartItems()) {
      setCurrentStep(2);
    }
  };

  const continueShopping = () => {
    setCurrentStep(1);
  };

  const proceedToDetails = () => {
    setCurrentStep(3);
  };

  const placeOrder = (details: DeliveryDetails) => {
    setDeliveryDetails(details);
    setOrderPlaced(true);
    setCurrentStep(4);
  };

  // Guard: Step 4 should only be reachable after placing order
  const canAccessStep4 = (): boolean => {
    return orderPlaced;
  };

  return {
    currentStep,
    menuItems,
    cart: getCartItems(),
    totalPrice: getTotalPrice(),
    hasCartItems: hasCartItems(),
    deliveryDetails,
    orderPlaced,
    canAccessStep4,
    addToCart,
    goToCart,
    continueShopping,
    proceedToDetails,
    placeOrder,
  };
}
