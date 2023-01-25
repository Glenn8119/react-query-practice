import {useQuery} from 'react-query'
import axios from 'axios'

const fetchUserByEmail = (email) => {
  return axios.get('http://localhost:4000/users/' + email)
}

const fetchCoursesByChannelId = (channelId) => {
  return axios.get('http://localhost:4000/channels/' + channelId)
}

const DependenQueriesPage = ({email}) => {
  // step 1
  const {data: user} = useQuery(['user', email], () => fetchUserByEmail(email))
  const channelId = user?.data.channelId

  // step 2
  useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId
  })

  return <div>DependenQueriesPage</div>
}

export default DependenQueriesPage
