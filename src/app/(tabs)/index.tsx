import React from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { colorScheme } from "nativewind";
import { useQueryClient } from '@tanstack/react-query'
import { usePokemonDetail } from '@/hooks';
import { useCreateSmoothy, useGetSmoothyById, useSmoothies } from '@/hooks/useSmoothiesQuery';
import { smoothiesKeys } from '@/api/query-factory';
import { smoothiesApi } from '@/api/api.smoothies';

interface Smoothy {
  id: string;
  title: string;
  method: string;
  rating: string;
}

function Index() {
  const queryClient = useQueryClient()
  const { data } = usePokemonDetail(3);
  const { data: data2 } = usePokemonDetail(2);
  const [input, setInput] = React.useState<Smoothy>()
  const smoothies = useSmoothies();
  const createSmoothy = useCreateSmoothy();
  const smoothy = useGetSmoothyById(null);
  // React.useEffect(() => console.log("smoothies", smoothies), [smoothies]) // console.log("datccccccccccccccca", data)
  // React.useEffect(() => console.log("smoothies error", smoothies.error), [smoothies]) // console.log("datccccccccccccccca", data)
  const handleSubmit = async () => {
    if (!input) {
      return
    }
    const res = await createSmoothy.mutate(input)
    console.log(res)
  }

  return (
    <View className='flex-1 bg-white dark:bg-black'>
      <Text>isFetching...{JSON.stringify(smoothies.isFetching)}</Text>
      <Text>isPending...{JSON.stringify(smoothies.isPending)}</Text>
      <Text>isLoading...{JSON.stringify(smoothies.isLoading)}</Text>
      <Text>{smoothies.isPending}</Text>
      <Text className='text-red-500'>Error: {smoothies.error ? JSON.stringify(smoothies.error) : ""}</Text>
      <Pressable
        onPress={() => colorScheme.toggle()}
      >
        {smoothies?.data?.map((s, i) => <Text key={i}>{s.title}</Text>)}

      </Pressable>
      <TextInput
        className='border border-black p-2 rounded'
        value={input?.title}
        onChangeText={(text) => setInput({ ...input, title: text })}
      />
      <TextInput
        className='border border-black p-2 rounded'
        value={input?.method}
        onChangeText={(text) => setInput({ ...input, method: text })}
      />
      <TextInput
        className='border border-black p-2 rounded'
        value={input?.rating}
        onChangeText={(text) => setInput({ ...input, rating: text })}
      />
      <Pressable onPress={handleSubmit}>
        <Text>Submit</Text>
      </Pressable>
      <Text>createSmoothyIsPending...{JSON.stringify(createSmoothy.isPending)}</Text>
      <Text>error...{JSON.stringify(createSmoothy.error)}</Text> 

    </View>
  )
}

export default Index