import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { Checkbox } from "@shaunoff-ui/components"

export interface CheckboxFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  className?: string
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ name, className, value, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name)
    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <Checkbox
        {...props}
        onChange={input.onChange}
        disabled={submitting || props.disabled}
        ref={ref}
        className={className}
        checked={input.value}
        //message={touched && normalizedError && normalizedError}
      />
    )
  }
)

export default CheckboxField
