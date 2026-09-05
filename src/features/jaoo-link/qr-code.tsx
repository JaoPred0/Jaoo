import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Skeleton } from '@/components/ui/skeleton'

export function LinkQrCode({
  value,
  size = 220,
}: {
  value: string
  size?: number
}) {
  const [source, setSource] = useState('')
  useEffect(() => {
    let active = true
    void QRCode.toDataURL(value, {
      width: size,
      margin: 2,
      color: { dark: '#18181b', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    }).then((url) => {
      if (active) setSource(url)
    })
    return () => {
      active = false
    }
  }, [size, value])
  return source ? (
    <img
      src={source}
      width={size}
      height={size}
      alt="QR Code do seu Jaoo Link"
      className="mx-auto rounded-2xl"
    />
  ) : (
    <Skeleton className="mx-auto aspect-square w-full max-w-56 rounded-2xl" />
  )
}
