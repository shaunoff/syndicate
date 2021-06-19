import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { CheckboxField } from "app/core/components/CheckboxField"
import { useForm } from "react-final-form"
import { z } from "zod"
import { User, Win } from "db"
import { Button, Table, Input, Checkbox } from "@shaunoff-ui/components"
export { FORM_ERROR } from "app/core/components/Form"

interface WinFormProps<S extends z.ZodType<any, any>> extends FormProps<S> {
  userWins: (User & {
    wins: Win[]
  })[]
}

export function WinForm<
  S extends z.ZodType<
    {
      users: (User & {
        wins: Win[]
      })[]
    },
    any
  >
>(props: WinFormProps<S>) {
  return (
    <Form<S> {...props} initialValues={{ users: props.userWins }}>
      {({ values, dirty, submitting }) => {
        const currentWeek = values?.users[0]?.wins.length || 0
        return (
          <>
            <Table>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                {Array<null>(8)
                  .fill(null)
                  .map((week, index) => (
                    <Table.HeadCell className={`px-2 py-2`}>{index + 1}</Table.HeadCell>
                  ))}
              </Table.Head>
              <Table.Body>
                {values?.users.map((user, userIndex) => {
                  return (
                    <Table.Row>
                      <Table.HeadCell>{user.name}</Table.HeadCell>
                      {Array<null>(8)
                        .fill(null)
                        .map((week, index) => {
                          const winnings = user.wins[index]?.amount || 0
                          return (
                            <Table.Cell className={`px-2 py-2`}>
                              <div className="flex items-center">
                                {/* <Input value={winnings} className="p-1 w-16" /> */}
                                <LabeledTextField
                                  type="number"
                                  name={`users[${userIndex}].wins[${index}].amount`}
                                  className="p-1 w-16"
                                  disabled={index >= currentWeek}
                                />
                                <CheckboxField
                                  name={`users[${userIndex}].wins[${index}].paid`}
                                  disabled={winnings === 0}
                                  className={"m-2"}
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
            <Button type="submit" disabled={!dirty || submitting} className="mt-2">
              Save Changes
            </Button>
          </>
        )
      }}
    </Form>
  )
}
