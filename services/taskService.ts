import { supabase } from "@/lib/supabaseClient"
import { updateInitialTaskState } from '@/redux/slices/taskSlice';
import { useDispatch } from "react-redux";

export const getTasks = async (spaceId : string, userId : string) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('space_id', spaceId)
      .eq('user_id', userId)
    
    if (error) throw error
    
    return data
  } catch (error) {
    console.error('Error al obtener las tareas:', error)
    throw error
  }
}