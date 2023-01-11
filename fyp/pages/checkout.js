import React, { useState, useEffect } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
import CartSummary from "../components/checkout/CartSummary";
import CheckoutFrom from "../components/checkout/CheckoutFrom";
import PaymentInfo from "../components/checkout/PaymentInfo";
import { TrashIcon } from "@heroicons/react/20/solid";

// import Link from 'next/link'
// import { loadStripe } from '@stripe/stripe-js'

const Checkout = ({
  cart,
  deleteFromCart,
  updateCart,
  calculateSubtotal,
  SubTotal,
  clearCart,
  user,
  getUser,
}) => {
  const [Cart, setCart] = useState({});
  const [Checkout, setCheckout] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    state: "",
    postalCode: "",
    phone: "",
    cart: {},
    SubTotal,
  });

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
    setCart(cart);
    setCheckout({ ...Checkout, ["SubTotal"]: SubTotal, ["cart"]: cart });
  }, [cart]);

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("cart") == "{}"
    ) {
      router.push("/");
    } else {
      // fetchUserInfo();
      calculateSubtotal();
    }
  }, []);
  const onChangeCheckout = (e) => {
    setCheckout({ ...Checkout, [e.target.name]: e.target.value });
    console.log(Checkout);
  };

  const handelDelete = (e, slug) => {
    e.preventDefault();
    deleteFromCart(slug);
  };

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
    // setCheckout({ ...Checkout, ["SubTotal"]: SubTotal, ["cart"]: cart });
    // console.log(Checkout)
    for (let i in Checkout) {
      if (Checkout[i].length == 0) {
        showTost("Please, Fill the form correctly!");
        return;
      }
    }

    if (cart && SubTotal) {
      console.log(Checkout);
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Payment/pre-payment`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(Checkout),
        }
      );
      response = await response.json();
      console.log(response);
      if (response.success === false && response.error) {
        showTost(response.error);
        console.log(response);
        if (response.cart && response.cart === "clear") {
          setTimeout(() => {
            // clearCart();
            // router.push("/");
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
    <>
      <Head>
        <title>Checkout - E-Store</title>
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
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-28">
          <CheckoutFrom
            onChangeCheckout={onChangeCheckout}
            Checkout={Checkout}
          />

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {Object.keys(Cart).map((slug) => (
                  // console.log(Cart[slug])

                  <li key={Cart[slug].slug} className="flex py-6 px-4 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={
                          Cart[slug].img.length < 40
                            ? "../Products/" + Cart[slug].img
                            : Cart[slug].img
                        }
                        alt={Cart[slug].name}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a
                              href={"#"}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {Cart[slug].name}
                            </a>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {Cart[slug].varient}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {Cart[slug].size}
                          </p>
                        </div>

                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            onClick={(e) => handelDelete(e, slug)}
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-red-500"
                          >
                            <span className="sr-only">Remove</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          PKR{" "}
                          <span className="text-green-500">
                            {Cart[slug].price}
                          </span>
                        </p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                          {Cart && (
                            <select
                              id="quantity"
                              name="quantity"
                              value={Cart[slug].qty}
                              onChange={(e) => updateCart(slug, e.target.value)}
                              className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value={0}>0</option>
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                            </select>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    Pkr {SubTotal}
                  </dd>
                </div>
                {/* <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                  </div> */}
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    (demo) Pkr 5.52
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    Pkr {SubTotal}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                  type="submit"
                  onClick={checkout_order}
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
          
          <PaymentInfo />
        </div>
      </div>
    </>
  );
};

export default Checkout;
