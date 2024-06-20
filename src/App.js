import React from 'react';
import {RouterProvider} from 'react-router-dom';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (

          <RouterProvider router={router}/>

    );
};

export default App;