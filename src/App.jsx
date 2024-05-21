import Header from "./Components/Header";
import LoginPage from "./Pages/LoginPage";
import Locals from "./Pages/Locals";
import ManageLocals from "./Pages/ManageLocals";
import Events from "./Pages/Events";
import ManageEvents from "./Pages/ManageEvents";
import ManageUsers from "./Pages/ManageUsers";
import EditEvent from "./Pages/EditEvent";
import EditLocal from "./Pages/EditLocal";
import LocalInfo from "./Pages/LocalInfo";
import EventInfo from "./Pages/EventInfo";
import ProtectedRoute from "./Components/ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (auth) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/wydarzenia"
          element={
            <ProtectedRoute user={user}>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wydarzenia-info"
          element={
            <ProtectedRoute user={user}>
              <EventInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/zarzadzaj-wydarzeniami"
          element={
            <ProtectedRoute user={user}>
              <ManageEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edytuj-wydarzenie"
          element={
            <ProtectedRoute user={user}>
              <EditEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/punkty-gastronomiczne"
          element={
            <ProtectedRoute user={user}>
              <Locals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/punkty-gastronomiczne-info"
          element={
            <ProtectedRoute user={user}>
              <LocalInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/zarzadzaj-punktami-gastronomicznymi"
          element={
            <ProtectedRoute user={user}>
              <ManageLocals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edytuj-punkt-gastronomiczny"
          element={
            <ProtectedRoute user={user}>
              <EditLocal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/zarzadzaj-uzytkownikami"
          element={
            <ProtectedRoute user={user}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={user ? <Events /> : <LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
