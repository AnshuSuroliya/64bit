import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../reducers/authReducer";
import "./NewAuth.css";

const NewAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailValid1, setEmailValid1] = useState(false);
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const [message4, setMessage4] = useState("");
  const [valid, setValid] = useState(true);
  const [valid1, setValid1] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rgExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const handleChange = (e) => {
    setData1({ ...data1, [e.target.name]: e.target.value });
    if (rgExp.test(e.target.value)) {
      setMessage("");
      setEmailValid(false);
    } else if (!rgExp.test(e.target.value)) {
      setMessage("Email must be like test@example.com");
      setEmailValid(true);
    } else {
      setMessage("");
    }
  };
  const regEx1 = /^[a-zA-Z.' ]{1,}$/;
  const handleChange1 = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
    if (regEx1.test(e.target.value)) {
      setMessage1("");
      setFirstNameValid(false);
    } else if (!regEx1.test(e.target.value)) {
      setMessage1("First Name contains alphabets");
      setFirstNameValid(true);
    } else {
      setMessage1("");
    }
  };
  const handleChange2 = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
    if (regEx1.test(e.target.value)) {
      setMessage2("");
      setLastNameValid(false);
    } else if (!regEx1.test(e.target.value)) {
      setMessage2("Last Name contains alphabets");
      setLastNameValid(true);
    } else {
      setMessage2("");
    }
  };

  const handleChange3 = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
    if (rgExp.test(e.target.value)) {
      setMessage3("");
      setEmailValid1(false);
    } else if (!rgExp.test(e.target.value)) {
      setMessage3("Email must be like test@example.com");
      setEmailValid1(true);
    } else {
      setMessage3("");
    }
  };
  const handleChange4 = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
    setValid1(
      /[a-z]/.test(e.target.value) &&
        /[A-Z]/.test(e.target.value) &&
        /[0-9]/.test(e.target.value) &&
        e.target.value.length >= 8
    );
    if (
      /[a-z]/.test(e.target.value) &&
      /[A-Z]/.test(e.target.value) &&
      /[0-9]/.test(e.target.value) &&
      e.target.value.length >= 8
    ) {
      setValid(true);
    } else setValid(false);
  };
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(data1));
    if (localStorage.getItem("success")) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(data2));
    console.log(localStorage.getItem("signup"));
    if (localStorage.getItem("signup") === "true") {
      setTimeout(() => {
        setIsSignUp(!isSignUp);
      }, 2000);
    }
  };
  const loginResponse = useSelector((state) => state.auth.loginData);
  const signupResponse = useSelector((state) => state.auth.user);

  return (
    <div className="mt-12">
      <div className={`cont ${isSignUp ? "s--signup" : ""}`}>
        <form className="form sign-in" onSubmit={handleSubmit1} method="POST">
          <h2 className="mb-20">Welcome back,</h2>
          <label>
            <span>Email</span>
            <input name="email" type="email" onChange={handleChange} />
          </label>
          <p className="text-sm text-red-400">{message}</p>
          <label>
            <span>Password</span>
            <input
              name="password"
              type="password"
              onChange={(e) =>
                setData1({ ...data1, [e.target.name]: e.target.value })
              }
            />
          </label>

          <button
            type="submit"
            className={`submit ${
              emailValid ? "opacity-50 btn cursor-not-allowed hover:none" : ""
            } `}
            disabled={emailValid}
          >
            Sign In
          </button>
          {loginResponse.success ? (
            <p className="text-green-600 mb-2">{loginResponse.message}</p>
          ) : (
            <p className="text-red-600 mb-2">{loginResponse.message}</p>
          )}
        </form>

        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h2>New here?</h2>
              <p>Sign up and discover a great amount of new opportunities!</p>
            </div>
            <div className="img__text m--in">
              <h2>One of us?</h2>
              <p>
                If you already have an account, just sign in. We've missed you!
              </p>
            </div>
            <div className="img__btn" onClick={toggleForm}>
              <span className="m--up">Sign Up</span>
              <span className="m--in">Sign In</span>
            </div>
          </div>
          <form className="form sign-up" onSubmit={handleSubmit2} method="POST">
            <h2>Time to Create Account,</h2>
            <label>
              <span>FirstName</span>
              <input name="firstName" type="text" onChange={handleChange1} />
            </label>
            <p className="text-sm text-red-400">{message1}</p>
            <label>
              <span>LastName</span>
              <input name="lastName" type="text" onChange={handleChange2} />
            </label>
            <p className="text-sm text-red-400">{message2}</p>
            <label>
              <span>Email</span>
              <input name="email" type="email" onChange={handleChange3} />
            </label>
            <p className="text-sm text-red-400">{message3}</p>
            <label>
              <span>Password</span>
              <input name="password" type="password" onChange={handleChange4} />
            </label>
            {valid1 ? (
              <div className="mt-2">
                <p className="text-xs text-green-500"></p>
              </div>
            ) : (
              <div className="mt-2">
                <p className="text-xs text-red-400">
                  Password should be at least 8 characters long and contain
                  lowercase letters, uppercase letters, and numbers.
                </p>
              </div>
            )}
            <button
              type="submit"
              className={`submit btn ${
                firstNameValid || lastNameValid || emailValid1 || !valid1
                  ? "opacity-50 btn cursor-not-allowed hover:none"
                  : ""
              } `}
              disabled={
                firstNameValid || lastNameValid || emailValid1 || !valid1
              }
            >
              Sign Up
            </button>
            {signupResponse.success ? (
              <p className="text-green-600 mb-2">{signupResponse.message}</p>
            ) : (
              <p className="text-red-600 mb-2">{signupResponse.message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAuth;
