import * as React from "react";
import { Link } from "react-router-dom";
import { AuthState } from "../../auth/store/types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const Navbar = () => {
  const { isAuth, user } = useTypedSelector((store) => store.auth);
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Головна
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            {isAuth ? (
              <ul className="navbar-nav">
                 <li className="nav-item">
                 <Link className="nav-link" to="/pofile.php">
                    <img src={user?.image} alt="фото користувача" width="32" style={{borderRadius: "50%"}} />
                    {user?.email}
                  </Link>
                 </li>
                 <li className="nav-item">
                  <Link className="nav-link" to="/logout.php">
                    Вихід
                  </Link>
                 </li>
              </ul>
               ) : (
                <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/login.php">
                    Вхід
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register.php">
                    Реєстрація
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
