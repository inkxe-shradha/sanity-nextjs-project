import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const customerTypes = defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  icon: UserIcon,
  groups: [
    {
      name: 'details',
      title: 'Customer Details',
      default: true,
    },
    {
      name: 'stripe',
      title: 'Stripe Information',
    },
  ],
  fields: [
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
      group: 'details',
      validation: (Rule) => Rule.required().email(),
      description: "The customer's email address.",
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Full Name',
      description: "The customer's full name.",
      group: 'details',
    }),
    defineField({
      name: 'clerkUserId',
      type: 'string',
      title: 'Clerk User ID',
      description: 'The Clerk user ID associated with this customer.',
      group: 'details',
    }),
    defineField({
      name: 'stripeCustomerId',
      type: 'string',
      title: 'Stripe Customer ID',
      readOnly: true,
      description: 'The Stripe customer ID associated with this customer.',
      group: 'stripe',
      validation: (Rule) => Rule.required().error('Stripe Customer ID is required.'),
    }),
    defineField({
      name: 'createdAT',
      type: 'datetime',
      title: 'Created At',
      readOnly: true,
      description: 'The date and time when the customer was created.',
      group: 'details',
      initialValue: new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      email: 'email',
      name: 'name',
      stripeCustomerId: 'stripeCustomerId',
    },
    prepare(selection) {
      const {email, name, stripeCustomerId} = selection
      return {
        title: name ?? email ?? 'Unnamed Customer',
        subtitle: stripeCustomerId ? `${email ?? ''} | ${stripeCustomerId}` : (email ?? ''),
      }
    },
  },
  orderings: [
    {
      title: 'Newest first',
      name: 'createdAtDesc',
      by: [{field: 'createdAT', direction: 'desc'}],
    },
    {
      title: 'Email A-Z',
      name: 'emailAsc',
      by: [{field: 'email', direction: 'asc'}],
    },
  ],
})
