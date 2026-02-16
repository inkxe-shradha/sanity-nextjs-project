import { getCheckoutSession } from '@/lib/action/checkout.action';
import { redirect } from 'next/navigation';
import SuccessClient from './SuccessClient';

export const metadata = {
  title: 'Order Success - E-Pocket',
  description: 'Your order was successful!',
};

interface SuccessPageProps {
  searchParams: Promise<{ session_id: string }>;
}

const SuccessPage = async ({ searchParams }: SuccessPageProps) => {
  const { session_id } = await searchParams;
  const sessionId = session_id;
  if (!sessionId) redirect('/');

  const result = await getCheckoutSession(sessionId);

  if (!result.success || !result.session) {
    redirect('/');
  }

  return <SuccessClient session={result.session} />;
};

export default SuccessPage;
