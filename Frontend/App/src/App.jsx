
import './App.css'
import Expenses_form from './components/expenses_form/expenses_form'
import Login from './components/login/login'
import Signup from './components/signup/signup'
import  {createBrowserRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
function App() {

  const router = createBrowserRouter([
    {index: true, element: <Login /> },
    {path: '/login', element: <Login/>},
    {path: '/signup', element: <Signup/>},
    {path: '/form', element: <Expenses_form/>}

  ]);




  return (
    <>
      <RouterProvider router={router}/>

    </>
  )
}

export default App
