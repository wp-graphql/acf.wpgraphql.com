import clsx from 'clsx'

import Link from 'next/link'

const styles = {
  primary:
    'btn-primary',
  secondary:
    'btn-secondary',
}

export function Button({ variant = 'primary', className, href, ...props }) {
  className = clsx(styles[variant], className)

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}
