import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

const Registration = () => {
  const fullName = useRef();
  const mobile = useRef();
  const email = useRef();
  const password = useRef();
  const repassword = useRef();
  const errorRef = useRef();
  const [submitStatus, setSubmitstatus] = useState(false);

  const submitFn = async () => {
    const url = "http://localhost:4000/users/adduser";
    const tempObj = {};
    tempObj.userid = "user" + parseInt(Math.random());
    tempObj.name = fullName.current.value;
    tempObj.email = email.current.value;
    tempObj.mobile = mobile.current.value;
    tempObj.password = password.current.value;
    if (password.current.value === repassword.current.value) {
      const response = await axios.post(url, tempObj);
      if (response.status === 201) {
        setSubmitstatus(true);
      } else {
        errorRef.current.textContent = "Something went wrong!!";
      }
    } else {
      errorRef.current.textContent = "Error!! password mismatch...";
    }
  };

  return (
    <div>
      {submitStatus ? (
        <section id="" className="section-bg">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div className="col-12">
                <div className="alert alert-success" role="alert">
                  Successfully user created...
                </div>
                <Link to="/login" className="btn btn-dark">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Sign up
                        </p>

                        <form className="mx-1">
                          <div className="mb-4">
                            <div className="d-flex flex-row align-items-center">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  // id="form3Example1c"
                                  className="form-control"
                                  placeholder="Full Name*"
                                  ref={fullName}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="d-flex flex-row align-items-center">
                              <i className="fas fa-solid fa-phone fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  // id="form3Example2c"
                                  className="form-control"
                                  placeholder="Mobile No."
                                  ref={mobile}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="d-flex flex-row align-items-center">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="email"
                                  // id="form3Example3c"
                                  className="form-control"
                                  placeholder="Mail*"
                                  ref={email}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="d-flex flex-row align-items-center">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="password"
                                  // id="form3Example4c"
                                  className="form-control"
                                  placeholder="Password*"
                                  ref={password}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                // id="form3Example4cd"
                                className="form-control"
                                placeholder="Confirm password*"
                                ref={repassword}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="col-sm-10">
                              <p className="text-danger" ref={errorRef}></p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="button"
                              className="btn btn-primary btn-lg"
                              onClick={submitFn}
                            >
                              Register
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://png.pngtree.com/png-vector/20190616/ourmid/pngtree-mangroupchatting--flat-color-icon--vector-icon-banner-templa-png-image_1487500.jpg"
                          className="img-fluid"
                          alt="Sample"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Registration;
