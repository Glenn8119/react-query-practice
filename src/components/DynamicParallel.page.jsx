import {useQueries} from 'react-query'
import axios from 'axios'

const fetchSuperHero = (ctx) => {
  return axios.get(`http://localhost:4000/superheroes/${ctx.queryKey[1]}`)
}

const DynamicParallelPage = ({heroIds}) => {
  const res = useQueries(
    heroIds.map((id) => ({
      queryKey: ['super-hero', id],
      queryFn: fetchSuperHero
    }))
  )

  console.log({res})

  return <div>parallel</div>
}

export default DynamicParallelPage
