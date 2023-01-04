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
    name: "",
    email: "",
    address: "",
    areaPinCode: "",
    city: "",
    state: "",
    phone: "",
    areaPinCode: "",
    password: "",
    cpassword: "",
  });
  const router = useRouter();

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "UserName",
      errorMessage:
        "User Name sholud be 3-16 characters and shoud`t include any special character!",
      label: "UserName",
      pattern: "^[A-Za-z0-9 ]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "phone",
      type: "tel",
      placeholder: "Phone",
      errorMessage: "It should be a valid phone number!",
      label: "Phone",
      pattern: "^[0-9*]{11,12}$",
      required: true,
    },
    {
      id: 4,
      name: "areaPinCode",
      type: "tel",
      placeholder: "Area Pin Code",
      errorMessage: "Please, Enter a valid area pin code.",
      label: "Area Pin Code",
      pattern: "^[0-9*]{3,6}$",
      required: true,
    },
    {
      id: 5,
      name: "city",
      type: "text",
      placeholder: "City",
      errorMessage: "Please, Enter valid city name.",
      label: "City",
      pattern: "^[A-Za-z ]{3,16}$",
      required: true,
    },
    {
      id: 6,
      name: "state",
      type: "text",
      placeholder: "State",
      errorMessage: "Please, Enter valid state name.",
      label: "State",
      pattern: "^[A-Za-z ]{3,16}$",
      required: true,
    },
    {
      id: 7,
      name: "address",
      type: "text",
      placeholder: "Address",
      errorMessage: "Please, Enter valid address { city, state, country }.",
      label: "Address",
      pattern: "^[a-zA-Z0-9, ]{3,}$",
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
      // pattern: '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$',
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
  };

  const handelPinCode = async (event) => {
    /^[0-9]*$/.test(event.target.value)
      ? setValues({ ...Values, ["areaPinCode"]: event.target.value })
      : "";
    if (event.target.value.length == 5) {
      let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincodes`);
      let pinsJson = await pins.json();
      if (Object.keys(pinsJson).includes(event.target.value)) {
        setValues({
          ...Values,
          ["areaPinCode"]: event.target.value,
          ["city"]: pinsJson[event.target.value][1],
          ["state"]: pinsJson[event.target.value][0],
        });
      } else {
        setValues({
          ...Values,
          ["city"]: "",
          ["state"]: "",
        });
      }
    }
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
          name: "",
          email: "",
          address: "",
          areaPinCode: "",
          city: "",
          state: "",
          phone: "",
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
    <div className="min-h-screen flex items-start justify-center py-6 px-4 sm:px-6 lg:px-8  bg-gray-900">
      <Head>
        <title>Signup E-Store</title>
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
      <div className="max-w-md w-full space-y-8">
        <div>
        <Image
            className="mx-auto h-1/5 w-auto"
            src={"/logo.png"}
            alt="HSD"
            width={80}
            height={80}
          />
          <h2 className="mt-3 text-center text-3xl font-extrabold text-white">
            SignUp and create your account
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href={"/login"}>
              <p className="font-medium text-blue-600 hover:text-blue-500">
                Signin
              </p>
            </Link>
          </div>
        </div>

        <form className="mt-8 space-y-4" onSubmit={signup} method="POST">
          <div className="rouned-lg shadow-sm space-y-2">
            {inputs.map((input) => (
              <Inputs
                key={input.id}
                {...input}
                value={Values[input.name]}
                onChange={onChange}
                handelPinCode={handelPinCode}
              />
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <!-- Heroicon name: solid/lock-closed --> */}
                <svg
                  className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
