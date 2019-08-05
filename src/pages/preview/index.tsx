import React from 'react'
import Layout from '../../components/Layout'
import BlogLayout from '@src/components/blog/BlogLayout'
import { CommonBlogContent } from '@src/components/blog/BlogContent'
import { useFirebaseUser } from '@src/hooks/useFirebaseUser'
import { BlogPostCaptchaImage } from '@src/templates/blog-post'

export default () => {
  const user = useFirebaseUser()
  if (user) {
    const userInfo = user.twitterInfo
    const nickname = `${userInfo.displayName}汁王子`
    const title = `${nickname}に突撃インタビュー`
    const profileUrl = userInfo.photoURL.replace('_normal', '')
    const templateKey = new URL(location.href).searchParams.get('templateKey')
    console.info(templateKey)
    const content = (
      <CommonBlogContent
        intro={
          <p>
            本日はいま
            <b className="text-yellow-line">SNSで人気を集めている</b>
            このお方！<b>{nickname}</b>
            さんをお呼びしてインタビューしていきたいと思います。
            ということでさっそくこの方に登場願いましょう。
          </p>
        }
        nickname={nickname}
        isDog={false}
        icon={{ src: profileUrl }}
        contents={[
          {
            answer: `たのもぉぉぉぉおおぉー！たのもぉぉぉぉおおぉー！`,
          },
          {
            question: `よ、よろしくお願いいたします(なんだこのノリは...)`,
          },
          {
            question: `早速ですが、質問に入らせて頂きますね！いま${nickname}さんはSNSでとても注目を集めていますが、フォロワーのみなさんのことはどう思っていらっしゃいますか？`,
            answer: `もえろぉお！もえろおおおおぉぉぉおおーーー！`,
          },
          {
            question: `ん、ん？！(聞き間違いかな？)熱いお方ですね！いま一番したいことはなんでしょうか？`,
            answer: `えちする？`,
          },
          {
            question: `な、なるほどですね！(えちってなんだろう)フォロワーのみなさんに期待してることなどはありますか？`,
            answer: `シャンパンいれちゃう？`,
          },
          {
            question: `い、いれちゃう〜〜？(な、なに言ってるんだ私は...)`,
            answer: `もっともっとえち汁飲ましてよ`,
          },
          {
            question: `(こりゃダメだ！おわらせよう！)`,
          },
        ]}
        editable={true}
      />
    )
    return (
      <Layout isWebsite={false} user={user}>
        <div className="featured-thumbnail">
          <BlogPostCaptchaImage
            imageInfo={{
              image: {
                src:
                  'https://firebasestorage.googleapis.com/v0/b/plz-pr-me.appspot.com/o/template-image-0.png?alt=media&token=f6f69405-4fc7-4e69-b83b-81ec5a7927b6',
              },
              alt: `featured image thumbnail for post ${title}`,
            }}
          />
        </div>
        <BlogLayout
          title={title}
          subTitle={'SNSで超話題！'}
          nickname={nickname}
          date={new Date().toLocaleDateString()}
          content={content}
        />
      </Layout>
    )
  }
  return <p>ローディング中</p>
}
