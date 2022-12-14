import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
import Image from "next/image";
import Inputs from "../components/Form/Input";

const Forgot = () => {
  const [forgetEmail, setForgetEmail] = useState("");
  const [Newpassword, setNewpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [Credentials, setCredentials] = useState({
    password: "",
    cpassword: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const forgotInput = {
    key: 2,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "It should be a valid email address!",
    label: "Email",
    required: true,
  };
  const CredentialsInputs = [
    {
      key: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
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
      pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$",
      required: true,
    },
  ];

  const onCredintialsChange = (event) => {
    setCredentials({ ...Credentials, [event.target.name]: event.target.value });
  };
  const forgetenPassword = async (event) => {
    event.preventDefault();
    console.log(forgetEmail);
    let data = { forgetEmail, sendMail: true };
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Account/forgot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      }
    );
    response = await response.json();
    console.log(response);
    if (response.success) {
      toast.success(
        "Password reset instructions is send to your email. Thank you!",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      toast.error("Sorry, Error Ouccer!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  };

  const resetPassword = async (event) => {
    event.preventDefault();
    if (Newpassword === cpassword) {
      console.log(Newpassword);
      let data = { forgetEmail, sendMail: false, Newpassword };
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Account/forgot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      response = await response.json();
      console.log(response);
      if (response.success) {
        toast.success("Your password is reset. Thank you!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push(`/login`);
      } else {
        toast.error("Sorry, Error Ouccer!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    }
  };

  return (
    <>
      <Head>
        <title>Forget Password</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
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
      <div className="flex min-h-full flex-col justify-center py-5 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src="logo.ico" alt="My Logo" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Forgot your password?
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href="/login">
              <p
                className="mx-2 font-medium text-indigo-600
                hover:text-indigo-500"
              >
                go back to login
              </p>
            </Link>
          </div>
          <p className="mt-6 text-center text-base text-gray-600">
            Don't fret! Just type in your email and we will send you a code to
            reset your password!
          </p>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              {/* Email Field  */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Terms and Conditions label */}
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-400 bg-gray-50 "
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-700 ">
                    I accept the
                    <a
                      className="mx-1 text-primary-600 dark:text-primary-500 font-medium hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              {/* Reset button */}
              <div>
                <button
                  type="submit"
                  className="hover:shadow-lg flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Reset Password
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;
