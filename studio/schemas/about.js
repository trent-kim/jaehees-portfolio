import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'blockContent',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
          {
            name: 'link',
            title: 'Link',
            type: 'document',
            fields: [
              defineField({
                name: 'type',
                title: 'Type',
                type: 'string',
              }),
              defineField({
                name: 'slug',
                title: 'Slug',
                type: 'slug',
                options: {
                  source: 'type',
                  maxLength: 96,
                },
              }),
              defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: Rule => Rule.uri({
                      scheme: ['http', 'https', 'mailto']
                    })
              }),
              ],
          }
      ],
  }),
  ],
  preview: {
    select: {
      title: 'title'
    },
  },
})
