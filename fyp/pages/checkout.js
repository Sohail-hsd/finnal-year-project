import React, { useState, useEffect } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
// import Link from 'next/link'
// import { loadStripe } from '@stripe/stripe-js'

const Checkout = ({
  cart,
  removeFromCart,
  addToCart,
  calculateSubtotal,
  SubTotal,
  clearCart,
  user,
  getUser,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [address, setAddress] = useState("");
  const [errMsg, seterrMsg] = useState("");

  const router = useRouter();

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Account/getUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        }
      );
      response = await response.json();
      if (response.data && response.userInfo) {
        console.log(response);
        setName(response.data.UserName);
        setEmail(response.data.Email);
        setAddress(response.userInfo.address);
        setPhone(response.userInfo.phone);
        setPin(response.userInfo.areaPinCode);
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincodes`);
        let pinsJson = await pins.json();
        if (Object.keys(pinsJson).includes(pin)) {
          setCity(pinsJson[pin][0]);
          setState(pinsJson[pin][1]);
        }
      }
    }
  };

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("cart") == "{}"
    ) {
      router.push("/");
    } else {
      fetchUserInfo();
      calculateSubtotal();
    }
  }, []);

  const showTost = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handelPinCode = async (event) => {
    /^[0-9]*$/.test(event.target.value) ? setPin(event.target.value) : "";
    if (event.target.value.length == 5) {
      let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincodes`);
      let pinsJson = await pins.json();
      if (Object.keys(pinsJson).includes(event.target.value)) {
        setCity(pinsJson[event.target.value][0]);
        setState(pinsJson[event.target.value][1]);
      } else {
        setCity("");
        setState("");
      }
    } else {
      setCity("");
      setState("");
    }
  };

  // let values = { email, name, phone, district, state, pin, address, cart, SubTotal }
  // console.log(values)
  const checkout_order = async (event) => {
    event.preventDefault();
    if (!SubTotal) {
      calculateSubtotal();
    }

    if (
      email.length >= 10 &&
      name.length >= 3 &&
      phone &&
      district.length >= 3 &&
      state.length >= 4 &&
      pin.length >= 4 &&
      address.length >= 10 &&
      cart &&
      SubTotal
    ) {
      if (phone.length < 11) {
        showTost("Phone number must be 11 degits.");
        return;
      }
      let orderID = Math.floor(Math.random() * Date.now());
      const data = {
        email,
        name,
        phone,
        district,
        state,
        pin,
        address,
        cart,
        SubTotal,
        orderID,
      };
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Stripe/preTranscation`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      response = await response.json();
      console.log(response);
      if (response.success === false && response.error) {
        showTost(response.error);
        console.log(response);
        if (response.cart && response.cart === "clear") {
          setTimeout(() => {
            clearCart();
            router.push("/");
          }, 5000);
        }
      }
      if (response.status === "Paid" || response.status === "Pending") {
        toast.success("Order Placed. Thank you!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        clearCart();
        router.push(`/order/?id=${response.orderid}`);
      }
    } else {
      toast.error("Please, fill the from correctly.", {
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

  return (
    <div>
      <Head>
        <title>Checkout - E-Store</title>
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
      <section className="min-h-screen flex text-gray-400 font-semibold bg-gray-900 body-font">
        <div className="container px-5 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-1/2 md:w-1/2 flex flex-col w-full md:py-8 mt-8 md:mt-0">
            <div
              className="absolute text-sm text-center px-96 font-bold title-font bg-gradient-to-r bg-clip-text  text-transparent 
            from-red-400 via-red-600 to-red-700
            animate-text title-font'"
            >
              {errMsg ? errMsg : ""}
            </div>

            <h2 className="text-white text-3xl mb-5 font-bold title-font">
              Checkout
            </h2>
            <h2 className="text-white text-lg mb-1 font-medium title-font">
              1. Delivery Detials
            </h2>
            <p className="leading-relaxed mb-5">
              Fill the following detials to delivery your order.
            </p>

            <form method="POST" onSubmit={checkout_order}>
              {/* Name and email */}

              <div className="relative mb-4 flex space-x-4 items-center">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-400 font-semibold"
                >
                  Name
                </label>
                <input
                  value={user !== null ? user.name : name}
                  disabled
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  id="name"
                  placeholder="Name"
                  name="name"
                  className="w-1/2 bg-gray-800 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />

                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-400 font-semibold"
                >
                  email
                </label>
                <input
                  value={user !== null ? user.email : email}
                  disabled
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="email@gmail.com"
                  id="email"
                  name="email"
                  className="w-1/2 bg-gray-800 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* phone and pin */}

              <div className="relative mb-4 flex space-x-4 items-center">
                <label
                  htmlFor="phone"
                  className="leading-7 text-sm text-gray-400 font-semibold"
                >
                  phone
                </label>
                <input
                  value={phone}
                  onChange={(event) =>
                    /^[0-9]*$/.test(event.target.value)
                      ? setPhone(event.target.value)
                      : ""
                  }
                  type="tel"
                  id="phone"
                  placeholder="+92 ----------"
                  phone="phone"
                  className="w-1/2 bg-gray-800 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />

                <label
                  htmlFor="pincode"
                  min="1"
                  max="5"
                  className="leading-7 text-sm text-gray-400 font-semibold"
                >
                  pin
                </label>
                <input
                  value={pin}
                  onChange={handelPinCode}
                  type="tel"
                  placeholder="pin Code"
                  id="pincode"
                  name="pincode"
                  className="w-1/2 bg-gray-800 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* state and district. */}

              <div className="relative mb-4 flex space-x-4 items-center">
                <label
                  htmlFor="state"
                  className="leading-7 text-sm text-gray-400 font-semibold"
                >
                  state
                </label>
                <input
                  value={state}
                  disabled
                  // onChange={(event) => setState(event.target.value)}
                  type="text"
                  id="state"
                  placeholder="state (Albany)"
                  state="state"
                  className="w-1/2 bg-gray-800 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  readOnly={false}
                />

                <label
                  htmlFor="district"
                  className="leading-7 text-sm text-gray-400 font-semibold"
                >
                  district
                </label>
                <input
                  value={district}
                  disabled
                  // onChange={(event) => setCity(event.target.value)}
                  type="text"
                  id="district"
                  placeholder="district (New Yark)"
                  name="district"
                  className="w-1/2 bg-gray-800 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  readOnly={false}
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="address"
                  className="leading-7 text-sm text-gray-400 font-semibold"
                >
                  address
                </label>
                <input
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  type="address"
                  id="address"
                  placeholder="address"
                  name="address"
                  className="w-full bg-gray-800 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                className="item-center text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg disabled:bg-green-300"
                type="submitt"
                onClick={checkout_order}
                disabled={
                  name &&
                  email &&
                  phone &&
                  district &&
                  pin &&
                  address &&
                  cart !== "{}"
                    ? false
                    : true
                }
              >
                Pay,
                <span
                  className={`${!SubTotal ? "text-red-500 font-bold" : ""}`}
                >
                  
                  ${SubTotal}
                </span>
              </button>
            </form>
            {/* Review Cart Items */}

            {/* <button className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg" type='submitt'>Submitt</button> */}

            <p className="text-xs text-gray-400 font-semibold text-opacity-90 mt-3">
              Your Order will deliver to you, Soon!
            </p>
          </div>

          <div className="mt-24 md:w-auto w-full md:ml-auto">
            <h2 className="flex text-white text-lg mb-1 font-medium title-font">
              2. Reviews Cart Items
            </h2>
            <div className="cart text-black bg-green-200 px-5 py-2 mb-3 md:h-[45vh] md:w-[550px] rounded-md overflow-auto">
              <ol className="font-semibold list-decimal md:ml-2">
                {Object.keys(cart).length == 0 && (
                  <div className="my-4 font-semibold">Your Cart is Empty</div>
                )}

                {Object.keys(cart).map((item) => (
                  <li key={item}>
                    <div className="item flex my-5">
                      <div className="w-2/3 font-semibold">
                        {cart[item].name} ({cart[item].varient}/
                        {cart[item].size})
                      </div>
                      <div className="icon  flex justify-center items-center w-1/3 text-xl space-x-2">
                        <AiFillMinusCircle
                          className="cursor-pointer"
                          onClick={() =>
                            removeFromCart(
                              item,
                              cart[item].name,
                              cart[item].prise,
                              cart[item].size,
                              cart[item].varient,
                              1
                            )
                          }
                        />
                        <span className="font-bold text-2xl">
                          {cart[item].qty}
                        </span>
                        <AiFillPlusCircle
                          className="cursor-pointer"
                          onClick={() =>
                            addToCart(
                              item,
                              cart[item].name,
                              cart[item].prise,
                              cart[item].size,
                              cart[item].varient,
                              1
                            )
                          }
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            {/* SubTotal */}

            <div className="overflow-visible sticky top-0">
              <hr className="h-0 my-2 border border-solid border-t-0 border-gray-700 opacity-25" />
              {SubTotal != 0 && (
                <div className="sub-SubTotal">
                  <h3 className="font-semibold">
                    Total Price :
                    <span className="font-bold text-white">{SubTotal} $</span>
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
