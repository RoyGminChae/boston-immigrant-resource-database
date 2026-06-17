import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'xmozszot',
  dataset: 'production',
  apiVersion: '2024-06-09',
  useCdn: false, // ← change this
})

const builder = createImageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)