import { UserContent } from '@src/types'

export default ({
  contents,
  nickname,
  isDog,
}: {
  contents: UserContent[]
  nickname: string
  isDog: boolean
}) => {
  return contents.concat([
    {
      question: `${nickname}さん！本日はお忙しい中取材のお時間ありがとうございました！ぜひ、また取材させてくださいね！`,
      answer: isDog
        ? 'キャンキャン！'
        : `いえ！こちらこそ楽しかったです！ありがとうございました！`,
    },
  ])
}
