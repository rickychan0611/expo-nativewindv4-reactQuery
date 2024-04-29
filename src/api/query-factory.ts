import { createQueryKeyStore } from '@lukemorales/query-key-factory'
import { Pokemon } from '@/models/pokemon.type'
import { pokemonApi } from './api.pokemon'
import { smoothiesApi } from './api.smoothies'

export const pokemonKeys = createQueryKeyStore({
  pokemon: {
    detail: (id: number) => ({
      queryKey: [id],
      queryFn: () => pokemonApi.getPokemon(id),
    }),
    list: (filters: Pokemon[], limit: number, offset: number) => ({
      queryKey: [{ filters, limit, offset }],
      queryFn: () => pokemonApi.getPokemonList({ limit, offset }),
    }),
  },
})

export const smoothiesKeys = createQueryKeyStore({
  smoothies: {
    list: () => ({
      queryKey: ["all"],
      queryFn: () => smoothiesApi.getSmoothies(),
    }),
    // createSmoothy: (body) => ({
    //   mutationKey: ["createSmoothy"],
    //   mutationFn: () => smoothiesApi.createSmoothy(body),
    // }),
  },
})