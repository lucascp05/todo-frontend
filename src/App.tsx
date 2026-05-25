import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { DndContext } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { KanbanColumn } from './components/KanbanColumn'
import { CreateTaskModal } from './components/CreateTaskModal'
import type { Task } from './types/task'
import api from './services/api'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function fetchTasks() {
    const res = await api.get('/tasks')
    setTasks(res.data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const taskId = active.id as string
    const newStatus = over.id as string
    const task = tasks.find(t => t.id === taskId)
    if (!task || task.status === newStatus) return
    await api.patch(`/tasks/${taskId}`, { status: newStatus })
    fetchTasks()
  }

  const todo = tasks.filter(t => t.status === 'todo')
  const doing = tasks.filter(t => t.status === 'doing')
  const done = tasks.filter(t => t.status === 'done')

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ minHeight: '100vh', backgroundColor: '#0f0f13', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 24px' }}>
        <Toaster position="top-right" />
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <h1 style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>TaskBoard</h1>
          <p style={{ color: '#6b7280', marginTop: '8px', fontSize: '14px' }}>Gerencie suas tarefas com estilo</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '6px 14px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '500',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          + Nova Tarefa
        </button>
        <div style={{ display: 'flex', gap: '24px', width: '100%', maxWidth: '1100px', justifyContent: 'center' }}>
          <KanbanColumn title="Pendências" tasks={todo} color="bg-red-500" status="todo" onDelete={fetchTasks} onUpdate={fetchTasks} />
          <KanbanColumn title="Fazendo" tasks={doing} color="bg-yellow-500" status="doing" onDelete={fetchTasks} onUpdate={fetchTasks} />
          <KanbanColumn title="Feito" tasks={done} color="bg-green-500" status="done" onDelete={fetchTasks} onUpdate={fetchTasks} />
        </div>
        <CreateTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTaskCreated={fetchTasks}
        />
      </div>
    </DndContext>
  )
}

export default App