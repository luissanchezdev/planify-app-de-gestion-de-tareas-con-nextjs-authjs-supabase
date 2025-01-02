import { supabase } from "@/lib/supabaseClient";
import { ISpace } from "@/types/types";


export async function getAllSpaces(userId : string): Promise<ISpace[]> {
  const { data, error } = await supabase.from('spaces').select('*').gte('user_id',`${userId}`) 
  if(error) {
    console.log(error)
    throw new Error('Error al obtener los espacios')
  }

  return data || []
}

export async function getSpaceById(spaceId : string, userId : string): Promise<ISpace[]> {
  const { data, error } = await supabase.from('spaces').select('*').gte('id',`${spaceId}`).gte('user_id',`${userId}`)
  if(error) {
    console.log(error)
    throw new Error('Error al obtener los espacios filtrados por usuario')
  }

  if(data.length === 0) {
    throw new Error('No se encuentra ningún space')
  }

  return data[0]
}