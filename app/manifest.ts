import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Thread Application',
    short_name: 'Thread App',
    description: 'Thread магазин одежды и аксесуаров',
    start_url: '/',
    background_color: '#fff',
    theme_color: '#fff',
    display: 'standalone',
    icons: [
      {
        src: '/favicon.ico',
        sizes:
          '64x64 32x32 24x24 16x16 196x196 512x512 144x144 192x192 128x128 120x120 180x180',
        type: 'image/ico',
        purpose: 'maskable',
      },
    ],
  }
}
