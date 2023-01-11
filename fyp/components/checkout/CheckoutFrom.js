import React, { useState } from "react";

const CheckoutFrom = ({ onChangeCheckout, Checkout }) => {
  const [Focus, setFocus] = useState("false");

  const onFocus = (e) => {
    setFocus("true");
  };

  return (
    <>
      <div className="max-w-2xl lg:max-w-none">
        <h1 className="sr-only">Checkout</h1>

        <form>
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Contact information
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    onBlur={onFocus}
                    focused={Focus}
                    onChange={onChangeCheckout}
                    type="email"
                    id="email-address"
                    name="email"
                    autoComplete="email"
                    className=" infoInputs block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <span className="errMsg hidden  text-red-500 text-sm text-left  ">
                    It should be a valid email address!
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      onBlur={onFocus}
                      focused={Focus}
                      onChange={onChangeCheckout}
                      pattern="^[A-Za-z0-9 ]{3,16}$"
                      name="firstName"
                      type="text"
                      id="first-name"
                      autoComplete="given-name"
                      className=" infoInputs block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span className="errMsg hidden  text-red-500 text-sm text-left  ">
                      First Name sholud be 3-16 characters and shoud`t include
                      any special character!
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      onBlur={onFocus}
                      focused={Focus}
                      onChange={onChangeCheckout}
                      pattern="^[A-Za-z0-9 ]{3,16}$"
                      type="text"
                      id="last-name"
                      name="lastName"
                      autoComplete="family-name"
                      className=" infoInputs block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span className="errMsg hidden  text-red-500 text-sm text-left  ">
                      Last Name sholud be 3-16 characters and shoud`t include
                      any special character!
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      onBlur={onFocus}
                      focused={Focus}
                      onChange={onChangeCheckout}
                      pattern="^[a-zA-Z0-9, ]{3,}$"
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="street-address"
                      className=" infoInputs block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span className="errMsg hidden  text-red-500 text-sm text-left  ">
                      Please, Enter valid address.
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apartment, suite, etc.
                  </label>
                  <div className="mt-1">
                    <input
                      onBlur={onFocus}
                      focused={Focus}
                      onChange={onChangeCheckout}
                      pattern="^[a-zA-Z0-9, ]{3,}$"
                      type="text"
                      name="apartment"
                      id="apartment"
                      className=" infoInputs block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span className="errMsg hidden  text-red-500 text-sm text-left  ">
                      Please, Enter valid Apartment address.
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      onBlur={onFocus}
                      focused={Focus}
                      onChange={onChangeCheckout}
                      pattern="^[A-Za-z]{3,16}$"
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="infoInputs block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span className="errMsg hidden  text-red-500 text-sm text-left  ">
                      Please, Enter valid city name.
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      onBlur={onFocus}
                      focused={Focus}
                      onChange={onChangeCheckout}
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      pattern="^[A-Za-z]{3,30}$"
                      className=" infoInputs block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Select Country</option>
                      <option>Pakistan</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                    <span className={`errMsg  ${Checkout.country == 'Select Country' || "" ? '' : 'hidden'}  text-red-500 text-sm text-left `}>
                      Please, Select your country.
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      onBlur={onFocus}
                      focused={Focus}
                      onChange={onChangeCheckout}
                      pattern="^[A-Za-z]{3,16}$"
                      type="text"
                      name="state"
                      id="state"
                      autoComplete="address-level1"
                      className=" infoInputs block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span className="errMsg hidden  text-red-500 text-sm text-left  ">
                      Please, Enter valid state name.
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      onBlur={onFocus}
                      focused={Focus}
                      onChange={onChangeCheckout}
                      pattern="^[0-9*]{3,6}$"
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      autoComplete="postalCode"
                      className=" infoInputs block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span className="errMsg hidden  text-red-500 text-sm text-left  ">
                      Please, Enter a valid area postal / pin code.
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      onBlur={onFocus}
                      focused={Focus}
                      onChange={onChangeCheckout}
                      pattern="^[0-9*]{11,12}$"
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className=" infoInputs block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span className="errMsg hidden  text-red-500 text-sm text-left  ">
                      It should be a valid phone number!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutFrom;
