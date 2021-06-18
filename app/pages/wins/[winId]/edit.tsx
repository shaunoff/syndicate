import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getWin from "app/wins/queries/getWin"
import updateWin from "app/wins/mutations/updateWin"
import { WinForm, FORM_ERROR } from "app/wins/components/WinForm"

export const EditWin = () => {
  const router = useRouter()
  const winId = useParam("winId", "number")
  const [win, { setQueryData }] = useQuery(getWin, { id: winId })
  const [updateWinMutation] = useMutation(updateWin)

  return (
    <>
      <Head>
        <title>Edit Win {win.id}</title>
      </Head>

      <div>
        <h1>Edit Win {win.id}</h1>
        <pre>{JSON.stringify(win)}</pre>

        {/* <WinForm
          submitText="Update Win"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateWin}
          initialValues={win}
          onSubmit={async (values) => {
            try {
              const updated = await updateWinMutation({
                id: win.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowWinPage({ winId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        /> */}
      </div>
    </>
  )
}

const EditWinPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditWin />
      </Suspense>

      <p>
        <Link href={Routes.WinsPage()}>
          <a>Wins</a>
        </Link>
      </p>
    </div>
  )
}

EditWinPage.authenticate = true
EditWinPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditWinPage
