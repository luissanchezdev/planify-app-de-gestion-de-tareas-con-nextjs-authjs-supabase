import { supabase } from "@/lib/supabaseClient";
import { ISpace } from "@/types/types";

class SpaceServiceClass {
   async  getAllSpaces() : Promise<ISpace[]> {
    const { data, error } = await supabase.from('spaces').select('*') 
    if(error) {
      console.log(error)
      throw new Error('Error al obtener los espacios')
    }

    return data || []
  }
}

const SpaceService = new SpaceServiceClass()

export default SpaceService