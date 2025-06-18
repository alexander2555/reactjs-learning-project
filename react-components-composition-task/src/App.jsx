import { store } from './components/reduxConfig'
import { useEffect, useState } from 'react'

import { AppLayout } from './components/AppLayout'

export const App = () => {
  const [render, setRender] = useState(false)

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      console.log(store.getState())
      setRender(!render)
    })

    return () => unsubscribe()
  }, [render])

  return <AppLayout />
}
