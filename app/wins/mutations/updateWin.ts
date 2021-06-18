import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateWin = z.object({
  id: z.number(),
  amount: z.number(),
  week: z.number(),
  userId: z.number(),
  paid: z.boolean(),
})

export default resolver.pipe(
  resolver.zod(UpdateWin),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const win = await db.win.update({ where: { id }, data })

    return win
  }
)
