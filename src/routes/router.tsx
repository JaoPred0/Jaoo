import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/site-layout'
import { HomePage } from '@/features/home/home-page'

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '*', element: null },
    ],
  },
])
