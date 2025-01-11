import { Button } from '@/components/ui/button'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

import { Pen } from 'lucide-react'

import { todoProps } from '@shared/types'

const EditTodoForm = ({ todo }: { todo: todoProps }) => {
  const [title, setTitle] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [open, setIsDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    setTitle(todo.title)
    setStatus(todo.status)
  }, [])

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (title && status) {
      setTitle('')
      setStatus('')

      console.log(status)

      // Close the dialog
      setIsDialogOpen(false)
    } else {
      console.log('Please fill in both title and status')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'}><Pen /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>✏️ Edit New Todo</DialogTitle>
          <DialogDescription>
            Edit your todo!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="grid gap-4 py-2">
            {/* Title input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                placeholder="Buy fruits"
                className="col-span-4"
              />
            </div>
            {/* Status select */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status">Priority</Label>
              <Select value={status} defaultValue='green' onValueChange={setStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="green">Low</SelectItem>
                  <SelectItem value="yellow">Medium</SelectItem>
                  <SelectItem value="red">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTodoForm
