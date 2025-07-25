import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CVKonnekt - Professional CV Builder',
    short_name: 'CVKonnekt',
    description: 'Create professional CVs and cover letters designed for the South African job market',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    orientation: 'portrait',
    scope: '/',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    categories: ['business', 'productivity', 'utilities'],
    lang: 'en',
    dir: 'ltr'
  }
}
