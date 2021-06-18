import { Suspense } from "react"
import { Link, BlitzPage, useMutation, useQuery, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { Table } from "@shaunoff-ui/components"
import getWinTotals, { NormalizedWin, UserWinData } from "app/wins/queries/getWinTotals"
import {
  CheckCircleIcon,
  XCircleIcon,
  BanIcon,
  ArrowSmRightIcon,
  ArrowSmUpIcon,
  ArrowSmDownIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from "@heroicons/react/outline"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const currentForm = (wins: NormalizedWin[], length = 6) => {
  const latestWins = wins.slice(-length).map((win) => win.amount > 0)
  const winsShort = wins.length - length
  if (winsShort < 0) {
    return [...new Array<null>(Math.abs(winsShort)).fill(null), ...latestWins]
  } else {
    return latestWins
  }
}

const sortedPrevious = (userData: UserWinData[]) => {
  return userData
    .map((data) => data.wins[data.wins.length - 2]?.runningTotal || 0)
    .sort((a, b) => b - a)
}

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [userWins] = useQuery(getWinTotals, {})

  const rankedUsers = Object.values(userWins).sort((a, b) => b.total - a.total)

  /**
   * This sorts the previous rounds totals to determine whether the current position has changed
   */
  const sortedPreviousTotals = Object.values(userWins)
    .map((data) => data.wins[data.wins.length - 2]?.runningTotal || 0)
    .sort((a, b) => b - a)

  const sortedCurrentTotals = rankedUsers.map((user) => user.total)

  const currentTotal = sortedCurrentTotals.reduce((total, win) => {
    return total + win
  }, 0)

  return (
    <>
      {/* <Button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          fffffff
        </Button> */}
      <div className="flex w-100">
        <div className="mt-4 mr-2 ml-4 rounded-md bg-white flex items-center p-2 w-2/3 shadow-sm">
          <CurrencyDollarIcon className="h-14 w-14 text-yellow-500 ml-0.5 mr-2" />
          <div className="ml-2">
            <div className="text-gray-300">Winnings:</div>
            <div className="text-3xl">{(currentTotal / 100).toFixed(2)} </div>
          </div>
        </div>
        <div className="mt-4 ml-2 mr-4 rounded-md bg-white flex items-center p-2 w-1/3 shadow-sm">
          <CalendarIcon className="h-14 w-14 text-blue-500 ml-0.5 mr-2" />
          <div className="ml-2">
            <div className="text-gray-300">Weeks:</div>
            <div className="text-3xl text-center">2</div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Table>
          {/* <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Form</Table.HeadCell>
              <Table.HeadCell>$</Table.HeadCell>
            </Table.Head> */}
          <Table.Body>
            {rankedUsers.map(({ user, total, wins }, index) => {
              const currentRank =
                sortedCurrentTotals.indexOf(wins[wins.length - 1]?.runningTotal || 0) + 1
              const prevRank =
                sortedPreviousTotals.indexOf(wins[wins.length - 2]?.runningTotal || 0) + 1
              return (
                <Table.Row>
                  {/* <Table.Cell className="px-2 py-2 w-8"></Table.Cell> */}
                  <Table.Cell className="px-2 py-2">
                    <div className="flex items-center">
                      <strong className="w-3 mr-1">{index + 1}</strong>
                      {currentRank > prevRank ? (
                        <ArrowSmDownIcon className="h-5 w-5 text-red-400 ml-0.5 mr-2" />
                      ) : currentRank < prevRank ? (
                        <ArrowSmUpIcon className="h-5 w-5 text-green-400 ml-0.5 mr-2" />
                      ) : (
                        <ArrowSmRightIcon className="h-5 w-5 text-gray-400 ml-0.5 mr-2" />
                      )}
                      {user.name}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="px-2 py-2">
                    <div className="flex">
                      {currentForm(wins).map((win) =>
                        win === true ? (
                          <CheckCircleIcon className="h-4 w-4 text-green-400 mr-1" />
                        ) : win === false ? (
                          <XCircleIcon className="h-4 w-4 text-red-400 mr-1" />
                        ) : (
                          <BanIcon className="h-4 w-4 text-gray-300 mr-1" />
                        )
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="px-2 py-2">${(total / 100).toFixed(2)}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
      {/* <div className="bg-indigo-600">
        User id: <code>{currentUser.id}</code>
        <br />
        User role: <code>{currentUser.role}</code>
      </div> */}
    </>
  )
}

const Home: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
