import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps, FormRenderProps } from "react-final-form"
import { z } from "zod"

import { Button } from "@shaunoff-ui/components"

export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** render props to pass form props (only values for now) */
  children?: (props: Partial<FormRenderProps<z.TypeOf<S>, Partial<z.TypeOf<S>>>>) => JSX.Element
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
      onChange={(val) => console.log("gfhhfdkjgh", val)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError, values, dirty }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children && children({ values, dirty, submitting })}

          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          {submitText && (
            <Button type="submit" disabled={submitting || !dirty}>
              {submitText}
            </Button>
          )}
        </form>
      )}
    />
  )
}

export default Form
