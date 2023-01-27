import {useInfiniteQuery} from 'react-query'
import axios from 'axios'
import {Fragment} from 'react'
import {useState} from 'react'

const fetchColors = ({pageParam = 1}) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

const InfiniteQueriesPage = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      // pages: Array of api responses, each response respresents two colors at a time
      if (pages.length < 4) {
        return pages.length + 1
      } else {
        return undefined
      }
    },
    refetchOnWindowFocus: false
  })

  const [count, setCount] = useState(0)

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>{error.message}</div>

  return (
    <>
      {data?.pages.map((group, i) => {
        return (
          <Fragment key={i}>
            {group.data.map((color) => {
              return (
                <h2 key={color.id}>
                  {color.id} {color.label}
                </h2>
              )
            })}
          </Fragment>
        )
      })}
      <div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          Load more
        </button>
        <button onClick={() => setCount(count + 1)} disabled={!hasNextPage}>
          count++
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetetching...' : null}</div>
    </>
  )
}

export default InfiniteQueriesPage
