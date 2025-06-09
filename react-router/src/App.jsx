import { useState, useEffect } from 'react'
import styles from './App.module.css'
import {
  Routes,
  Route,
  NavLink,
  Outlet,
  useParams,
  useNavigate,
  Navigate,
  useRoutes,
} from 'react-router-dom'

const LOADING_TIMEOUT = 1500

const db = {
  prodList: [
    { id: 1, name: 'mock1' },
    { id: 2, name: 'mock2' },
    { id: 3, name: 'mock3' },
  ],
  prods: {
    2: { id: 2, name: 'mock2', price: 100, amount: 42 },
    3: { id: 3, name: 'mock3', price: 300, amount: 4242 },
    1: { id: 1, name: 'mock1', price: 200, amount: 424242 },
  },
}
const fetchProdList = () => db.prodList
const fetchProd = id =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(db.prods[id])
    }, 1000)
  })

const Product = () => {
  const [prod, setProd] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    let isLoadingTimeout = false
    let isProdLoaded = false

    setTimeout(() => {
      isLoadingTimeout = true

      if (!isProdLoaded) navigate('/load-error', { replace: true })
    }, LOADING_TIMEOUT)

    fetchProd(params.id).then(loadedProd => {
      isProdLoaded = true

      if (!isLoadingTimeout) {
        if (!loadedProd) {
          navigate('/product-not-exists')
          return
        }
        setProd(loadedProd)
      }
    })
  }, [params.id, navigate])

  if (!prod) return null

  const { name, price, amount } = prod

  return (
    <div>
      Товар - {name}
      <div>кол-во - {amount}</div>
      <div>цена - {price}</div>
    </div>
  )
}
const MainPage = () => <div>Главная страница</div>
const Catalog = () => (
  <div>
    <h3>Каталог</h3>
    <ul>
      {fetchProdList().map(({ id, name }) => (
        <li key={id}>
          <NavLink to={'product/' + id}>{name}</NavLink>
        </li>
      ))}
    </ul>
    <Outlet />
  </div>
)
const Contacts = () => <div>Контакты</div>
const NotFound = () => <div>404</div>
const NotFoundProd = () => <div>Product Not found</div>
const LoadError = () => <div>Load error!</div>

const ExtLink = ({ to, children }) => (
  <NavLink to={to}>
    {({ isActive }) => (isActive ? <strong>{children}</strong> : children)}
  </NavLink>
)

export const App = () => {
  const routes = useRoutes([
    { path: '/', element: <MainPage /> },
    {
      path: '/catalog',
      element: <Catalog />,
      children: [
        { path: 'product/:id', element: <Product /> },
        { path: 'service/:id', element: <Product /> },
      ],
    },
    { path: '/contacts', element: <Contacts /> },
    { path: '/product-load-error', element: <ProductLoadError /> },
    { path: '/404', element: <NotFound /> },
    { path: '*', element: <Navigate to='/404' /> },
  ])
  return (
    <div className={styles.app}>
      <div>
        <h3>Меню</h3>
        <ul>
          <li>
            <ExtLink to='/'>Главная</ExtLink>
          </li>
          <li>
            <ExtLink to='/catalog'>Каталог</ExtLink>
          </li>
          <li>
            <ExtLink to='/contacts'>Контакты</ExtLink>
          </li>
        </ul>
      </div>
      {routes}
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/catalog' element={<Catalog />}>
          <Route path='product/:id' element={<Product />} />
          <Route path='service/:id' element={<Product />} />
        </Route>
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/load-error' element={<LoadError />} />
        <Route path='/product-not-exists' element={<NotFoundProd />} />
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/404' replace={true} />} />
      </Routes>
    </div>
  )
}
