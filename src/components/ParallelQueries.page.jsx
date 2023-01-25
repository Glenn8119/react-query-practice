import {useQuery} from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = () => {
  console.log('heroes')
  return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () => {
  console.log('friends')
  return axios.get('http://localhost:4000/friends')
}

const fetchSleep = () => {
  console.log('sleep')
  return new Promise((res) => {
    setTimeout(() => {
      res('sleep')
    }, 2000)
  })
}

const ParallelQueriesPage = () => {
  useQuery('super-heroes', fetchSuperHeroes)
  useQuery('fetchSleep', fetchSleep)
  useQuery('friends', fetchFriends)

  return <div>parallel</div>
}

export default ParallelQueriesPage
