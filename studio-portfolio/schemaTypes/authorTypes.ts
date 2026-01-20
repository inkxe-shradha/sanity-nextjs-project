import { defineType } from "sanity";

export default defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule) => rule.required(),
        },
        {
            name: 'bio',
            title: 'Biography',
            type: 'text',
            validation: (rule) => rule.required(),
        },
        {
            name: 'profileImage',
            title: 'Profile Image',
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
                },
            ],
        }
    ]
})