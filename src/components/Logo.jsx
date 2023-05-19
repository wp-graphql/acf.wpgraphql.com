import Image from "next/image";

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
