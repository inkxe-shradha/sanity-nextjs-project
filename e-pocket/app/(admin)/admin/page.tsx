'use client';

import AIInsightsCard from '@/components/admin/AIInsightsCard';
import LowStockAlert from '@/components/admin/LowStockAlert';
import { RecentOrders } from '@/components/admin/RecentOrders';
import StatCard from '@/components/admin/StatCard';
import { Button } from '@/components/ui/button';
import {
  createDocument,
  createDocumentHandle,
  useApplyDocumentActions,
} from '@sanity/sdk-react';
import { Loader2, Package, ShoppingCart, Plus, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const AdminDashBoard = () => {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const apply = useApplyDocumentActions();

  /**
   * Handles the creation of a new product document and navigates to its edit page.
   * This function generates a new document handle with a unique ID, applies the create action to the Sanity store, and then redirects the user to the edit page for the newly created product.
   */
  const handleCreateProduct = () => {
    startTransition(async () => {
      const newDocHandle = createDocumentHandle({
        documentId: crypto.randomUUID(),
        documentType: 'product',
      });
      await apply(createDocument(newDocHandle));
      router.push(`/admin/inventory/${newDocHandle.documentId}`);
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
            Overview of your store
          </p>
        </div>
        <Button
          onClick={handleCreateProduct}
          disabled={isPending}
          className="w-full sm:w-auto"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          New Product
        </Button>
      </div>

      {/* AI Insights */}
      <AIInsightsCard />
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Products"
          icon={Package}
          documentType="product"
          href="/admin/inventory"
        />
        <StatCard
          title="Total Orders"
          icon={ShoppingCart}
          documentType="order"
          href="/admin/orders"
        />
        <StatCard
          title="Low Stock Items"
          icon={TrendingUp}
          documentType="product"
          filter="stock <= 5"
          href="/admin/inventory"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <LowStockAlert />
        <RecentOrders />
      </div>
    </div>
  );
};

export default AdminDashBoard;
