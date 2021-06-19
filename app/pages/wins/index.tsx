import { Suspense } from "react"
import {
  Head,
  Link,
  usePaginatedQuery,
  useRouter,
  BlitzPage,
  Routes,
  useQuery,
  useMutation,
} from "blitz"
import { User, Win } from "db"
import { Button, Table, Input } from "@shaunoff-ui/components"
import Layout from "app/core/layouts/Layout"
import getWins from "app/wins/queries/getWins"

import createWeekWins from "app/wins/mutations/createWeekWins"
import updateWins from "app/wins/mutations/updateWins"

import { WinForm } from "app/wins/components/WinForm"
import { normalizeGetWins } from "app/wins/utils/normalizeGetWins"

export const WinTable = () => {
  const [userWins, { refetch }] = useQuery(getWins, {})
  const completeWeeks = userWins[0]?.wins.length ?? 0
  const [updateWinsMutation] = useMutation(updateWins)
  const [createWeekWinsMutation] = useMutation(createWeekWins)
  console.log(userWins)
  return (
    <div className="p-4">
      <Button
        onClick={async () => {
          await createWeekWinsMutation(
            userWins.map((user) => ({ userId: user.id, week: completeWeeks + 1 }))
          )
          refetch()
        }}
        className="my-2"
      >
        Increase Week
      </Button>
      <WinForm
        userWins={userWins}
        onSubmit={(values: {
          users: (User & {
            wins: Win[]
          })[]
        }) => {
          updateWinsMutation(values.users)
        }}
      />
    </div>
  )
}

const WinsPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WinTable />
    </Suspense>
  )
}

// WinsPage.authenticate = true
WinsPage.getLayout = (page) => <Layout>{page}</Layout>

export default WinsPage
