import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'demoReel',
  title: 'Demo Reel',
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
      name: 'video',
      title: 'Video',
      type: 'mux.video',
      options: {
        hotspot: true,
      },
    }),
  ],
})
