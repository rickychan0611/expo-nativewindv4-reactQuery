import { QueryCache, useQueryClient } from '@tanstack/react-query'
import { Tabs } from 'expo-router'
import React, { useEffect } from 'react'

type Props = {}

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error)
  },
  onSuccess: (data) => {
    console.log(data)
  },
  onSettled: (data, error) => {
    console.log(data, error)
  },
})

const query = queryCache.findAll()

function Tab_Root({ }: Props) {
  return (
    <Tabs></Tabs>
  )
}

export default Tab_Root