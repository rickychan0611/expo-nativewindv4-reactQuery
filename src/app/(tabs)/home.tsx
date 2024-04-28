import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { colorScheme } from "nativewind";
import { useQueryClient } from '@tanstack/react-query'
import { usePokemonDetail } from '@/hooks';
import color from '../../../tailwind.config'

type Props = {}

function Home({ }: Props) {
  const queryClient = useQueryClient()
  const { data } = usePokemonDetail(3);
  const { data: data2 } = usePokemonDetail(2);

  React.useEffect(() => console.log("datccccccccccccccca", color), [data]) // console.log("datccccccccccccccca", data)

  return (
    <View className='flex-1 bg-white dark:bg-black'>
      <Pressable
        onPress={() => colorScheme.toggle()}
      >
        <Text className='dark:text-white'>{JSON.stringify(data?.name)}</Text>
      </Pressable>
    </View>
  )
}

export default Home