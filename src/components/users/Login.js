import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginData } from "./actionLogin";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginFn = async () => {
    const url = "http://localhost:4000/users/login";
    const obj = {};
    obj.email = email.current.value;
    obj.password = password.current.value;
    if (obj.email !== "" && obj.password !== "") {
      try {
        const response = await axios.post(url, obj);
        console.log(response);
        if (response.status === 200) {
          errorRef.current.textContent = "";
          dispatch(setLoginData(response.data));
          navigate("/");
        }
      } catch (err) {
        console.log(err);
        if (err.response.status === 404) {
          errorRef.current.textContent = "email or password incorrect";
        } else if (err.response.status === 401) {
          errorRef.current.textContent =
            "something went wrong, connect to our customer service..";
        }
      }
    } else {
      errorRef.current.textContent = "pls enter all values...";
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <div className="shadow col-md-4">
          <div className="card px-5 py-5">
            <div className="form-data text-center">
              <h3>Login:</h3>
              <div className="forms-inputs mb-4 text-center">
                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <input
                  className="w-75 p-1"
                  autoComplete="off"
                  type="text"
                  placeholder="e-mail"
                  ref={email}
                />
              </div>
              <div className="forms-inputs mb-4 text-center">
                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                <input
                  className="w-75 p-1"
                  autoComplete="off"
                  type="password"
                  placeholder="password"
                  ref={password}
                />
              </div>
              <div>
                <div className="text-center">
                  <p className="text-danger" ref={errorRef}></p>
                </div>
              </div>
              <div className="mb-3 text-center">
                <button className="login-btn btn btn-dark" onClick={loginFn}>
                  Login
                </button>
              </div>
              <div className="mb-3 text-center">
                <p>Forgot password?</p>
              </div>
              <div className="mb-3 text-center">
                <p>
                  Not user?{" "}
                  <Link
                    to="/signup"
                    style={{ color: "green", cursor: "pointer" }}
                  >
                    Sign Up.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
