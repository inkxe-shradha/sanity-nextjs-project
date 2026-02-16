import {
  useCartActions,
  useCartItem,
} from '@/sanity/lib/store/providers/cart-provider';
import React from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Minus, Plus, ShoppingBag } from 'lucide-react';

interface AddToCartButtonProps {
  productId: string;
  name: string;
  price: number;
  image?: string;
  className?: string;
  stock: number;
}

const AddToCartButton = ({
  productId,
  name,
  price,
  image,
  className,
  stock,
}: AddToCartButtonProps) => {
  const { addItem, updateQuantity } = useCartActions();
  const cartItem = useCartItem(productId);
  const quantityInCart = cartItem?.quantity ?? 0;
  const isOutOfStock = stock <= 0;
  const isAtMax = quantityInCart >= stock;

  const handleAdd = () => {
    if (quantityInCart < stock) {
      addItem({ productId, name, price, image }, 1);
      if (quantityInCart === 0) {
        toast.success(`${name} added to cart`);
      } else {
        toast.success(`${name} quantity updated in cart`);
      }
    }
  };

  const handleDecrement = () => {
    if (quantityInCart > 0) {
      updateQuantity(productId, quantityInCart - 1);
      toast.success(`${name} quantity updated in cart`);
    }
  };

  // TODO: out of the stock UI
  if (isOutOfStock)
    return (
      <Button
        disabled
        variant={'secondary'}
        className={cn('h-11 w-full', className)}
      >
        Out of Stock
      </Button>
    );

  // * No in cart yet show add to button basket
  if (quantityInCart === 0) {
    return (
      <Button onClick={handleAdd} className={cn('h-11 w-full', className)}>
        <ShoppingBag className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    );
  }

  // * In cart - show quantity controls
  return (
    <div
      className={cn(
        'flex h-11 w-full items-center rounded-md border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900',
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-full flex-1 rounded-r-none"
        onClick={handleDecrement}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="flex-1 text-center text-sm font-semibold tabular-nums">
        {quantityInCart}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-full flex-1 rounded-l-none"
        onClick={handleAdd}
        disabled={isAtMax}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AddToCartButton;
