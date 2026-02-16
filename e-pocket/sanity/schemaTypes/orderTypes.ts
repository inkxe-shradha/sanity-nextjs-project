import { BasketIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { ORDER_STATUS_SANITY_LIST } from '@/lib/constants/order_status';

const orderTypes = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: BasketIcon,
  groups: [
    {
      name: 'details',
      title: 'Order Details',
      default: true,
    },
    {
      name: 'customer',
      title: 'Customer Information',
    },
    {
      name: 'payment',
      title: 'Payment Information',
    },
  ],
  fields: [
    defineField({
      name: 'orderNumber',
      type: 'string',
      title: 'Order Number',
      readOnly: true,
      group: 'details',
      description: 'Unique identifier for the order.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Order Items',
      group: 'details',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              type: 'reference',
              to: [{ type: 'product' }],
              title: 'Product',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'quantity',
              type: 'number',
              initialValue: 1,
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: 'priceAtPurchase',
              type: 'number',
              description: 'Price at time of purchase',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'product.name',
              quantity: 'quantity',
              price: 'priceAtPurchase',
              media: 'product.images.0',
            },
            prepare(selection) {
              const { title, quantity, price, media } = selection;
              return {
                title: `${title} (x${quantity})`,
                subtitle: `$${(price * quantity).toFixed(2)}`,
                media: media,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'total',
      type: 'number',
      title: 'Total Amount',
      group: 'details',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      type: 'string',
      group: 'details',
      initialValue: 'paid',
      options: {
        list: ORDER_STATUS_SANITY_LIST,
        layout: 'radio',
      },
    }),
    defineField({
      name: 'customer',
      type: 'reference',
      to: [{ type: 'customer' }],
      group: 'customer',
      description: 'Reference to the customer record',
    }),
    defineField({
      name: 'clerkUserId',
      type: 'string',
      group: 'customer',
      readOnly: true,
      description: 'Clerk user ID',
    }),
    defineField({
      name: 'email',
      type: 'string',
      group: 'customer',
      readOnly: true,
    }),
    defineField({
      name: 'address',
      type: 'object',
      title: 'Shipping Address',
      group: 'customer',
      fields: [
        defineField({ name: 'name', type: 'string', title: 'Full Name' }),
        defineField({ name: 'line1', type: 'string', title: 'Address Line 1' }),
        defineField({ name: 'line2', type: 'string', title: 'Address Line 2' }),
        defineField({ name: 'city', type: 'string' }),
        defineField({ name: 'postcode', type: 'string', title: 'Postcode' }),
        defineField({ name: 'country', type: 'string' }),
      ],
    }),
    defineField({
      name: 'stripePaymentId',
      type: 'string',
      group: 'payment',
      readOnly: true,
      description: 'Stripe payment intent ID',
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      group: 'details',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      orderNumber: 'orderNumber',
      email: 'email',
      total: 'total',
      status: 'status',
    },
    prepare(selection) {
      const { orderNumber, email, total, status } = selection;
      return {
        title: `Order #${orderNumber ?? 'N/A'} - ${email ?? 'No Email'}`,
        subtitle: `${email ?? 'No email'} • £${total ?? 0} • ${status ?? 'paid'}`,
      };
    },
  },
  orderings: [
    {
      title: 'Order Number Ascending',
      name: 'orderNumberAsc',
      by: [{ field: 'orderNumber', direction: 'asc' }],
    },
  ],
});

export default orderTypes;
