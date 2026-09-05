import { StrictMode, Suspense } from 'react'
import { MotionConfig } from 'motion/react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from '@/lib/query-client'
import { router } from '@/routes/router'
import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Suspense
          fallback={
            <div className="grid min-h-dvh place-items-center text-sm text-neutral-500">
              Carregando…
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </MotionConfig>
    </QueryClientProvider>
  </StrictMode>,
)
