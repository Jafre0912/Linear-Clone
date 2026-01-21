export type Issue = {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'done' | 'canceled'
  priority: 'none' | 'low' | 'medium' | 'high'
  created_at: string
}