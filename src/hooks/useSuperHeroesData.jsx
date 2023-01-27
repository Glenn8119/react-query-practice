import {useQuery, useMutation, useQueryClient} from 'react-query'
import axios from 'axios'

const fetchHeroes = () => {
  return axios('http://localhost:4000/superheroes')
}

const addSuperHero = (hero) => {
  return axios.post('http://localhost:4000/superheroes', hero)
}

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchHeroes, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    onMutate: async (newHero) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries()

      // Snapshot the previous value
      const previousHeroData = queryClient.getQueryData('super-heroes')

      // Optimistically update to the new value
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            {
              ...newHero,
              id: oldQueryData.data.length + 1
            }
          ]
        }
      })
      return {
        previousHeroData
      }
    },
    onError: (_error, _newHero, ctx) => {
      queryClient.setQueryData('super-heroes', ctx.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes')
    }
  })
}
