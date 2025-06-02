import { useEffect, useState } from 'react'
import { debounce } from '../utils'

const filterTodos = debounce((phrase, todosSet, setNewTodosSet) => {
  if (typeof phrase === 'string' && phrase.trim())
    setNewTodosSet(todosSet.filter(t => t.title.includes(phrase)))
  else setNewTodosSet(todosSet)
}, 200)

export const useGetItems = (searchInput, sortTodos) => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filteredTodos, setFilteredTodos] = useState([...todos])

  useEffect(() => {
    setIsLoading(true)

    fetch('http://localhost:3003/todos')
      .then(data => data.json())
      .then(todos => {
        sortTodos ? todos.sort((t1, t2) => (t1.title < t2.title ? -1 : 0)) : todos
        setTodos(todos)
      })
      .finally(() => setIsLoading(false))
  }, [sortTodos])

  useEffect(() => {
    filterTodos(searchInput, todos, setFilteredTodos)
  }, [searchInput, todos])

  return { todos, filteredTodos, setTodos, isLoading }
}
