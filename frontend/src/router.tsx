import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import Play from './pages/Play'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/play',
        element: <Play/>
      }
    ]
  }
])

export default router