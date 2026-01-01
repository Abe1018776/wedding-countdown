import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Settings, Person, Category, Task, Update } from '../types'

interface WeddingState {
  settings: Settings
  people: Person[]
  categories: Category[]
  tasks: Task[]
  updates: Update[]
}

type Action =
  | { type: 'SET_SETTINGS'; payload: Settings }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'ADD_PERSON'; payload: Person }
  | { type: 'UPDATE_PERSON'; payload: { id: string; data: Partial<Person> } }
  | { type: 'DELETE_PERSON'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: { id: string; data: Partial<Category> } }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: { id: string; data: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'MOVE_TASK'; payload: { id: string; stage: Task['stage'] } }
  | { type: 'ADD_UPDATE'; payload: Update }
  | { type: 'UPDATE_UPDATE'; payload: { id: string; data: Partial<Update> } }
  | { type: 'DELETE_UPDATE'; payload: string }

const initialSettings: Settings = {
  id: 'settings-1',
  event_name: 'חתונת יואל ועדן',
  event_date: new Date(2026, 0, 7, 18, 0, 0),
  location: 'Eden Hall',
  groom_name: 'יואל',
  bride_name: 'עדן',
}

const initialPeople: Person[] = [
  { id: 'person-1', name: 'חתן', short_name: 'חתן', emoji: '🤵', is_live: false, created_at: new Date() },
  { id: 'person-2', name: 'כלה', short_name: 'כלה', emoji: '👰', is_live: false, created_at: new Date() },
  { id: 'person-3', name: 'שווער', short_name: 'שווער', emoji: '👨‍👦', is_live: false, created_at: new Date() },
  { id: 'person-4', name: 'שוויגער', short_name: 'שוויגער', emoji: '👩‍👦', is_live: false, created_at: new Date() },
  { id: 'person-5', name: 'מחותן', short_name: 'מחותן', emoji: '🤝', is_live: false, created_at: new Date() },
]

const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Invitations', emoji: '💌', order: 1 },
  { id: 'cat-2', name: 'Venue', emoji: '🏛️', order: 2 },
  { id: 'cat-3', name: 'Music', emoji: '🎵', order: 3 },
  { id: 'cat-4', name: 'Flowers', emoji: '💐', order: 4 },
  { id: 'cat-5', name: 'Attire', emoji: '👗', order: 5 },
  { id: 'cat-6', name: 'Bentschers', emoji: '📖', order: 6 },
  { id: 'cat-7', name: 'Catering', emoji: '🍽️', order: 7 },
  { id: 'cat-8', name: 'Photography', emoji: '📸', order: 8 },
]

const initialTasks: Task[] = [
  { id: 'task-1', category_id: 'cat-1', name: 'דיזיין הזמנות', stage: 'done', assigned_to: 'person-2', created_at: new Date() },
  { id: 'task-2', category_id: 'cat-1', name: 'דרוקן הזמנות', stage: 'done', assigned_to: 'person-3', created_at: new Date() },
  { id: 'task-3', category_id: 'cat-1', name: 'שיקן הזמנות', stage: 'active', assigned_to: 'person-4', created_at: new Date() },
  { id: 'task-4', category_id: 'cat-2', name: 'באַשטעטיקן זאַל', stage: 'done', assigned_to: 'person-3', created_at: new Date() },
  { id: 'task-5', category_id: 'cat-2', name: 'פלאַן טיש סידור', stage: 'active', assigned_to: 'person-5', created_at: new Date() },
  { id: 'task-6', category_id: 'cat-2', name: 'דעקאָראַציעס', stage: 'backlog', created_at: new Date() },
  { id: 'task-7', category_id: 'cat-3', name: 'באַשטעלן באַנד', stage: 'done', assigned_to: 'person-1', created_at: new Date() },
  { id: 'task-8', category_id: 'cat-3', name: 'זינגער פֿאַר חופה', stage: 'active', assigned_to: 'person-1', created_at: new Date() },
  { id: 'task-9', category_id: 'cat-3', name: 'ליד ליסטע', stage: 'backlog', created_at: new Date() },
  { id: 'task-10', category_id: 'cat-4', name: 'בלומען פֿאַר חופה', stage: 'active', assigned_to: 'person-2', created_at: new Date() },
  { id: 'task-11', category_id: 'cat-4', name: 'טיש בלומען', stage: 'backlog', created_at: new Date() },
  { id: 'task-12', category_id: 'cat-5', name: 'כלה קלייד', stage: 'done', assigned_to: 'person-2', created_at: new Date() },
  { id: 'task-13', category_id: 'cat-5', name: 'חתן בגדים', stage: 'active', assigned_to: 'person-1', created_at: new Date() },
  { id: 'task-14', category_id: 'cat-6', name: 'דיזיין בענטשער', stage: 'done', assigned_to: 'person-2', created_at: new Date() },
  { id: 'task-15', category_id: 'cat-6', name: 'דרוקן בענטשערס', stage: 'backlog', created_at: new Date() },
]

