import React from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter,RouterProvider,Outlet} from 'react-router-dom'
import Home from './pages/user/Home';
import Login from './components/userLogin'
import RegisterUser  from './components/userRegister';
import AdminHome from './pages/admin/Home'
import { Provider } from 'react-redux';
import store from './redux/app/store';  
import AdminLogin from './components/adminLogin';


const App = ()=>{
    return(
    <>
    <Provider store={store}>
    <Outlet/>
    </Provider>
    </>
    )
}

const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement:'',
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/login',
                element: <Login/>
            },
            {
                path:'/register',
                element:<RegisterUser/>

            },
            {
                path:'/admin',
                element:<AdminHome/>

            },
            {
                path:'/admin/login',
                element:<AdminLogin/>
            }
        ]
    }
])

const root = createRoot(document.getElementById('root'))
root.render(<RouterProvider router={appRouter}/> )