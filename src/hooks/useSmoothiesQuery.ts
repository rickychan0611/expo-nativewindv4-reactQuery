import { smoothiesApi } from "@/api/api.smoothies"
import { smoothiesKeys } from "@/api/query-factory"
import { Smoothy } from "@/interfaces"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useSmoothies = () => {
  return useQuery(
    {
      queryKey: ["smoothies"],
      queryFn: () => smoothiesApi.getSmoothies()
    }
  )
}

export const useGetSmoothyById = (id: string) => {
  return useQuery(
    {
      queryKey: ["smoothies", id],
      queryFn: () => smoothiesApi.getSmoothyById(id)
    }
  )
}


export const useCreateSmoothy = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (input: Smoothy) => smoothiesApi.createSmoothy(input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: ['smoothies'] });
      const prevSnanpshot = queryClient.getQueryData(["smoothies"]);
      console.log(queryClient.getQueryData(["smoothies"]))
      queryClient.setQueryData(['smoothies'], (old: Smoothy[]) => [...old, input])
      return { prevSnanpshot };
    },
    onError: (err, input, context) => {
      queryClient.setQueryData(['smoothies'], context.prevSnanpshot)
      throw err
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smoothies'] })
    },
  });

  return mutation;
};

