import {useInfiniteQuery} from 'react-query'
import axios from 'axios'

const fetchColors = ({pagaParams = 1}) => {
  return axios.get('http://localhost:4000/colors')
}

const InfiniteQueriesPage = () => {
  const {data, isLoading, isError, error} = useInfiniteQuery(
    ['colors'],
    fetchColors
  )

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>{error.message}</div>

  return (
    <>
      {/* {data?.data.map((color) => {
        return (
          <div key={color.id}>
            <h2>
              {color.id} {color.label}
            </h2>
          </div>
        )
      })} */}
      12
    </>
  )
}

export default InfiniteQueriesPage
