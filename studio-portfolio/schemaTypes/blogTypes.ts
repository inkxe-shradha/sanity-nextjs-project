import { defineField, defineType } from "sanity";

export default defineType({
    name: 'blog',
    title: 'Blog',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }, {
                type: 'image',
                name: 'alt',
                title: 'Alt Text',
                options: {
                    isHighlighted: true
                },
                description: 'Alternative text for screen readers'
            }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            validation: (rule) => rule.required(),
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
                timeStep: 15,
                displayTimeZone: 'UTC',
            },
            initialValue: () => {
                const now = new Date()
                const year = now.getFullYear()
                const month = now.getMonth()
                const day = now.getDate()
                return new Date(year, month, day).toISOString()
            }
        }),
        defineField({
            name: 'blogImage',
            title: 'Blog Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
            fields: [
                {
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string',
                    options: {
                        isHighlighted: true
                    },
                    validation: (rule) => rule.required(),
                },
                {
                    name: 'caption',
                    title: 'Caption',
                    type: 'string',
                    options: {
                        isHighlighted: true
                    },
                },
                {
                    name: 'attribution',
                    title: 'Attribution',
                    type: 'string',
                    options: {
                        isHighlighted: true
                    },
                }
            ]
        }),

        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            description: 'Meta description for SEO',
            placeholder: 'Write a brief description for SEO purposes',
            type: 'string',
            validation: (rule) => rule.max(160).warning('Meta description should be under 160 characters.'),
        }),
        defineField({
            name: 'author',
            type: 'object',
            fields: [
                {
                    title: 'Author Name',
                    name: 'authorName',
                    type: 'reference',
                    to: [{ type: 'author' }],
                    validation: (rule) => rule.required(),
                }
            ]
        })
    ]
})