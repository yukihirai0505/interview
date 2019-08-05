import * as React from 'react'
import Layout from '../../components/Layout'
import { useFirebaseUser } from '@src/hooks/useFirebaseUser'

export default () => {
  const user = useFirebaseUser()
  return (
    <Layout user={user}>
      <section className="section">
        <div className="container">
          <div className="content">
            <h1>フィクション一覧</h1>
          </div>
        </div>
      </section>
    </Layout>
  )
}
