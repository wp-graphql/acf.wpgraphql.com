import { getAdminUrl } from "@faustwp/core"
import Link from 'next/link'

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"

const EditPost = ({ post, children }) => {
    return(
        <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
            <ContextMenuItem><Link href={`${getAdminUrl()}/post.php?post=${post?.databaseId}&action=edit`} target="_blank">{`Edit Post (id: ${post?.databaseId})`}</Link></ContextMenuItem>
        </ContextMenuContent>
        </ContextMenu>
    )
}

export default EditPost;