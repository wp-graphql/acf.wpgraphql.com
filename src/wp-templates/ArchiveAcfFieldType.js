import {HeroPattern} from "@/components/HeroPattern";
import {gql} from "@apollo/client";
import {Heading} from "@/components/Heading";
import {motion, useMotionTemplate, useMotionValue} from "framer-motion";
import Link from "next/link";
import {GridPattern} from "@/components/GridPattern";
import {ChatBubbleIcon} from "@/components/icons/ChatBubbleIcon";
import Image from "next/image";

function FieldTypeIcon({ icon: Icon }) {
    return (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-900/5 ring-1 ring-blue-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-blue-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-amber-300/10 dark:group-hover:ring-amber-400">
            <Icon className="h-5 w-5 fill-blue-700/10 stroke-blue-700 transition-colors duration-300 group-hover:stroke-blue-900 dark:fill-white/10 dark:stroke-blue-400 dark:group-hover:fill-amber-300/10 dark:group-hover:stroke-amber-400" />
        </div>
    )
}

function FieldTypePattern({ mouseX, mouseY, ...gridProps }) {
    let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
    let style = { maskImage, WebkitMaskImage: maskImage }

    return (
        <div className="pointer-events-none">
            <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
                <GridPattern
                    width={72}
                    height={56}
                    x="50%"
                    className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
                    {...gridProps}
                />
            </div>
            <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
                style={style}
            />
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
                style={style}
            >
                <GridPattern
                    width={72}
                    height={56}
                    x="50%"
                    className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
                    {...gridProps}
                />
            </motion.div>
        </div>
    )
}

function FieldType({ fieldType }) {
    let mouseX = useMotionValue(0)
    let mouseY = useMotionValue(0)

    fieldType = { ...fieldType, ...{
        description: "test",
        pattern: {
            y: -6,
                squares: [
                [-1, 2],
                [1, 3],
            ],
        },
        icon: ChatBubbleIcon,
        name: fieldType.title,
        href: fieldType.uri
    }};

    function onMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            key={fieldType.uri}
            onMouseMove={onMouseMove}
            className="group relative flex rounded-2xl bg-blue-50 transition-shadow hover:shadow-md hover:shadow-blue-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
        >
            <FieldTypePattern {...fieldType.pattern} mouseX={mouseX} mouseY={mouseY} />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-blue-900/7.5 group-hover:ring-blue-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
            <div className="relative rounded-2xl px-4 pt-16 pb-4">
                { fieldType?.featuredImage && <Image
                    src={fieldType?.featuredImage?.node?.sourceUrl}
                    alt={fieldType?.featuredImage?.node?.altText}
                    width={253}
                    height={120}
                /> }
                <h3 className="mt-4 text-sm font-semibold leading-7 text-blue-900 dark:text-white">
                    <Link href={fieldType.href}>
                        <span className="absolute inset-0 rounded-2xl" />
                        {fieldType.name}
                    </Link>
                </h3>
                <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                    {fieldType?.aCFFieldTypeGroups?.nodes[0]?.name}
                </p>
            </div>
        </div>
    )
}

const ArchiveAcfFieldType = ({ data }) => {

    return (
        <>
            <HeroPattern />
            <div className="my-16 xl:max-w-none">
                <Heading level={2} id="fieldTypes">
                    Field Types
                </Heading>
                <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-blue-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
                    {data.fieldTypes.nodes.map((fieldType) => (
                        <FieldType key={fieldType.uri} fieldType={fieldType} />
                    ))}
                </div>
            </div>

        </>
    )

}

ArchiveAcfFieldType.query = gql`
{
  fieldTypes(first:50) {
    nodes {
      id
      title
      uri
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
}
`;

export default ArchiveAcfFieldType;
