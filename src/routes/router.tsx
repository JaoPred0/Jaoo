import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/site-layout'

// As páginas permanecem vazias enquanto o conteúdo é reconstruído.
export const router = createBrowserRouter([
  { element: <SiteLayout />, children: [{ path: '*', element: null }] },
])
