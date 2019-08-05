import { CoverImageOriginal } from '@src/types'

export interface CommentItem {
  comment: string
  nickname?: string
  icon?: CoverImageOriginal
  isNormal?: boolean
  editable?: boolean
}
