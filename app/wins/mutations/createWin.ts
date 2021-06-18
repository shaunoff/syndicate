import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateWin = z.object({
  amount: z.number(),
  week: z.number(),
  userId: z.number(),
  paid: z.boolean(),
})

export default resolver.pipe(resolver.zod(CreateWin), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const win = await db.win.create({ data: input })

  return win
})
