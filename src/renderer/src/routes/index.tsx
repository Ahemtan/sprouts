import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useTodoStore } from '@/store/todo.Store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  const { todos } = useTodoStore()

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
        {todos && todos.length > 0 ? (
          <ul className="px-4 py-2">
            {todos.map((todo) => (
              <li
                className="border-b-2 border-accent p-2 text-lg flex items-center gap-2"
                key={todo.title}
              >
                <div className={cn('size-5', 'rounded-full', `bg-${todo.status}-500`)}></div>
                <Separator orientation='vertical' className='h-8' />
                <div>
                  {todo.title}
                  <p className='text-xs text-gray-500'>{todo.date}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-gray-500 w-full h-full flex justify-center mt-4">No Todos</p>
        )}
      </div>
    </>
  )
}
