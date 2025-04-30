import { createFileRoute } from '@tanstack/react-router'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {
  return (
    <div className='p-2 max-w-xl m-auto'>
      <h2 className='mb-4'>Create Expense</h2>
      <form>
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder="Title" />

        <Label htmlFor="amount">Amount</Label>
        <Input type="number" id="amount" placeholder="Amount" />
        <Button className='mt-4' type='submit'>Create Expense</Button>
      </form>
    </div>
  )
}
