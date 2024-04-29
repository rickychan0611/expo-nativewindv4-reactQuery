import supabase from "@/config/supabaseClient"

interface Smoothy {
  id: string;
  title: string;
  method: string;
  rating: string;
}

export const smoothiesApi = {
  getSmoothies: async (): Promise<Smoothy[]> => {
    const { data, error } = await supabase
      .from('smoothies') //table name
      .select() //select all
    if (error) {
      console.log("getSmoothdies", error)
      throw "fuck you"
    }
    return data
  },
  createSmoothy: async (body: Smoothy) => {
    console.log("run createSmoothy")
    const { data, error } = await supabase
      .from('smoothies') //table name
      .insert([body]) //columns to insert
    if (error) {
      console.log("getSmoothdies", error)
      throw "cound't insert, fuck you"
    }
    if (data) {
      console.log("create Smoothdies", data)
      return data
    }
  },
  getSmoothyById: async (id: string): Promise<Smoothy> => {
    const { data, error } = await supabase
      .from('smoothies') //table name
      .select() 
      .eq('id', id) 
      .single()
    if (error) {
      console.log("getSmoothdies", error)
      throw "No id found"
    }
    return data
  }
}