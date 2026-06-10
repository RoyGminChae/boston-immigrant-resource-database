import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'xmozszot',
  dataset: 'production',
  apiVersion: '2024-06-09',
  useCdn: false,
})

export default async function TestPage() {
  const testimonials = await client.fetch(`*[_type == "testimonial"]`)
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Sanity Testimonial Test</h1>
      {testimonials.length === 0 ? (
        <p>No testimonials found — make sure you published one in the studio.</p>
      ) : (
        testimonials.map((t: any) => (
          <div key={t._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <pre>{JSON.stringify(t, null, 2)}</pre>
          </div>
        ))
      )}
    </div>
  )
}