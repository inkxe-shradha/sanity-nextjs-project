'use client';

import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';
import {
  CartState,
  CartStore,
  createCartStore,
  initialCartState,
} from '../cart-store';
import { useStore } from 'zustand';

// * Store API Type
export type CartStoreApi = ReturnType<typeof createCartStore>;

// * Create teh Context
export const CartStoreContext = createContext<CartStoreApi | null | undefined>(
  null,
);

// * Provider Props
interface CartStoreProviderProps {
  children: ReactNode;
  initialState?: CartState;
}

/**
 * * Cart store Provider  - Creates the one store Instance per Provider
 * * Manually Triggers Rehydration from the localStorage on the client.
 * * Wrap your app lay out the Providers
 */

export const CartStoreProvider = ({
  children,
  initialState: defaultState,
}: CartStoreProviderProps) => {
  const storeRef = useRef<CartStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createCartStore(defaultState ?? initialCartState);
  }

  // * Manually trigger the Rehydration on the client after the Mount
  useEffect(() => {
    storeRef.current?.persist.rehydrate();
  }, []);

  return (
    // eslint-disable-next-line react-hooks/refs
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  );
};

/**
 * ( Hook ) - Custom hook to use the Cart Store
 * * Must be used in the CartStoreProvider
 * Handles SSR by return default state until Hydrated.
 */
export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const cartStoreContext = useContext(CartStoreContext);

  if (!cartStoreContext) {
    throw new Error('useCartStore must be used within a CartStoreProvider');
  }
  return useStore(cartStoreContext, selector);
};

// * Convenience hook to get a cart item by productId * //

// * Get all the cart items
export const useCartItems = () => useCartStore((state) => state.items);

// * Get the cart Open state
export const useIsCartOpen = () => useCartStore((state) => state.isOpen);

// * Get the total number of the items in the cart store
export const useTotalItems = () =>
  useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

// * Get the total price of the cart
export const useTotalPrice = () =>
  useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity * item.price, 0),
  );

// * get teh specific item in a cart by productId
export const useCartItem = (productId: string) =>
  useCartStore((state) =>
    state.items.find((item) => item.productId === productId),
  );

// * Get the cart actions
export const useCartActions = () => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const clearCart = useCartStore((state) => state.clearCart);
  return {
    addItem,
    removeItem,
    updateQuantity,
    toggleCart,
    openCart,
    closeCart,
    clearCart,
  };
};
