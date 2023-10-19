import { Container } from '@/components/Container'
import { FooterNavigation } from '@/components/FooterNavigation'

export function SiteFooter({ navigation }) {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; 2023 WPGraphQL. All rights reserved. | Development sponsored by <a href="https://www.wpengine.com/atlas" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">WP Engine</a>
          </p>
          <div className="text-muted-foreground flex flex-row gap-4">
            <FooterNavigation navigation={navigation} />
          </div>
        </div>
      </Container>
    </footer>
  )
}
