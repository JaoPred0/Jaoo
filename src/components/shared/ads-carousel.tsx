import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Boxes, Sparkles } from '@/components/ui/icons'

// Substitua estes dois exemplos pelas campanhas oficiais.
const ads = [
  {
    title: 'Seu próximo destaque começa aqui.',
    description: 'Um espaço para novas ideias.',
    label: 'Jaoo · Novidades',
    icon: Sparkles,
    color: 'violet',
  },
  {
    title: 'Mais possibilidades. Em um só lugar.',
    description: 'Conheça o universo Jaoo.',
    label: 'Jaoo · Explore',
    icon: Boxes,
    color: 'blue',
  },
]

export function AdsCarousel() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  function goTo(index: number) {
    const element = track.current
    if (!element) return
    element.scrollTo({
      left: element.clientWidth * index,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      aria-label="Anúncios"
      aria-roledescription="carrossel"
      className="mx-auto w-full max-w-6xl px-4 pt-2 sm:px-6 sm:pt-4"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] shadow-xl shadow-black/20">
        <div
          ref={track}
          className="ads-track flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
          tabIndex={0}
          aria-label="Deslize para ver os anúncios ou use as setas do teclado"
          onScroll={(event) => {
            const element = event.currentTarget
            setActive(Math.round(element.scrollLeft / element.clientWidth))
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault()
              goTo(
                event.key === 'ArrowRight'
                  ? Math.min(1, active + 1)
                  : Math.max(0, active - 1),
              )
            }
          }}
        >
          {ads.map(
            ({ title, description, label, icon: Icon, color }, index) => (
              <article
                key={title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} de 2`}
                className={`ad-slide ad-slide-${color} relative isolate flex min-h-52 w-full shrink-0 snap-center flex-col justify-center overflow-hidden px-6 pt-6 pb-14 sm:min-h-64 sm:px-10 lg:min-h-72`}
              >
                <div
                  aria-hidden="true"
                  className="absolute top-4 -right-6 -z-10 grid size-44 rotate-12 place-items-center rounded-[3rem] border border-white/10 bg-white/[0.035] text-white/10 sm:top-8 sm:right-12 sm:size-52"
                >
                  <Icon size={96} />
                </div>
                <span className="mb-3 text-[10px] font-medium tracking-[0.18em] text-white/60 uppercase">
                  {label}
                </span>
                <h1 className="max-w-[17ch] text-2xl leading-tight font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {title}
                </h1>
                <p className="mt-3 max-w-[28ch] text-sm text-white/60 sm:max-w-none">
                  {description}
                </p>
              </article>
            ),
          )}
        </div>
        <div
          className="absolute inset-x-0 bottom-1 flex justify-center"
          aria-label="Selecionar anúncio"
        >
          {ads.map((ad, index) => (
            <button
              key={ad.title}
              type="button"
              aria-label={`Mostrar anúncio ${index + 1}`}
              aria-pressed={active === index}
              onClick={() => goTo(index)}
              className="grid size-11 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-violet-300"
            >
              <span
                className={`h-1.5 rounded-full transition-all ${active === index ? 'w-5 bg-white' : 'w-1.5 bg-white/30'}`}
              />
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
