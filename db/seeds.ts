import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

const seed = async () => {
  // await db.user.create({
  //   data: { name: "Lummy", email: "lummy@gmail.com" },
  // })
  // await db.user.create({
  //   data: { name: "Jonny", email: "Jonny@gmail.com" },
  // })
  // await db.user.create({
  //   data: { name: "Percy", email: "Percy@gmail.com" },
  // })
  // await db.user.create({
  //   data: { name: "Shaky", email: "Shaky@gmail.com" },
  // })
  // await db.user.create({
  //   data: { name: "Evo", email: "Evo@gmail.com" },
  // })
  // await db.user.create({
  //   data: { name: "Ryan", email: "Ryan@gmail.com" },
  // })
  // await db.user.create({
  //   data: { name: "Tank", email: "Tank@gmail.com" },
  // })
  // await db.user.create({
  //   data: { name: "Nicky", email: "Nicky@gmail.com" },
  // })
  // await db.user.create({
  //   data: { name: "Shaun", email: "Shaun@gmail.com" },
  // })
  // await db.user.create({
  //   data: { name: "Scott J", email: "Scott@gmail.com" },
  // })
  // await db.user.create({
  //   data: { name: "Pigeon", email: "Pigeon@gmail.com" },
  // })
  await db.win.deleteMany({})
  for (let i = 3; i <= 11; i++) {
    await db.win.create({
      data: { amount: 0, week: 1, userId: i, paid: true },
    })
    await db.win.create({
      data: { amount: 0, week: 2, userId: i, paid: true },
    })
  }
}

export default seed
