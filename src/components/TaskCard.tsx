import type { Task } from '../types/task'
import { Trash2 } from 'lucide-react'
import api from '../services/api'
import toast from 'react-hot-toast'

interface TaskCardProps {
  task: Task
  onDelete: () => void
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  async function handleDelete() {
    await api.delete(`/tasks/${task.id}`)
    toast.success('Tarefa removida!')
    onDelete()
  }

  return (
    <div className="bg-[#1a1a24] border border-[#2e2e3e] rounded-xl p-4 cursor-grab group">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white font-medium text-sm">{task.title}</h3>
        <button
          onClick={handleDelete}
          className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={14} />
        </button>
      </div>
      {task.description && (
        <p className="text-gray-400 text-xs mt-2">{task.description}</p>
      )}
    </div>
  )
}