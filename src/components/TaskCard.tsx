import { useState } from 'react'
import type { Task } from '../types/task'
import { Trash2, Pencil, Check, X } from 'lucide-react'
import { useDraggable } from '@dnd-kit/core'
import api from '../services/api'
import toast from 'react-hot-toast'

interface TaskCardProps {
  task: Task
  onDelete: () => void
  onUpdate: () => void
}

export function TaskCard({ task, onDelete, onUpdate }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id })

  async function handleDelete() {
    await api.delete(`/tasks/${task.id}`)
    toast.success('Tarefa removida!')
    onDelete()
  }

  async function handleSave() {
    if (!title.trim()) {
      toast.error('O título é obrigatório!')
      return
    }
    await api.patch(`/tasks/${task.id}`, { title, description })
    toast.success('Tarefa atualizada!')
    setIsEditing(false)
    onUpdate()
  }

  if (isEditing) {
    return (
      <div className="bg-[#1a1a24] border border-purple-500 rounded-xl" style={{ padding: '16px 20px' }}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="bg-[#13131a] border border-[#2e2e3e] rounded-lg text-white text-sm w-full"
          style={{ padding: '6px 10px', marginBottom: '8px' }}
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={2}
          className="bg-[#13131a] border border-[#2e2e3e] rounded-lg text-white text-xs w-full resize-none"
          style={{ padding: '6px 10px', marginBottom: '8px' }}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleSave} className="text-green-400 hover:text-green-300 transition-colors">
            <Check size={16} />
          </button>
          <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-[#1a1a24] border border-[#2e2e3e] rounded-xl cursor-grab group"
      style={{
        padding: '16px 20px',
        minHeight: '86px',
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 999 : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white font-medium text-base">{task.title}</h3>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            onPointerDown={e => e.stopPropagation()}
            className="text-gray-600 hover:text-purple-400 transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={handleDelete}
            onPointerDown={e => e.stopPropagation()}
            className="text-gray-600 hover:text-red-400 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      {task.description && (
        <p className="text-gray-400 text-sm mt-2">{task.description}</p>
      )}
    </div>
  )
}