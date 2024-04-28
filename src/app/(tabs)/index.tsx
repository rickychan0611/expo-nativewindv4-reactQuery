import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { colorScheme } from "nativewind";
import { usePokemonDetail, usePokemonList } from "@/hooks/usePokemon";

type Props = {}

function Index({ }: Props) {

  const { data } = usePokemonDetail(3);

  return (
    <View className='flex-1 bg-white dark:bg-stone-500'>
      <Pressable
        onPress={() => colorScheme.toggle()}
      >
        <Text className='text-3xl font-bold text-primary-500 dark:text-primary-100'>
          {JSON.stringify(data?.name)}
        </Text>
      </Pressable>
    </View>
  )
}

export default Index