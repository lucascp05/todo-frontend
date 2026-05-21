import type { Task } from '../types/task'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-[#1a1a24] border border-[#2e2e3e] rounded-xl p-4 cursor-grab">
      <h3 className="text-white font-medium text-sm">{task.title}</h3>
      {task.description && (
        <p className="text-gray-400 text-xs mt-2">{task.description}</p>
      )}
    </div>
  )
}