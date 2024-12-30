import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import authService from './services/auth';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  // Not a good practice to directly use the env variable 
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  const [logging, setLogging] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          console.log("No user found");
          dispatch(logout());
        }
      })
      // .catch((error) => console.log("Error in getting the user: ", error))
      .finally(() => setLogging(false))
  }, [])

  //Custom Rendering: A way to control the flow of the site
  // The logging state can be used to conditionally render parts of the component. For example, you might want to show a loading spinner or a log message based on whether logging is true or false.

  return !logging ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App
