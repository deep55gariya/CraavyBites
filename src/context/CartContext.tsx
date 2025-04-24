import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Types
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  tags?: string[];
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  name: string;
}

export interface Address {
  id: number;
  name: string;
  address: string;
  isDefault: boolean;
}

export interface OrderDetails {
  buyerPhone: string;
  buyerName?: string;
  orderItems: CartItem[];
  address: Address;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  serviceFee: number;
  grandTotal: number;
  paymentMethod: string;
  orderForSomeoneElse: boolean;
  recipientName?: string;
  recipientPhone?: string;
  orderId: string;
  orderDate: string;
  couponCode?: string;
}

// Helper functions for local storage
const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const saveToLocalStorage = <T,>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing localStorage key "${key}":`, error);
  }
};

// Context type
interface CartContextType {
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  addresses: Address[];
  selectedAddressId: number | null;
  orderForSomeoneElse: boolean;
  recipientName: string;
  recipientPhone: string;
  buyerPhone: string;
  previousOrders: OrderDetails[];
  updateQuantity: (id: number, amount: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
  selectAddress: (id: number) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  setOrderForSomeoneElse: (value: boolean) => void;
  setRecipientName: (name: string) => void;
  setRecipientPhone: (phone: string) => void;
  setBuyerPhone: (phone: string) => void;
  saveOrder: (details: Omit<OrderDetails, 'orderId' | 'orderDate'>) => OrderDetails;
  calculateTotals: () => {
    subtotal: number;
    discount: number;
    deliveryFee: number;
    serviceFee: number;
    grandTotal: number;
  };
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Context hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => 
    loadFromLocalStorage('cart', [])
  );
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => 
    loadFromLocalStorage('appliedCoupon', null)
  );
  const [addresses, setAddresses] = useState<Address[]>(() => 
    loadFromLocalStorage('addresses', [
      { id: 1, name: "Home", address: "123 Gourmet Avenue, Culinary District", isDefault: true },
      { id: 2, name: "Office", address: "456 Flavor Street, Gastronomy Tower, Floor 12", isDefault: false },
    ])
  );
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(() => {
    const savedId = loadFromLocalStorage<number | null>('selectedAddressId', null);
    const loadedAddresses = loadFromLocalStorage<Address[]>('addresses', []);
    
    if (savedId && loadedAddresses.some(addr => addr.id === savedId)) {
      return savedId;
    }
    
    const defaultAddress = loadedAddresses.find(addr => addr.isDefault);
    return defaultAddress ? defaultAddress.id : (loadedAddresses.length > 0 ? loadedAddresses[0].id : null);
  });
  
  const [orderForSomeoneElse, setOrderForSomeoneElseState] = useState(false);
  const [recipientName, setRecipientNameState] = useState('');
  const [recipientPhone, setRecipientPhoneState] = useState('');
  const [buyerPhone, setBuyerPhoneState] = useState('');
  const [previousOrders, setPreviousOrders] = useState<OrderDetails[]>(() => 
    loadFromLocalStorage('previousOrders', [])
  );

  // Persist state to localStorage
  useEffect(() => {
    saveToLocalStorage('cart', cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (appliedCoupon) {
      saveToLocalStorage('appliedCoupon', appliedCoupon);
    } else {
      localStorage.removeItem('appliedCoupon');
    }
  }, [appliedCoupon]);

  useEffect(() => {
    saveToLocalStorage('addresses', addresses);
  }, [addresses]);

  useEffect(() => {
    if (selectedAddressId !== null) {
      saveToLocalStorage('selectedAddressId', selectedAddressId);
    } else {
      localStorage.removeItem('selectedAddressId');
    }
  }, [selectedAddressId]);

  useEffect(() => {
    saveToLocalStorage('previousOrders', previousOrders);
  }, [previousOrders]);

  // Cart item methods
  const updateQuantity = useCallback((id: number, amount: number) => {
    setCartItems(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + amount) }
          : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartItems(prevCart => prevCart.filter(item => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedCoupon(null);
  }, []);

  // Coupon methods
  const applyCoupon = useCallback((code: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!code.trim()) {
        resolve(false);
        return;
      }
      
      // Simulate API call
      setTimeout(() => {
        const coupons: Record<string, Omit<Coupon, 'code'>> = {
          "WELCOME20": { type: "percentage", value: 20, name: "New User Discount" },
          "CHEF10": { type: "percentage", value: 10, name: "Chef's Special" },
          "FLAT15": { type: "fixed", value: 15, name: "Flat Discount" }
        };

        const enteredCode = code.toUpperCase().trim();
        const coupon = coupons[enteredCode];

        if (coupon) {
          setAppliedCoupon({ ...coupon, code: enteredCode });
          resolve(true);
        } else {
          setAppliedCoupon(null);
          resolve(false);
        }
      }, 800);
    });
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  // Address methods
  const selectAddress = useCallback((id: number) => {
    setSelectedAddressId(id);
  }, []);

  const addAddress = useCallback((address: Omit<Address, 'id'>) => {
    setAddresses(prevAddresses => {
      const newId = prevAddresses.length > 0 
        ? Math.max(...prevAddresses.map(a => a.id)) + 1 
        : 1;
      
      let updatedAddresses = [...prevAddresses];
      
      if (address.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => ({
          ...addr,
          isDefault: false
        }));
      }
      
      const createdAddress = {
        id: newId,
        ...address
      };
      
      if (updatedAddresses.length === 0 || address.isDefault || selectedAddressId === null) {
        setSelectedAddressId(newId);
      }
      
      return [...updatedAddresses, createdAddress];
    });
  }, [selectedAddressId]);

  // Order details methods
  const setOrderForSomeoneElse = useCallback((value: boolean) => {
    setOrderForSomeoneElseState(value);
    if (!value) {
      setRecipientNameState('');
      setRecipientPhoneState('');
    }
  }, []);

  const setRecipientName = useCallback((name: string) => {
    setRecipientNameState(name);
  }, []);

  const setRecipientPhone = useCallback((phone: string) => {
    setRecipientPhoneState(phone);
  }, []);

  const setBuyerPhone = useCallback((phone: string) => {
    setBuyerPhoneState(phone);
  }, []);

  // Calculate totals
  const calculateTotals = useCallback(() => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
    const discount = appliedCoupon
      ? Math.min(
          appliedCoupon.type === "percentage"
            ? (subtotal * appliedCoupon.value) / 100
            : appliedCoupon.value,
          subtotal
        )
      : 0;
    
    const deliveryFee = subtotal > 100 || subtotal === 0 ? 0 : 5.99;
    const serviceFee = subtotal > 0 ? 2.99 : 0;
    
    const grandTotal = Math.max(0, subtotal - discount + deliveryFee + serviceFee);
    
    return {
      subtotal,
      discount,
      deliveryFee,
      serviceFee,
      grandTotal
    };
  }, [cartItems, appliedCoupon]);

  // Save order
  const saveOrder = useCallback((details: Omit<OrderDetails, 'orderId' | 'orderDate'>): OrderDetails => {
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const orderDate = new Date().toISOString();
    
    const orderDetails: OrderDetails = {
      ...details,
      orderId,
      orderDate
    };
    
    setPreviousOrders(prev => [orderDetails, ...prev]);
    
    return orderDetails;
  }, []);

  const value: CartContextType = {
    cartItems,
    appliedCoupon,
    addresses,
    selectedAddressId,
    orderForSomeoneElse,
    recipientName,
    recipientPhone,
    buyerPhone,
    previousOrders,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    selectAddress,
    addAddress,
    setOrderForSomeoneElse,
    setRecipientName,
    setRecipientPhone,
    setBuyerPhone,
    saveOrder,
    calculateTotals
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};