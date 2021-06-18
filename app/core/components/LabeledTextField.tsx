import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { Input } from "@shaunoff-ui/components"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label?: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  className?: string
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, className, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps}>
        <Input
          onChange={input.onChange}
          value={input.value.toString()}
          disabled={submitting}
          ref={ref}
          label={label}
          className={className}
          message={touched && normalizedError && normalizedError}
        />
      </div>
    )
  }
)

export default LabeledTextField
