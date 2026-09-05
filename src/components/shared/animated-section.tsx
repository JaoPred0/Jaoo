import { motion, type HTMLMotionProps } from 'motion/react'

export function AnimatedSection(props: HTMLMotionProps<'section'>) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      {...props}
    />
  )
}
