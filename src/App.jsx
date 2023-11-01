import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { EditPage } from './pages/EditPage'
import { RootPage } from './pages/RootPage'

import { FrigoProvider } from './store/frigo-context'
import { TestPage } from './pages/TestPage'

const route = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/edit',
        element: <EditPage />,
        children: [
          {
            path: ':id',
            element: <EditPage />
          }
        ]
      },
      {
        path: '/test',
        element: <TestPage />
      }
    ]
  }
])

function App () {
  return (
    <FrigoProvider>
      <RouterProvider router={route} />
    </FrigoProvider>
  )
}

export default App
