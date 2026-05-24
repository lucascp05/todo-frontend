import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
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

  const todo = tasks.filter(t => t.status === 'todo')
  const doing = tasks.filter(t => t.status === 'doing')
  const done = tasks.filter(t => t.status === 'done')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f13', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 24px' }}>
      <Toaster position="top-right" />
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h1 style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>Kanban Board</h1>
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
        <KanbanColumn title="Pendências" tasks={todo} color="bg-red-500" onDelete={fetchTasks} />
        <KanbanColumn title="Fazendo" tasks={doing} color="bg-yellow-500" onDelete={fetchTasks} />
        <KanbanColumn title="Feito" tasks={done} color="bg-green-500" onDelete={fetchTasks} />
      </div>
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={fetchTasks}
      />
    </div>
  )
}

export default App