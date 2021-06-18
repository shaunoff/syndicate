import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
  //resolver.authorize(),

  async () => {
    return db.user.findMany({
      include: {
        wins: {
          orderBy: {
            week: "asc",
          },
        },
      },
      where: {
        wins: {
          some: {},
        },
      },
    })
  }
)
