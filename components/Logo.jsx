import Image from 'next/image'

function LogomarkPaths() {
  return (
    <g fill="none" stroke="#002447" strokeLinejoin="round" strokeWidth={3}>
      <path d="M10.308 5L18 17.5 10.308 30 2.615 17.5 10.308 5z" />
      <path d="M18 17.5L10.308 5h15.144l7.933 12.5M18 17.5h15.385L25.452 30H10.308L18 17.5z" />
    </g>
  )
}

export function Logomark(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" fill="none" {...props}>
      <LogomarkPaths />
    </svg>
  )
}

export function Logo(props) {
  return (
    <Image
      width={props?.width ?? 91}
      height={props?.height ?? 35}
      src="/logo-wpgraphql-acf.png"
      alt="WPGraphQL Logo"
      {...props}
    />
  )
}
