import Header from "./Components/Header"
import LoginPage from "./Pages/LoginPage"
import Locals from "./Pages/Locals"
import ManageLocals from "./Pages/ManageLocals"
import Events from "./Pages/Events"
import ManageEvents from "./Pages/ManageEvents"
import ManageUsers from "./Pages/ManageUsers"
import EditEvent from "./Pages/EditEvent"
import EditLocal from "./Pages/EditLocal"
import LocalInfo from "./Pages/LocalInfo"
import EventInfo from "./Pages/EventInfo"

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={ <LoginPage/> }/>

        <Route path="/wydarzenia" element={
          <Events/>
        }/>
        <Route path="/wydarzenia-info" element={
          <EventInfo/>
        }/>
        <Route path="/zarzadzaj-wydarzeniami" element={
          <ManageEvents/>
        }/>
        <Route path="/edytuj-wydarzenie" element={
          <EditEvent/>
        }/>
        <Route path="/punkty-gastronomiczne" element={
          <Locals/>
        }/>
        <Route path="/punkty-gastronomiczne-info" element={
          <LocalInfo/>
        }/>
        <Route path="/zarzadzaj-punktami-gastronomicznymi" element={
          <ManageLocals/>
        }/>
        <Route path="/edytuj-punkt-gastronomiczny" element={
          <EditLocal/>
        }/>
        <Route path="/zarzadzaj-uzytkownikami" element={
          <ManageUsers/>
        }/>

        <Route path="/*" element={ <LoginPage/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
