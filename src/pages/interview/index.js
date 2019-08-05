import * as React from 'react'
import { useState } from 'react'
import Layout from '../../components/Layout'
import { useFirebaseUser } from '@src/hooks/useFirebaseUser'
import { useFirestoreInterviews } from '@src/hooks/useFirestoreInterviews'
import { SHOW_MINE } from '@src/types'

const InterviewList = ({ uid }) => {
  console.log(uid)
  const [filter] = useState(SHOW_MINE)
  const interviews = uid ? useFirestoreInterviews(uid, filter) : []
  console.info(interviews)
  return interviews ? (
    interviews.map((e, i) => <span key={i}>{e.title}</span>)
  ) : (
    <span>hoge</span>
  )
}

export default () => {
  const user = useFirebaseUser()
  return user ? (
    <Layout user={user}>
      <section className="section">
        <div className="container">
          <div className="content">
            <h1>取材ネタ一覧</h1>
            <InterviewList uid={user.uid} />
          </div>
        </div>
      </section>
    </Layout>
  ) : (
    <p>ローディング中</p>
  )
}
