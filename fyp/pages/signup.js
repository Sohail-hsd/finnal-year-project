import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const Inputs = ({
  key,
  errorMessage,
  onChange,
  label,
  handelPinCode,
  ...inputProps
}) => {
  const [Focus, setFocus] = useState("false");
  const onFocus = (e) => {
    setFocus("true");
  };
  return (
    <div className="flex flex-col mx-4">
      <label className="lab leading-7 text-sm text-left dark:text-gray-200 text-gray-400 font-semibold">
        {label}
      </label>
      {inputProps.name === "address" ? (
        <textarea
          {...inputProps}
          onChange={onChange}
          onBlur={onFocus}
          focused={Focus}
          className="infoInputs bg-gray-800 valid:border-green-500 valid:border-2 rounded-md text-base outline-none text-gray-300 py-1 my-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      ) : inputProps.name === "areaPinCode" ? (
        <input
          {...inputProps}
          onChange={handelPinCode}
          onBlur={onFocus}
          focused={Focus}
          className="infoInputs bg-gray-800 valid:border-green-500 valid:border-2 rounded-md text-base outline-none text-gray-300 py-1 my-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      ) : (
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={onFocus}
          focused={Focus}
          className="infoInputs bg-gray-800 valid:border-green-500 valid:border-2 rounded-md text-base outline-none text-gray-300 py-1 my-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      )}
      <span className="errMsg hidden  text-red-500 text-sm text-left  ">
        {errorMessage}
      </span>
    </div>
  );
};

const Signup = () => {
  const [Values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [Focus, setFocus] = useState("false");

  const router = useRouter();

  const onFocus = (e) => {
    setFocus("true");
  };

  const name = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      errorMessage:
        "User Name sholud be 3-16 characters and shoud`t include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z0-9 ]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "lastName",
      type: "text",
      placeholder: "last Name",
      errorMessage:
        "User Name sholud be 3-16 characters and shoud`t include any special character!",
      label: "Last Name",
      pattern: "^[A-Za-z0-9 ]{3,16}$",
      required: true,
    },
  ];

  const inputs = [
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email Address",
      required: true,
    },
    {
      key: 8,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password sholud be 3-16 characters and shoud include any 2 special character!",
      label: "Password",
      // pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$",
      required: true,
    },
    {
      key: 9,
      name: "cpassword",
      type: "password",
      placeholder: "Conform Password",
      errorMessage: "Password dose`t matched!",
      label: "Conform Password",
      pattern: Values.cpassword["password"],
      required: true,
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const onChange = (e) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
    console.log(Values)
  };

  const signup = async (event) => {
    event.preventDefault();
    try {
      console.log(Values);
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Account/signup`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Values),
        }
      );
      response = await response.json();
      if (response.status == true) {
        toast.success("Your account has been created!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setValues({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          cpassword: "",
        });
        setTimeout(() => {
          router.push("/login");
          // console.log(Values)
        }, 2000);
      } else if (response.status == false) {
        toast.error("Please try Again, With a valid email address", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log("Internal Server Error");
      toast.error("Please try Again", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Signup E-Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/logo.ico"
            alt="My Logo"
          />
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up to your account
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href="/login">
              <p
                className="mx-2 font-medium text-indigo-600
                hover:text-indigo-500"
              >
              Already have an account</p>
            </Link>
          </div>
        </div>

        <div className="mt-auto sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Icons */}
            <div className="mx-10 mt-4 mb-6 grid grid-cols-3 gap-4">
              {/* Facebook Icon */}
              <div>
                <a
                  href="#"
                  className=" hover:shadow-md inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              {/* Twitter Icon */}
              <div>
                <a
                  href="#"
                  className=" hover:shadow-md inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Twitter</span>
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>

              {/* Google Icon */}
              <div>
                <a
                  href="#"
                  className=" hover:shadow-md inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M3.064 7.51A9.996 9.996 0 0112 2c2.695 0 4.959.99 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123-.2.6-.314 1.24-.314 1.9 0 .66.114 1.3.314 1.9.786 2.364 2.99 4.123 5.595 4.123 1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 001.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045 0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 012 12c0-1.614.386-3.14 1.064-4.49z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Sign up Form */}
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={signup}
            >
              <div className="grid grid-cols-2 gap-6">
                {name.map((input) => (
                  <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                    <label
                      htmlFor="name"
                      className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                      {input.label}
                    </label>
                    <input
                      id={input.id}
                      name={input.name}
                      type={input.type}
                      autoComplete={input.placeholder}
                      required={input.required}
                      pattern={input.pattern}
                      onChange={onChange}
                      onBlur={onFocus}
                      focused={Focus}
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    />
                  </div>
                ))}
              </div>
              {inputs.map((input) => (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {input.label}
                  </label>
                  <div className="mt-1">
                    <input
                      id={input.id}
                      name={input.name}
                      type={input.type}
                      autoComplete="email"
                      required={input.required}
                      pattern={input.pattern}
                      onChange={onChange}
                      onBlur={onFocus}
                      focused={Focus}
                      className="infoInputs block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    <span className="errMsg hidden  text-red-500 text-sm text-left  ">
                      {input.errorMessage}
                    </span>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="hover:shadow-lg flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
