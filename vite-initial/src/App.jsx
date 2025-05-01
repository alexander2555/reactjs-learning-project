import Logo from './assets/react.svg'
import './App.css'

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={Logo}
          className="App-logo"
          alt="logo"
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <span>{new Date().getFullYear()}</span>
      </header>
    </div>
  )
}
