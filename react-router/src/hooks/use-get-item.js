import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useGetItem = id => {
  const nav = useNavigate()
  const [todo, setTodo] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    fetch('http://localhost:3003/todos/' + id)
      .then(resp => {
        if (!resp.ok) throw new Error('Todo not found')
        return resp.json()
      })
      .then(todo => {
        setTodo([todo])
      })
      .catch(() => {
        nav('/task-not-found/' + id, { replace: true })
      })
      .finally(() => setIsLoading(false))
  }, [])

  return { todo, setTodo, isLoading }
}
