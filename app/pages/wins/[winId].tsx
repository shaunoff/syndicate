import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getWin from "app/wins/queries/getWin"
import deleteWin from "app/wins/mutations/deleteWin"

export const Win = () => {
  const router = useRouter()
  const winId = useParam("winId", "number")
  const [deleteWinMutation] = useMutation(deleteWin)
  const [win] = useQuery(getWin, { id: winId })

  return (
    <>
      <Head>
        <title>Win {win.id}</title>
      </Head>

      <div>
        <h1>Win {win.id}</h1>
        <pre>{JSON.stringify(win, null, 2)}</pre>

        <Link href={Routes.EditWinPage({ winId: win.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteWinMutation({ id: win.id })
              router.push(Routes.WinsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowWinPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.WinsPage()}>
          <a>Wins</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Win />
      </Suspense>
    </div>
  )
}

ShowWinPage.authenticate = true
ShowWinPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowWinPage
