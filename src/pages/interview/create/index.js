import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../../components/Layout'
import { useFirebaseUser } from '@src/hooks/useFirebaseUser'
import { addInterview } from '@src/actions/InterviewAction'

const INTERVIEW_ITEMS = [
  { label: '取材タイトル', id: 'interview-title' },
  { label: '質問①', id: 'questions[0]' },
  { label: '質問②', id: 'questions[1]' },
  { label: '質問③', id: 'questions[2]' },
  { label: '質問④', id: 'questions[3]' },
]

const handleSubmit = async (uid, e) => {
  e.preventDefault()
  const form = e.target
  const values = INTERVIEW_ITEMS.map(({ id }) => form.elements[id].value)
  console.info(values)
  // TODO: crate interview by using firestore
  await addInterview(uid, values[0], values.slice(1))
  navigate(form.getAttribute('action'))
}

export default () => {
  const user = useFirebaseUser()
  return user ? (
    <Layout user={user}>
      <section className="section">
        <div className="container">
          <div className="content">
            <h1>取材ネタ作成</h1>
            <form
              name="contact"
              method="post"
              action="/interview"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={e => handleSubmit(user.uid, e)}
            >
              {INTERVIEW_ITEMS.map(obj => {
                return (
                  <div className="field">
                    <label className="label" htmlFor={obj.id}>
                      {obj.label}
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'text'}
                        name={obj.id}
                        id={obj.id}
                        required={true}
                      />
                    </div>
                  </div>
                )
              })}
              <div className="field">
                <button className="button is-link" type="submit">
                  送信
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  ) : (
    <>ローディング中</>
  )
}