const initialUpdates: Update[] = [
  { id: 'update-1', person_id: 'person-2', message: 'הזמנות זענען פארטיק!', type: 'completed', task_id: 'task-1', created_at: new Date() },
  { id: 'update-2', person_id: 'person-3', message: 'זאַל איז באַשטעטיקט', type: 'milestone', task_id: 'task-4', created_at: new Date() },
]

const initialState: WeddingState = {
  settings: initialSettings,
  people: initialPeople,
  categories: initialCategories,
  tasks: initialTasks,
  updates: initialUpdates,
}

function weddingReducer(state: WeddingState, action: Action): WeddingState {
  switch (action.type) {
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload }
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } }
    case 'ADD_PERSON':
      return { ...state, people: [...state.people, action.payload] }
    case 'UPDATE_PERSON':
      return {
        ...state,
        people: state.people.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload.data } : p
        ),
      }
    case 'DELETE_PERSON':
      return { ...state, people: state.people.filter((p) => p.id !== action.payload) }
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] }
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload.data } : c
        ),
      }
    case 'DELETE_CATEGORY':
      return { ...state, categories: state.categories.filter((c) => c.id !== action.payload) }
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] }
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.data } : t
        ),
      }
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) }
    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, stage: action.payload.stage } : t
        ),
      }
    case 'ADD_UPDATE':
      return { ...state, updates: [action.payload, ...state.updates] }
    case 'UPDATE_UPDATE':
      return {
        ...state,
        updates: state.updates.map((u) =>
          u.id === action.payload.id ? { ...u, ...action.payload.data } : u
        ),
      }
    case 'DELETE_UPDATE':
      return { ...state, updates: state.updates.filter((u) => u.id !== action.payload) }
    default:
      return state
  }
}

interface WeddingContextValue {
  state: WeddingState
  dispatch: React.Dispatch<Action>
  getProgress: () => { total: number; done: number; percentage: number }
  getCategoryProgress: (categoryId: string) => { total: number; done: number; percentage: number }
  getTasksByStage: (stage: Task['stage']) => Task[]
  getTasksByCategory: (categoryId: string) => Task[]
  getPersonById: (id: string) => Person | undefined
  getCategoryById: (id: string) => Category | undefined
}

const WeddingContext = createContext<WeddingContextValue | null>(null)

export function WeddingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(weddingReducer, initialState)

  const getProgress = () => {
    const total = state.tasks.length
    const done = state.tasks.filter((t) => t.stage === 'done').length
    const percentage = total > 0 ? Math.round((done / total) * 100) : 0
    return { total, done, percentage }
  }

  const getCategoryProgress = (categoryId: string) => {
    const categoryTasks = state.tasks.filter((t) => t.category_id === categoryId)
    const total = categoryTasks.length
    const done = categoryTasks.filter((t) => t.stage === 'done').length
    const percentage = total > 0 ? Math.round((done / total) * 100) : 0
    return { total, done, percentage }
  }

  const getTasksByStage = (stage: Task['stage']) => {
    return state.tasks.filter((t) => t.stage === stage)
  }

  const getTasksByCategory = (categoryId: string) => {
    return state.tasks.filter((t) => t.category_id === categoryId)
  }

  const getPersonById = (id: string) => {
    return state.people.find((p) => p.id === id)
  }

  const getCategoryById = (id: string) => {
    return state.categories.find((c) => c.id === id)
  }

  return (
    <WeddingContext.Provider
      value={{
        state,
        dispatch,
        getProgress,
        getCategoryProgress,
        getTasksByStage,
        getTasksByCategory,
        getPersonById,
        getCategoryById,
      }}
    >
      {children}
    </WeddingContext.Provider>
  )
}

export function useWedding() {
  const context = useContext(WeddingContext)
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider')
  }
  return context
}

export function generateId(prefix: string = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
