import React from 'react'
import { AojiruTemplate } from '@src/components/templates/Aojiru'
import { IchiroTemplate } from '@src/components/templates/Ichiro'

export interface InterviewTemplate {
  nickname: string
  title: string
  subTitle: string
  imageUrl: string
  intro: JSX.Element
  contents: Array<object>
}

export const getContentByTemplateKey = (nickname: string, templateKey: number): InterviewTemplate => {
  if (templateKey === 0) {
    return AojiruTemplate(nickname)
  } else if (templateKey === 1) {
    return IchiroTemplate(nickname)
  }

  return { nickname, title: '', subTitle: '', imageUrl: '', intro: <p/>, contents: [] }
}