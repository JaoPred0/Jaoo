import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/site-layout'
import { AdsCarousel } from '@/components/shared/ads-carousel'

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <AdsCarousel /> },
      { path: '*', element: null },
    ],
  },
])
