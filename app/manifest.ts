import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Locksmith: Ripple Run',
    short_name: 'Locksmith',
    description: 'Master the art of unlocking in Locksmith: Ripple Run. A challenging puzzle game where each key creates ripple effects.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
