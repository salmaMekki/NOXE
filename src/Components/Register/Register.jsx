import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
export default function Register() {
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });
  let [errorMsg, setErrorMsg] = useState("");
  let [errorsList, setErrorsList] = useState([]);
  let [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  function goToLogin() {
    navigate("/login");
  }
  function validateForm() {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().required().min(3).max(10),
      last_name: Joi.string().alphanum().required().min(3).max(10),
      age: Joi.number().required().min(20).max(80),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
        .required()
        .pattern(new RegExp(/^[a-z][0-9]{3}$/)),
    });
    return schema.validate(user, { abortEarly: false });
  }

  async function submitFormDtata(e) {
    e.preventDefault();
    setLoading(true);
    let validateResponse = validateForm();
    if (validateResponse.error) {
      setErrorsList(validateResponse.error.details);
    } else {
      let { data } = await axios.post(
        "https://route-movies-api.vercel.app/signup",
        user
      );
      if (data.message == "success") {
        goToLogin();
      } else {
        setErrorMsg(data.message);
      }
    }
    setLoading(false);
  }

  function getFormValue(e) {
    setErrorsList([]);
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
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
        <h2>Registeration Form</h2>

        {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
        <form onSubmit={submitFormDtata}>
          <div className="input-gp">
            <label htmlFor="first_name" className="mb-1">
              First name :
            </label>
            <input
              onChange={getFormValue}
              type="text"
              name="first_name"
              className="form-control mb-2"
            />
            {getCurrentErr("first_name").length == 0 ? (
              ""
            ) : (
              <div className="alert alert-danger">
                {getCurrentErr("first_name")}
              </div>
            )}
          </div>

          <div className="input-gp">
            <label htmlFor="last_name" className="mb-1">
              Last name :
            </label>
            <input
              onChange={getFormValue}
              type="text"
              name="last_name"
              className="form-control mb-2"
            />
            {getCurrentErr("last_name").length == 0 ? (
              ""
            ) : (
              <div className="alert alert-danger">
                {getCurrentErr("last_name")}
              </div>
            )}
          </div>
          <div className="input-gp">
            <label htmlFor="age" className="mb-1">
              Age :
            </label>
            <input
              onChange={getFormValue}
              type="number"
              name="age"
              className="form-control mb-2"
            />
            {getCurrentErr("age").length == 0 ? (
              ""
            ) : (
              <div className="alert alert-danger">{getCurrentErr("age")}</div>
            )}
          </div>
          <div className="input-gp">
            <label htmlFor="email" className="mb-1">
              Email :
            </label>
            <input
              onChange={getFormValue}
              type="email"
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
              Password :
            </label>
            <input
              onChange={getFormValue}
              type="password"
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
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
