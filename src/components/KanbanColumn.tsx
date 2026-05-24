import type { Task } from '../types/task'
import { TaskCard } from './TaskCard'

interface KanbanColumnProps {
  title: string
  tasks: Task[]
  color: string
  onDelete: () => void
}

export function KanbanColumn({ title, tasks, color, onDelete }: KanbanColumnProps) {
  return (
    <div className="bg-[#13131a] border border-[#2e2e3e] rounded-2xl p-4 w-80 flex flex-col gap-3">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
        <h2 className="text-white font-semibold text-sm uppercase tracking-wider">{title}</h2>
        <span className="bg-[#2e2e3e] text-gray-400 text-xs px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}