import { SingleFieldType } from './single-field_type'
import IndexTemplate from './IndexTemplate'
import ArchiveFieldType from './archive-field_type'
import { FrontPage } from './front-page'

const templates = {
  index: IndexTemplate,
  'single-field_type': SingleFieldType,
  'archive-field_type': ArchiveFieldType,
  'front-page': FrontPage,
}

export default templates
