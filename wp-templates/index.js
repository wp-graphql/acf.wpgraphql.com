import { Archive } from './archive'
import { ArchiveFieldType } from './archive-field_type'
import { FrontPage } from './front-page'
import { IndexTemplate } from './IndexTemplate'
import { SingleFieldType } from './single-field_type'

const templates = {
  index: IndexTemplate,
  'single-field_type': SingleFieldType,
  'archive-field_type': ArchiveFieldType,
  'front-page': FrontPage,
  'archive': Archive,
}

export default templates
