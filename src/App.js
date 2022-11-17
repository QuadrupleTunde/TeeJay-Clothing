import Home from "./components/routes/home/home.component";
import { Route, Routes,} from 'react-router-dom'
import Navigation from "./components/routes/navigation/navigation.component.jsx";
import Authentication from "./components/routes/authentication/authentication.component";
import Shop from "./components/shop/shop.component";


import React from 'react'


function App() {
  
    return (
    <div>
      <Routes>
          <Route path='/' element={<Navigation/>}>
            <Route index element={<Home/>}/>
            <Route path='shop' element={<Shop/>}/>
            <Route path='auth' element={<Authentication/>}/>
          </Route>  
      </Routes>
      
    </div>
  );
}

export default App;
