export interface Settings {
  id: string
  event_name: string
  event_date: Date
  location: string
  groom_name: string
  bride_name: string
}

export interface Person {
  id: string
  name: string
  short_name: string
  emoji: string
  is_live: boolean
  live_task_id?: string
  created_at: Date
}

export interface Category {
  id: string
  name: string
  emoji: string
  order: number
}

export interface Task {
  id: string
  category_id: string
  name: string
  stage: 'backlog' | 'active' | 'done'
  assigned_to?: string
  created_at: Date
  stuck_since?: Date
}

export interface Update {
  id: string
  person_id: string
  message: string
  type: 'update' | 'completed' | 'milestone'
  task_id?: string
  created_at: Date
}

export type UrgencyLevel = 'calm' | 'good' | 'warning' | 'urgent' | 'critical' | 'panic' | 'extreme'
