import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  let [errorMsg, setErrorMsg] = useState("");
  let [loading, setLoading] = useState(false);
  let [errorsList, setErrorsList] = useState([]);
  const navigate = useNavigate();

  async function formSubmition(e) {
    e.preventDefault();
    setLoading(true);
    let validateResponse = validationForm();
    if (validateResponse.error) {
      setErrorsList(validateResponse.error.details);
    } else {
      let { data } = await axios.post(
        "https://route-movies-api.vercel.app/signin",
        user
      );
      console.log(data);
      if (data.message == "success") {
        localStorage.setItem("userToken", data.token);
        props.savaUserData();

        goToHome();
      } else {
        setErrorMsg(data.message);
      }
      setLoading(false);
    }
  }
  function getInfo(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(myUser);
  }
  function goToHome() {
    navigate("/home");
  }
  function validationForm() {
    const schema = Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
        .required()
        .pattern(/^[a-z][0-9]{3}$/),
    });
    return schema.validate(user, { abortEarly: false });
  }
  function getCurrentErr(name) {
    for (const error of errorsList) {
      if (error.context.key === name) {
        return error.message;
      }
    }
    return "";
  }

  return (
    <>
      <div className="row m-5 w-75 mx-auto">
        <h2>Login Form</h2>
        {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}

        <form onSubmit={formSubmition}>
          <div className="input-gp">
            <label htmlFor="email" className="mb-1">
              email :
            </label>
            <input
              onChange={getInfo}
              type="text"
              name="email"
              className="form-control mb-2"
            />
            {getCurrentErr("email").length == 0 ? (
              ""
            ) : (
              <div className="alert alert-danger">{getCurrentErr("email")}</div>
            )}
          </div>

          <div className="input-gp">
            <label htmlFor="password" className="mb-1">
              password :
            </label>
            <input
              onChange={getInfo}
              type="text"
              name="password"
              className="form-control mb-2"
            />
            {getCurrentErr("password").length == 0 ? (
              ""
            ) : (
              <div className="alert alert-danger">
                {getCurrentErr("password")}
              </div>
            )}
          </div>
          <div className="input-gp d-flex align-items-end flex-column mt-3">
            <button className="btn btn-info text-white " type="submit">
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
