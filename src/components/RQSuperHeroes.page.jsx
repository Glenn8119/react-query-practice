import {Link} from 'react-router-dom'
import useSuperHeroesData from '../hooks/useSuperHeroesData'

const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log('executed after succeeded', {data})
  }

  const onError = (error) => {
    console.log('executed after encountering error', {error})
  }

  const {data, isLoading, isError, error, isFetching, refetch} =
    useSuperHeroesData(onSuccess, onError)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        )
      })}
      {/* {data.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))} */}
    </>
  )
}

export default RQSuperHeroesPage
