import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createWin from "app/wins/mutations/createWin"
import { WinForm, FORM_ERROR } from "app/wins/components/WinForm"

const NewWinPage: BlitzPage = () => {
  const router = useRouter()
  const [createWinMutation] = useMutation(createWin)

  return (
    <div>
      <h1>Create New Win</h1>

      <WinForm
        submitText="Create Win"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateWin}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const win = await createWinMutation(values)
            router.push(`/wins/${win.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.WinsPage()}>
          <a>Wins</a>
        </Link>
      </p>
    </div>
  )
}

NewWinPage.authenticate = true
NewWinPage.getLayout = (page) => <Layout title={"Create New Win"}>{page}</Layout>

export default NewWinPage
