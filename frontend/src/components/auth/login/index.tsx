import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const LoginPage = () => {
    useEffect(()=> {
        //console.log("Hello", process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID);
        const start = () => {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
                scope: ''
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    const responseGoogle=(response: GoogleLoginResponse | GoogleLoginResponseOffline) =>{
        console.log("Google response", response);
    }

    return (
      <>
        <h1>Login Page</h1>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID as string}
          buttonText="Вхід черег гугл"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          // cookiePolicy={'http://localhost:3000'}
        />
      </>
    );
}

export default LoginPage;