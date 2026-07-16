import { create } from 'zustand'
import { supabase } from '../lib/supabase'
export const useTodoStore = create((set, get) => ({
  weeklyGoals: [
    { id: '1', text: '', checked: false },
    { id: '2', text: '', checked: false },
  ],
  todos: [
    { id: '1', text: '', checked: false },
    { id: '2', text: '', checked: false },
  ],
  habits: [],
  isLoading: false,
  
  setLoading: (isLoading) => set({ isLoading }),
  
  // Weekly Goals Actions
  addWeeklyGoal: () => set((state) => ({ 
    weeklyGoals: [...state.weeklyGoals, { id: Date.now().toString(), text: '', checked: false }] 
  })),
  toggleWeeklyGoal: (id) => set((state) => ({
    weeklyGoals: state.weeklyGoals.map(g => g.id === id ? { ...g, checked: !g.checked } : g)
  })),
  updateWeeklyGoalText: (id, text) => set((state) => ({
    weeklyGoals: state.weeklyGoals.map(g => g.id === id ? { ...g, text } : g)
  })),
  deleteWeeklyGoal: (id) => set((state) => ({
    weeklyGoals: state.weeklyGoals.filter(g => g.id !== id)
  })),

  // Todos Actions
  addTodo: () => set((state) => ({ 
    todos: [...state.todos, { id: Date.now().toString(), text: '', checked: false }] 
  })),
  toggleTodo: (id) => set((state) => {
    const todo = state.todos.find(t => t.id === id);
    if (!todo) return state;
    const newChecked = !todo.checked;
    
    // Map JS getDay() (0=Sun, 1=Mon...6=Sat) to UI day index (0=Mon...6=Sun)
    const jsDay = new Date().getDay();
    const todayIndex = jsDay === 0 ? 6 : jsDay - 1;

    return {
      todos: state.todos.map(t => t.id === id ? { ...t, checked: newChecked } : t),
      habits: state.habits.map(h => 
        h.name.trim().toLowerCase() === todo.text.trim().toLowerCase() && todo.text.trim() !== ''
          ? { ...h, days: { ...h.days, [todayIndex]: newChecked } }
          : h
      )
    };
  }),
  updateTodoText: (id, text) => set((state) => ({
    todos: state.todos.map(t => t.id === id ? { ...t, text } : t)
  })),
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(t => t.id !== id)
  })),

  // Habits Actions
  addHabit: (name = '') => set((state) => ({
    habits: [...state.habits, { id: Date.now().toString(), name, days: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false } }]
  })),
  toggleHabitDay: (habitId, dayIndex) => set((state) => ({
    habits: state.habits.map(h => h.id === habitId ? { ...h, days: { ...h.days, [dayIndex]: !h.days[dayIndex] } } : h)
  })),
  updateHabitName: (id, name) => set((state) => ({
    habits: state.habits.map(h => h.id === id ? { ...h, name } : h)
  })),
  deleteHabit: (id) => set((state) => ({
    habits: state.habits.filter(h => h.id !== id)
  })),

  // Database Actions
  saveWeeklyProgress: async () => {
    set({ isLoading: true });
    try {
      const state = get();
      const payload = {
        weekly_goals: state.weeklyGoals,
        todos: state.todos,
        habits: state.habits,
        created_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('weekly_history')
        .insert([payload]);
        
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error saving progress:', error);
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  }
}))
