import {useQuery, useQueryClient} from 'react-query'
import axios from 'axios'

const fetchSuperHero = (ctx) => {
  return axios.get(`http://localhost:4000/superheroes/${ctx.queryKey[1]}`)
}

const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient()
  console.log({ddd: queryClient.getQueryState()})

  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data.find((hero) => hero.id === parseInt(heroId))

      console.log({hero})

      if (hero) {
        return {
          data: hero
        }
      } else {
        return undefined
      }
    },
    staleTime: 30000
  })
}

export default useSuperHeroData
