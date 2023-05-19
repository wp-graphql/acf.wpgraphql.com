import { Layout, LayoutFragment } from "@/components/Layout";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { gql } from "@apollo/client";
 
export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

const aCFFieldTypeCategoriesFragment = gql`
fragment aCFFieldTypeCategoriesFragment on FieldType {
    aCFFieldTypeCategories {
        nodes {
            id
            name
        }
    }
}
`;

const SingleAcfFieldType = ({ data }) => {

    const { node } = data;
    
    console.log( { 
        node
    })

    if ( ! node ) {
        return null;
    }

    const { title } = node;

    return (
        <Layout data={data} >
            <h1>{title}</h1>
            { node?.aCFFieldTypeCategories && node?.aCFFieldTypeCategories?.nodes && <div id="field-type-categories" className="my-2">
                { node.aCFFieldTypeCategories.nodes.map( fieldTypeCategory => <Badge key={fieldTypeCategory.id} variant="secondary">{fieldTypeCategory.name}</Badge> ) }
            </div>
            }
            <div id="last-updated" className="text-sm text-gray-500">Last Upated: xx-xx-xxxx </div>
            
            <Separator className="my-4" /> 
            <div className="prose dark:prose-invert">
                <h2>Description</h2>
                <h2>Field Settings</h2>
                <h2>Query in GraphQL</h2>
                {/* <pre>{JSON.stringify(node, null, 2)}</pre>
                <h2>Field Description</h2>
                <h2>Field Settings</h2>
                <TabsDemo />
                <h2>Query in GraphQL</h2> */}
            </div>

        </Layout>
    );

}

SingleAcfFieldType.query = gql`
query SingleAcfFieldType($uri: String!) {
    ...LayoutFragment
    node: nodeByUri(uri: $uri) {
        __typename
        ...on FieldType {
            title
        }
        ...aCFFieldTypeCategoriesFragment
    }
}
${LayoutFragment}
${aCFFieldTypeCategoriesFragment}
`;

SingleAcfFieldType.variables = ( { uri } ) => ( { uri } );

export default SingleAcfFieldType
