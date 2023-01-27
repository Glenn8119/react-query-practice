import {useState} from 'react'
import {Link} from 'react-router-dom'
import {
  useAddSuperHeroData,
  useSuperHeroesData
} from '../hooks/useSuperHeroesData'

const RQSuperHeroesPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const onSuccess = (data) => {
    console.log('executed after succeeded', {data})
  }

  const onError = (error) => {
    console.log('executed after encountering error', {error})
  }

  const {data, isLoading, isError, error, isFetching, refetch} =
    useSuperHeroesData(onSuccess, onError)

  const {mutate: addHero} = useAddSuperHeroData()

  const handleAddHeroClick = () => {
    addHero({name, alterEgo})
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      <div>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        )
      })}
    </>
  )
}

export default RQSuperHeroesPage
