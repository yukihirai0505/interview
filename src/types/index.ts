import { FluidObject, FixedObject } from 'gatsby-image'

export interface User {
  readonly uid: string
  readonly name: string
  readonly twitterInfo: any
}

export interface UserContent {
  question?: string
  answer?: string
  imagePath?: CoverImageOriginal
  imageDescription?: string
}

export interface SiteMetadata {
  readonly siteUrl: string
  readonly title: string
  readonly description: string
}

export interface CoverImageOriginal {
  childImageSharp?: {
    fluid?: FluidObject
    fixed?: FixedObject
  }
  src?: string
}

export interface Post {
  node: {
    id: string
    fields: {
      slug: string
    }
    frontmatter: {
      captchaImage: CoverImageOriginal
      description: string
      title: string
      subTitle?: string
      date: Date
    }
  }
}

export interface Interview {
  readonly id: string
  readonly nickname: string
  readonly profileImageUrl: string
  readonly contents: UserContent[]
  readonly createdAt?: number
  readonly updatedAt?: number
}

export const SHOW_ACTIVE = 'SHOW_ACTIVE' as const
export const SHOW_ALL = 'SHOW_ALL' as const
export const SHOW_MINE = 'SHOW_MINE' as const
export const SHOW_COMPLETED = 'SHOW_COMPLETED' as const
export type VisibilityFilter =
  | typeof SHOW_ACTIVE
  | typeof SHOW_ALL
  | typeof SHOW_MINE
  | typeof SHOW_COMPLETED
