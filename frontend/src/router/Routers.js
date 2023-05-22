import React from "react"; 
import {Routes , Route ,Navigate} from 'react-router-dom'
import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import Admin from "../pages/Admin";
import About from "../pages/About";
import Gallery from "../pages/Gallery";
const Routers = () =>{
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element= {<Home/>} />
            <Route path='/tours' element= {<Tours/>} />
            <Route path='/tours/:id' element= {<TourDetails/>} />
            <Route path='/login' element= {<Login/>} />
            <Route path='/register' element= {<Register/>} />
            <Route path='/thank-you' element= {<ThankYou/>} />
            <Route path='/tours/search' element= {<SearchResultList/>} />
            <Route path='/admin' element= {<Admin/>} />
            <Route path='/about' element= {<About/>} />
            <Route path='/gallery' element= {<Gallery/>} />

        </Routes>
    );
};

export default Routers;