import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'
import {muxInput} from 'sanity-plugin-mux-input'

export default defineConfig({
  name: 'default',
  title: 'Jaehee\'s Portfolio',

  projectId: 'el661cg1',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), media(), muxInput()],

  schema: {
    types: schemaTypes,
  },
})
