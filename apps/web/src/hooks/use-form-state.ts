import { FormEvent, useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

interface FormStateOptions {
  initialState?: FormState
  onSuccess?: () => Promise<void> | void
}

const defaultState: FormState = {
  success: false,
  message: null,
  errors: null,
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  { initialState, onSuccess }: FormStateOptions
) {
  const [isPeding, startTransition] = useTransition()
  const [formState, setFormState] = useState<FormState>(
    initialState ?? defaultState
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await action(formData)

      if (result.success && onSuccess) {
        await onSuccess()
      }

      setFormState(result)
    })
  }

  return [formState, handleSubmit, isPeding] as const
}
