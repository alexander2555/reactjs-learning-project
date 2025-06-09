import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../fb'
import { debounce } from '../utils'

const filterTodos = debounce((phrase, todosSet, setNewTodosSet) => {
  if (typeof phrase === 'string' && phrase.trim())
    setNewTodosSet(todosSet.filter(t => t.title.includes(phrase)))
  else setNewTodosSet(todosSet)
}, 200)

export const useGetItems = (searchInput, sortTodos) => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredTodos, setFilteredTodos] = useState(todos)

  useEffect(() => {
    const itemsDBRef = ref(db, 'items')

    return onValue(itemsDBRef, snapshot => {
      const loadedTodos = Object.entries(snapshot.val() || {}).map(([id, { title }]) => {
        return { id, title }
      })

      setTodos(
        sortTodos
          ? loadedTodos.sort((t1, t2) => (t1.title < t2.title ? -1 : 0))
          : loadedTodos,
      )
      setIsLoading(false)
    })
  }, [sortTodos])

  useEffect(() => {
    filterTodos(searchInput, todos, setFilteredTodos)
  }, [searchInput, todos])

  return { todos, filteredTodos, isLoading }
}
