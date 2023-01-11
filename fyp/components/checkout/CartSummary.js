import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";

const CartSummary = ({ cart, deleteFromCart, updateCart }) => {
  const [Cart, setCart] = useState({});
  useEffect(() => {
    setCart(cart);
  }, [cart]);

  return (
    <>
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
                      // onClick={deleteFromCart(slug)}
                        type="button"
                        className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-red-500"
                      >
                        <span className="sr-only">Remove</span>
                        <TrashIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-1 items-end justify-between pt-2">
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      PKR{" "}
                      <span className="text-green-500">{Cart[slug].price}</span>
                    </p>

                    <div className="ml-4">
                      <label htmlFor="quantity" className="sr-only">
                        Quantity
                      </label>
                      <select
                        id="quantity"
                        name="quantity"
                        value={Cart[slug].qty}
                        onChange={(e) => updateCart(slug, e.target.value)}
                        className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                      </select>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
            <div className="flex items-center justify-between">
              <dt className="text-sm">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">$64.00</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Shipping</dt>
              <dd className="text-sm font-medium text-gray-900">$5.00</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Taxes</dt>
              <dd className="text-sm font-medium text-gray-900">$5.52</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <dt className="text-base font-medium">Total</dt>
              <dd className="text-base font-medium text-gray-900">$75.52</dd>
            </div>
          </dl>

          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <button
              type="submit"
              // onClick={Checkout(Checkout)}
              className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Confirm order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
