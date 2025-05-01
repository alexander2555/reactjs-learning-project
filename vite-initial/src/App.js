import { createElement } from 'react'
import Logo from './assets/react.svg'
import './App.css'

export const App = () => {
  return createElement(
    'div',
    { className: 'App' },
    createElement(
      'header',
      { className: 'App-header' },
      createElement('img', { src: Logo, className: 'App-logo', alt: 'logo' }),
      createElement(
        'p',
        null,
        'Edit ',
        createElement('code', null, 'src/App.js'),
        ' and save to reload.',
      ),
      createElement(
        'a',
        {
          className: 'App-link',
          href: 'https://reactjs.org',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'Learn React',
      ),
      createElement('span', null, new Date().getFullYear()),
    ),
  )
}
