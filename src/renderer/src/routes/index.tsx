import { Badge } from '@/components/ui/badge'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <>
      <div className="w-full flex flex-wrap justify-end gap-2">
        <Badge className="text-base" variant={'default'}>
          All
        </Badge>
        <Badge className="text-base" variant={'secondary'}>
          In Progress
        </Badge>
        <Badge className="text-base" variant={'secondary'}>
          Completed
        </Badge>
        <Badge className="text-base bg-green-500 hover:bg-green-400" variant={'secondary'}>
          Low
        </Badge>
        <Badge className="text-base bg-yellow-500 hover:bg-yellow-400" variant={'secondary'}>
          Medium
        </Badge>
        <Badge className="text-base bg-red-500 hover:bg-red-400" variant={'secondary'}>
          High
        </Badge>
      </div>
      <div>
        <h1>Hello from Electron!</h1>
      </div>
    </>
  )
}
