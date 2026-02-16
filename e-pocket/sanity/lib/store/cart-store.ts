import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
//  * Types
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

//  * Cart Store State
export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

//  * Cart Store Actions
export interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
}

// * Cart Store declaration
export type CartStore = CartState & CartActions;

// * Initial State
export const initialCartState: CartState = {
  items: [],
  isOpen: false,
};

/**
 * * Create the Cart Store factory = Creates ne store instance pre provides
 * USes persist middleware with the skipHydration for the Next.js SSR Compatibility
 */
export const createCartStore = (initialState: CartState = initialCartState) =>
  createStore<CartStore>()(
    persist(
      (set) => ({
        ...initialState,
        addItem: (item, quantity = 1) => {
          set((state) => {
            const existingItemIndex = state.items.findIndex(
              (i) => i.productId === item.productId,
            );
            if (existingItemIndex > -1) {
              return {
                items: state.items.map((i) =>
                  i.productId === item.productId
                    ? { ...i, quantity: i.quantity + quantity }
                    : i,
                ),
              };
            }
            return {
              items: [...state.items, { ...item, quantity }],
            };
          });
        },
        removeItem: (productId: string) => {
          set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
          }));
        },
        updateQuantity: (productId: string, quantity: number) => {
          set((state) => {
            if (quantity <= 0) {
              return {
                items: state.items.filter((i) => i.productId !== productId),
              };
            }
            return {
              items: state.items.map((i) =>
                i.productId === productId ? { ...i, quantity } : i,
              ),
            };
          });
        },
        toggleCart: () => {
          set((state) => ({ isOpen: !state.isOpen }));
        },
        openCart: () => {
          set(() => ({ isOpen: true }));
        },
        closeCart: () => {
          set(() => ({ isOpen: false }));
        },
        clearCart: () => {
          set(() => ({ items: [] }));
        },
      }),
      {
        name: 'cart-storage',
        // Skip hydration for Next.js SSR Compatibility
        skipHydration: true,
        // only the persist items, not in the UI state like isOpen
        partialize: (state) => ({ items: state.items }),
      },
    ),
  );
