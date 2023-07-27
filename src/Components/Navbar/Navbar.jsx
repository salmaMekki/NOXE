import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
export default function Navbar(props) {
  return (
    <>
      <nav className={`${styles.test} navbar navbar-expand-lg navbar-dark `}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bolder" to={"home"}>
            NOXE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {props.userData ? (
              <ul className="navbar-nav me-auto  mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="movies">
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="tvshows">
                    Tvshows
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="people">
                    People
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="networks">
                    Networks
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
            {props.userData ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <div className="socialMediaIcons d-flex align-items-center">
                  <i className="fa-brands fa-facebook me-2"></i>
                  <i className="fa-brands fa-spotify me-2"></i>
                  <i className="fa-brands fa-instagram me-2"></i>
                  <i className="fa-brands fa-youtube me-4"></i>
                </div>{" "}
                <li className="nav-item">
                  <a className="nav-link" onClick={props.logout}>
                    Logout
                  </a>
                </li>{" "}
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="register">
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
