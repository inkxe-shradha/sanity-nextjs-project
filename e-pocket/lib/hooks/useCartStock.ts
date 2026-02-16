'use client';

import { client } from '@/sanity/client';
import { CartItem } from '@/sanity/lib/store/cart-store';
import { PRODUCTS_BY_IDS_QUERY } from '@/sanity/queries/product.query';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface StockInfo {
  productId: string;
  currentStock: number;
  isOutOfStock: boolean;
  exceedsStock: boolean;
  availableQuantity: number;
}

/**
 * Represents a mapping between a product identifier (as a string) and its corresponding stock information.
 *
 * The key is typically a unique product ID, and the value is a `StockInfo` object containing details about the stock.
 */
export type StockMap = Map<string, StockInfo>;

interface UseCartStockReturn {
  stockMap: StockMap;
  isLoading: boolean;
  hasStockIssues: boolean;
  refetchStock: () => void;
}

// * Fetches the current stock levels for the cart items and return the stock info map and loading state
export function useCartStock(items: CartItem[]): UseCartStockReturn {
  const [stockMap, setStockMap] = useState<StockMap>(new Map());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Memoized the Product IDs to use as the stable dependency
  const productIds = useMemo(
    () => items.map((item) => item.productId),
    [items],
  );

  /**
   * Fetches the stock information for the current cart items from the backend.
   * Updates the stockMap state with the latest stock data.
   */
  const fetchStock = useCallback(async () => {
    if (items.length === 0) {
      setStockMap(new Map());
      return;
    }
    setIsLoading(true);
    try {
      const products = await client.fetch(PRODUCTS_BY_IDS_QUERY, {
        ids: productIds,
      });
      const newStockMap = new Map<string, StockInfo>();
      for (const item of items) {
        const product = products.find(
          (p: { _id: string }) => p._id === item.productId,
        );
        const currentStock = product?.stock ?? 0;
        newStockMap.set(item.productId, {
          productId: item.productId,
          currentStock,
          isOutOfStock: currentStock === 0,
          exceedsStock: item.quantity > currentStock,
          availableQuantity: Math.min(item.quantity, currentStock),
        });
      }
      setStockMap(newStockMap);
    } catch (error) {
      console.error('Failed to fetch stock:', error);
    } finally {
      setIsLoading(false);
    }
  }, [items, productIds]);

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);

  const hasStockIssues = Array.from(stockMap.values()).some(
    (info) => info.isOutOfStock || info.exceedsStock,
  );

  return {
    stockMap,
    isLoading,
    hasStockIssues,
    refetchStock: fetchStock,
  };
}
