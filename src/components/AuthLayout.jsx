import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

// Authenticaiton of each layer of the website
// This component is designed to prevent the url navigation of the user as it is possible if the user is not authenticated and still is able to view the posts 
// Default authenticaiton here is assummed to be true 
function Protection({ children, authentication = true }) {
    const authStatus = useSelector((state) => state.auth.status);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        //If the person is saying that it is authenticated = (True), 
        // then is the authStatus says otherwise then the (authStatus = false) 
        // true && (false !== true)
        // true <= Finally
        // Then Final say of the authStatus therefore you navigate to the Login page 
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        }
        else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        // If the person says that it is not authenticated = (false),
        // But the authStatus says otherwise (authStatus = true)
        // true && (true !== false)
        // true <= finally

        // Then navigate to the home page since you are delusional that you aren't authenticated 

        setLoader(false);
        // This check will be done every time the authStatus or authentication is changed or if the person tries to navigate to some page 
    }, [authStatus, authentication, navigate])
    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protection