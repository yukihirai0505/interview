import React from 'react'
import { InterviewTemplate } from '@src/components/templates/index'

export const IchiroTemplate = (nickname: string): InterviewTemplate => {
  const title = `${nickname}に引退会見！`
  return {
    nickname,
    title,
    subTitle: 'スーパースター！',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/plz-pr-me.appspot.com/o/template-image-2.png?alt=media&token=a0d069ff-02ce-42be-8ef4-1cb00ee519fb',
    intro: <p>
      本日をもって
      <b className="text-yellow-line">引退することになった</b>
      このお方！<b>{nickname}</b>
      さんをお呼びしてインタビューしていきたいと思います。
      ということでさっそくこの方に登場願いましょう。
    </p>,
    contents: [
      {
        answer: `こんなにいるの!?(笑) びっくりするわ`,
      },
      {
        question: `さすが、${nickname}さんの引退会見ということでびっくりするくらいの人が集まってきてますねw`,
      },
      {
        question: `早速ですが、今回引退しようと思ったきっかけはなんだったのでしょうか？`,
        answer: `契約上の予定ですね。まだまだできることはあったと思いますが、最近はなかなか結果を出せなかったということです。`,
      },
      {
        question: `何か心残りはありますか？`,
        answer: `もっと愛する人におにぎりを握ってもらえばよかったです。3000個は握らせてあげたかった。`,
      },
      {
        question: `(お、、、おにぎり？)`,
        answer: `何かおかしなこと言ってます？`,
      },
      {
        question: `い、いえ！(汗)な、なるほどですね！おにぎり美味しいですものね！`,
        answer: `いや、そういうんじゃなくてね。まぁいいやこれは裏で話そう。`,
      },
      {
        question: `デビュー当時もこの会場で会見して、いまも同じ会場です。なにか思うことはありますか？`,
        answer: `長い質問に対して失礼ですが、ないですねｗ`,
      },
      {
        question: `あ、アシャッス！(早口)`,
      },
      {
        question: `最後に、なにかファンにメッセージなどございますか？`,
        answer: `お腹減ってきた～もぉ～！`,
      },
      {
        question: `(え、いま？たしかに夜遅くだけどいまそれいう？)`,
        answer: `何かおかしなこと言ってます？`,
      },
      {
        question: `い、いえ！(滝汗)こちらこそお時間ありがとうございました！${nickname}さんの引退後、別の道でのご活躍も楽しみにしております！`,
      },
    ],
  }
}