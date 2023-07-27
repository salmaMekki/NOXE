import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Movies from './Components/Movies/Movies';
import TvShows from './Components/TvShows/TvShows';
import People from './Components/People/People';
import Networks from './Components/Networks/Networks';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import { Route, Routes, useNavigate,Navigate } from "react-router-dom";
import Details from "./Components/Details/Details";
import { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';


function App() {
 
  const[userData,setUserData]=useState(null);
  let navigate=useNavigate();
  function savaUserData()
  {
    let encodedToken=localStorage.getItem('userToken');
    let decodedToken=jwtDecode(encodedToken);
    setUserData(decodedToken)
    console.log(decodedToken);
  }
  function logout(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login')

  }

  useEffect(() => {
    if(localStorage.getItem('userToken')!=null)
    {
      savaUserData();
    }
  }, [])

  function ProtectedRoute(props){
    if(localStorage.getItem('userToken')==null){
    return  <Navigate to={'/login'}/>
    }else{
     return props.children;
    }
  }
  
  return (
    <div className="App">
      <Navbar userData={userData} logout={logout}  />
      <div className="container">
        <Routes>
        <Route path="/" element={<Login savaUserData={savaUserData}/>}></Route>

          <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path="movies" element={<ProtectedRoute><Movies/></ProtectedRoute> }></Route>
          <Route path="tvshows" element={<ProtectedRoute><TvShows/></ProtectedRoute>}></Route> 
          <Route path="people" element={<ProtectedRoute><People/></ProtectedRoute>}></Route>
          <Route path="about" element={<ProtectedRoute><About/></ProtectedRoute>}></Route>
          <Route path="networks" element={<ProtectedRoute><Networks /></ProtectedRoute>}></Route>
          <Route path="details" element={<Details />}></Route>
          <Route path="login" element={<Login savaUserData={savaUserData}/>}></Route>
          <Route path="register" element={<ProtectedRoute><Register /></ProtectedRoute>}></Route>
          <Route path="logout" element={<Login savaUserData={savaUserData}/>}></Route>

          <Route path="*" element={<Notfound/>}></Route>
       


        </Routes>
      </div>
    </div>
  );
}

export default App;