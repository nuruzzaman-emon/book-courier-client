import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../Layouts/HomeLayout/HomeLayout';
import Home from '../Pages/Home/Home';

const Router = createBrowserRouter([
    {
        path:"/",
        Component:HomeLayout,
        children:[
            {
                index:true,
                Component:Home
            }
        ]
    }
])
    

export default Router;