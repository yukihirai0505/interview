import React from 'react'
import { InterviewTemplate } from '@src/components/templates/index'

export const AojiruTemplate = (nickname: string): InterviewTemplate => {
  const ojiNickname = `${nickname}汁王子`
  const title = `${ojiNickname}に突撃インタビュー`

  return {
    nickname: ojiNickname,
    title,
    subTitle: 'SNSで超話題！',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/plz-pr-me.appspot.com/o/template-image-0.png?alt=media&token=f6f69405-4fc7-4e69-b83b-81ec5a7927b6',
    intro:
      <p>
        本日はいま
        <b className="text-yellow-line">SNSで人気を集めている</b>
        このお方！<b>{ojiNickname}</b>
        さんをお呼びしてインタビューしていきたいと思います。
        ということでさっそくこの方に登場願いましょう。
      </p>,
    contents:
      [
        {
          answer: `たのもぉぉぉぉおおぉー！たのもぉぉぉぉおおぉー！`,
        },
        {
          question: `よ、よろしくお願いいたします(なんだこのノリは...)`,
        }
        ,
        {
          question: `早速ですが、質問に入らせて頂きますね！いま${ojiNickname}さんはSNSでとても注目を集めていますが、フォロワーのみなさんのことはどう思っていらっしゃいますか？`,
          answer:
            `もえろぉお！もえろおおおおぉぉぉおおーーー！`,
        }
        ,
        {
          question: `ん、ん？！(聞き間違いかな？)熱いお方ですね！いま一番したいことはなんでしょうか？`,
          answer:
            `えちする？`,
        }
        ,
        {
          question: `な、なるほどですね！(えちってなんだろう)フォロワーのみなさんに期待してることなどはありますか？`,
          answer:
            `シャンパンいれちゃう？`,
        }
        ,
        {
          question: `い、いれちゃう〜〜？(な、なに言ってるんだ私は...)`,
          answer:
            `もっともっとえち汁飲ましてよ`,
        }
        ,
        {
          question: `(こりゃダメだ！おわらせよう！)`,
        }
        ,
      ],
  }
}