import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const projectId = 'xmozszot'
export const dataset = 'production'
const apiVersion = '2024-06-09'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // ← change this
})

// Server-only client used for mutations (creating posts, comments, votes).
// Requires a write token in SANITY_WRITE_TOKEN (never exposed to the browser).
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export const hasWriteToken = Boolean(process.env.SANITY_WRITE_TOKEN)

const builder = createImageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)