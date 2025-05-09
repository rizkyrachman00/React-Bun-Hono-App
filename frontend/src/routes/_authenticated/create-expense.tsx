import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'

import { useForm } from '@tanstack/react-form'
import { api } from "@/lib/api"
import { createExpenseSchema } from '@server/sharedTypes'

export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      title: '',
      amount: "0",
    },
    onSubmit: async ({ value }) => {
      await new Promise((r) => setTimeout(r, 2000))

      const res = await api.expenses.$post({ json: value })

      if (!res.ok) {
        throw new Error("Server error")
      }

      navigate({ to: "/expenses" })
    },
  })

  return (
    <div className='p-2 m-auto'>
      <h2 className='mb-4'>Create Expense</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="title"
          validators={{
            onChange: createExpenseSchema.shape.title,
          }}
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched && !field.state.meta.isValid ? (
                  <em>{field.state.meta.errors.map((err) => err?.message).join(',')}</em>
                ) : null}
                {field.state.meta.isValidating ? 'Validating...' : null}
              </>
            )
          }}
        />

        <form.Field
          name="amount"
          validators={{
            onChange: createExpenseSchema.shape.amount,
          }}
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name}>Amount</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type='number'
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched && !field.state.meta.isValid ? (
                  <em>{field.state.meta.errors.map((err) => err?.message).join(',')}</em>
                ) : null}
                {field.state.meta.isValidating ? 'Validating...' : null}
              </>

            )
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button className='mt-4' type='submit' disabled={!canSubmit}>
              {isSubmitting ? 'Loading...' : 'Create Expense'}
            </Button>
          )}
        />
      </form>
    </div>
  )
}
