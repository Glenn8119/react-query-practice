import {useQuery} from 'react-query'
import axios from 'axios'

const fetchHeroes = () => {
  return axios('http://localhost:4000/superheroes')
}

const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchHeroes, {
    onSuccess,
    onError
  })
}

export default useSuperHeroesData
