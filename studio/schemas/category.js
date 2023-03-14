import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'tag',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
    })
  ],
})
