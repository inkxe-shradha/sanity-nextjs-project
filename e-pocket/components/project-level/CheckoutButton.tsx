import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useCartItems } from '@/sanity/lib/store/providers/cart-provider';
import { createCheckoutSession } from '@/lib/action/checkout.action';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { CreditCard, Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  disabled?: boolean;
}

const CheckoutButton = ({ disabled }: CheckoutButtonProps) => {
  const router = useRouter();
  const items = useCartItems();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = () => {
    setError(null);

    startTransition(async () => {
      const result = await createCheckoutSession(items);

      if (result.success && result.url) {
        // Redirect to Stripe Checkout
        router.push(result.url);
      } else {
        setError(result.error ?? 'Checkout failed');
        toast.error('Checkout Error', {
          description: result.error ?? 'Something went wrong',
        });
      }
    });
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleCheckout}
        disabled={disabled || isPending || items.length === 0}
        size="lg"
        className="w-full"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Pay with Stripe
          </>
        )}
      </Button>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default CheckoutButton;
