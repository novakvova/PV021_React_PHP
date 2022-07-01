import * as React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from './Navbar';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const HomeLayout = () => {
    return (
      <GoogleReCaptchaProvider reCaptchaKey="6LcYWLcgAAAAAH0TFuOSADgIZvKtwDf6adcKt51E">
        <Navbar />
        <main>
          <div className="container">
            <Outlet />
          </div>
        </main>
      </GoogleReCaptchaProvider>
    );
}

export default HomeLayout;