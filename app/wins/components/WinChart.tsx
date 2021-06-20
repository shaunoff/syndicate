import React from "react"
import { UserWinData } from "app/wins/queries/getWinTotals"
import weeklyWinTotals from "app/wins/utils/weeklyWinTotals"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

interface WinChartProps {
  userWins: Record<number, UserWinData>
}
const WinChart: React.FC<WinChartProps> = ({ userWins }) => {
  const winTotals = weeklyWinTotals(userWins)
  const winTotalsArray = Object.values(winTotals)
  const cumulativeSum = (
    (sum) => (value: number) =>
      (sum += value)
  )(0)
  const cumulativeTotals = winTotalsArray.map(cumulativeSum)
  const average = winTotalsArray.reduce((total, win) => win + total, 0) / winTotalsArray.length
  const data = new Array(50).fill(null).map((win, index) => ({
    avg: parseFloat(((average * (index + 1)) / 100).toFixed(2)),
    name: index + 1,
    win: cumulativeTotals[index]
      ? parseFloat(((cumulativeTotals[index] || 0) / 100).toFixed(2))
      : null,
  }))

  console.log(winTotals)
  return (
    <>
      <div className="h-96 bg-white p-2 m-4 rounded box-border shadow-md">
        <div className="flex justify-between m-2 items-center">
          <h1 className="text-gray-300">Running Total</h1>
          <div className="text-gray-300 flex items-center">
            <div>Projected Winnings:</div>
            <strong className="ml-2 text-blue-600">£ {((average * 50) / 100).toFixed(2)}</strong>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="92%">
          <LineChart
            width={500}
            height={364}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis tickCount={3} tick={false} />
            <YAxis />
            {/* <Tooltip /> */}
            {/* <Legend /> */}
            <Line type="monotone" dataKey="win" stroke="#82ca9d" strokeWidth={2} dot={true} />
            <Line
              type="monotone"
              dataKey="avg"
              stroke="#8884d8"
              dot={false}
              strokeDasharray="3 3"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-2"></div>
    </>
  )
}

export default WinChart
