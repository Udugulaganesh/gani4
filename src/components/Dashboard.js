import React, {useState} from 'react'
import axios from 'axios'
import APIChainingVisualization from './APIChainingVisualization'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userInput, setUserInput] = useState({title: '', body: ''})

  const getUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      )
      setUsers(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const createPost = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title: userInput.title,
          body: userInput.body,
          userId: users[0].id,
        },
      )
      setPosts(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const getComments = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id},
      )
      setComments(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard">
      <h1>API Chaining App</h1>
      <form>
        <input
          type="text"
          placeholder="Title"
          value={userInput.title}
          onChange={e => setUserInput({...userInput, title: e.target.value})}
        />
        <input
          type="text"
          placeholder="Body"
          value={userInput.body}
          onChange={e => setUserInput({...userInput, body: e.target.value})}
        />
        <button type="submit" onClick={createPost}>
          Create Post
        </button>
      </form>
      <button onClick={getUsers}>Get Users</button>
      <button onClick={getComments}>Get Comments</button>
      <APIChainingVisualization />
      {loading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error.message}</p> : null}
    </div>
  )
}
export default Dashboard