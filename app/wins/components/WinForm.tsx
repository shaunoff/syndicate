import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import { User, Win } from "db"
import { Button, Table, Input } from "@shaunoff-ui/components"
export { FORM_ERROR } from "app/core/components/Form"

interface WinFormProps<S extends z.ZodType<any, any>> extends FormProps<S> {
  userWins?: (User & {
    wins: Win[]
  })[]
}

export function WinForm<S extends z.ZodType<any, any>>(props: WinFormProps<S>) {
  return (
    <Form<S> {...props} submitText="submit" initialValues={{ users: props.userWins }}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          {Array<null>(8)
            .fill(null)
            .map((week, index) => (
              <Table.HeadCell className="px-2 py-2 al">{index + 1}</Table.HeadCell>
            ))}
        </Table.Head>
        <Table.Body>
          {props.userWins.map((user, userIndex) => {
            return (
              <Table.Row>
                <Table.HeadCell>{user.name}</Table.HeadCell>
                {Array<null>(8)
                  .fill(null)
                  .map((week, index) => {
                    const winnings = user.wins[index]?.amount || 0
                    return (
                      <Table.Cell className="px-2 py-2">
                        <div className="flex items-center">
                          {/* <Input value={winnings} className="p-1 w-16" /> */}
                          <LabeledTextField
                            type="number"
                            name={`users[${userIndex}].wins[${index}].amount`}
                            className="p-1 w-16"
                          />
                          <input
                            type="checkbox"
                            className=" h-4 w-4 text-blue-600 border-gray-300 rounded ml-2"
                          />
                        </div>
                      </Table.Cell>
                    )
                  })}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Form>
  )
}
