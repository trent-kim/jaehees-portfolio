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
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [
          {
            name: 'work',
            title: 'Work',
            type: 'document',
            fields: [
              defineField({
                name: 'name',
                title: 'Name',
                type: 'string',
              }),
              defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
              }),
              ],
          }
      ],
    }),
    defineField({
      name: 'recognition',
      title: 'Recognition',
      type: 'array',
      of: [
          {
            name: 'recognizedBy',
            title: 'Recognized By',
            type: 'document',
            fields: [
              defineField({
                name: 'name',
                title: 'Name',
                type: 'string',
              }),
              defineField({
                name: 'film',
                title: 'Film',
                type: 'string',
              }),
              defineField({
                name: 'year',
                title: 'Year',
                type: 'string',
              }),
              ],
          }
      ],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
          {
            name: 'school',
            title: 'School',
            type: 'document',
            fields: [
              defineField({
                name: 'name',
                title: 'Name',
                type: 'string',
              }),
              defineField({
                name: 'url',
                title: 'URL',
                type: 'url',
              }),
              defineField({
                  name: 'degree',
                  title: 'Degree',
                  type: 'string',
              }),
              defineField({
                name: 'year',
                title: 'Year',
                type: 'string',
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
