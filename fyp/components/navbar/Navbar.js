import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BsFillCartFill,
  BsFillBagCheckFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Search from "../twe/Search";
import DropDown from "./DropDown";

const Navbar = ({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  SubTotal,
  user,
  logOut,
  calculateSubtotal,
}) => {
  const ref = useRef();
  const [dropDown, setdropDown] = useState(false);
  const [notification, setNotification] = useState(false);
  const [sideCart, setSideCart] = useState(false);
  const [Links, setLinks] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    // Object.keys(cart).length !== 0 && setSideCart(true)
    let exempted = ["/checkout", "/orders", "/orders", "/account", "/"];
    if (exempted.includes(router.pathname)) {
      setSideCart(false);
    }
    if (!SubTotal) {
      calculateSubtotal();
    }
  }, []);

  const logout = () => {
    toast.success("Your are Successfully LogOut!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      logOut();
    }, 1000);
  };

  const activeCart = () => {
    setSideCart(!sideCart);
  };

  return (
    <div
      className={`prisim  z-30 flex flex-col items-center justify-center md:flex-row md:justify-start   shadow-md shadow-[#34251F] overflow-visible sticky top-0 ${
        !sideCart && "overflow-hidden"
      } `}
    >
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
      <div className="logo mx-5 ">
        <Link href={"/"}>
          <Image
            className="transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-150"
            src={"/logo.png"}
            width={80}
            height={80}
          />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 mt-3 font-bold md:text-md px-10   text-[#34251F]">
          <div>
            <DropDown />
          </div>
          <Link href={"/Products/tshirts"}>
            <p className="transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-150 hover:text-blue-400">
              <li>T-Shirts</li>
            </p>
          </Link>
          <Link href={"/Products/hoodies"}>
            <p className="transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-150 hover:text-blue-400">
              <li>Hoodies</li>
            </p>
          </Link>
          <Link href={"/Products/stickers"}>
            <p className="transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-150 hover:text-blue-400">
              <li>Stickers</li>
            </p>
          </Link>
          <Link href={"/Products/mugs"}>
            <p className="transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-150 hover:text-blue-400">
              <li>Mugs</li>
            </p>
          </Link>
        </ul>
      </div>

      <div className="top-7 px-7 font-bold md:text-md   text-[#34251F]">
        <Search />
      </div>

      <div
        ref={ref}
        className="cart space-x-2 items-center flex absolute right-0 top-7 mx-5 text-blue-300 cursor-pointer"
      >
        {/* Notification */}

        {user.status && (
          <>
            <span className="absolute z-10 right-16 -top-1 px-1  text-[#34251F] font-blod text-xs rounded-full bg-blue-400">
              2
            </span>
            <span
              onClick={() =>
                notification ? setNotification(false) : setNotification(true)
              }
            >
              {notification && (
                <div className="absolute rounded-md shadow-blue-200 shadow-sm bg-blue-200 right-16 top-6 w-56 p-4 py-4  text-[#34251F] ">
                  <span
                    onClick={() => setNotification(false)}
                    className="top-4 right-2 absolute text-2xl cursor-pointer text-red-700"
                  >
                    <AiFillCloseCircle />
                  </span>
                  <ul>
                    <li className=" py-1 text-lg hover:text-blue-600 font-bold flex flex-row">
                      Notification
                    </li>
                    <hr className="h-0 my-2 border border-solid border-t-0 border-gray-700 opacity-25" />
                    <li className="transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-150 py-1 text-sm hover:text-blue-600 font-bold">
                      Notifcation Box Is Empty
                    </li>
                  </ul>
                </div>
              )}

              {user.status && (
                <BsFillBellFill
                  onClick={() =>
                    notification
                      ? setNotification(false)
                      : setNotification(true)
                  }
                  className="text-xl md:text-2xl hover:text-blue-400   text-[#34251F] transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-150 cursor-pointer"
                />
              )}
            </span>
            <span
              onClick={() =>
                dropDown ? setdropDown(false) : setdropDown(true)
              }
            >
              {dropDown && (
                <div className="absolute rounded-md shadow-blue-200 shadow-sm bg-blue-200 right-7 top-6 w-56 p-4 py-4  text-[#34251F] ">
                  <span
                    onClick={() => setdropDown(false)}
                    className="top-4 right-2 absolute text-2xl cursor-pointer text-red-700"
                  >
                    <AiFillCloseCircle />
                  </span>
                  <ul>
                    <Link href={"/account"}>
                      <li className=" py-1 text-sm hover:text-blue-600 font-bold flex flex-row">
                        <img
                          className="p-0.5 w-10 h-10 rounded-full ring-2 ring-blue-700 dark:ring-blue-600"
                          src="2.webp"
                          alt="Bordered avatar"
                        />
                        <div className="pl-2">
                          <p className="text-sm text-gray-600">{user.name}</p>
                          <p className="text-xs text-gray-600">{user.email}</p>
                        </div>
                      </li>
                    </Link>
                    <hr className="h-0 my-2 border border-solid border-t-0 border-gray-700 opacity-25" />
                    <Link href={"/account"}>
                      <li className="transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-150 py-1 text-sm hover:text-blue-600 font-bold">
                        My Profile
                      </li>
                    </Link>
                    <Link href={"/orders"}>
                      <li className="transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-150 py-1 text-sm hover:text-blue-600 font-bold">
                        All Orders
                      </li>
                    </Link>
                    <Link href={"/Admin"}>
                      <li className="transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-150 py-1 text-sm hover:text-blue-600 font-bold">
                        Setting
                      </li>
                    </Link>
                    <li
                      onClick={logout}
                      className="transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-150 py-1 text-sm hover:text-blue-600 font-bold"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}

              {user.status && (
                <MdAccountCircle
                  onClick={() =>
                    dropDown ? setdropDown(false) : setdropDown(true)
                  }
                  className="text-xl md:text-2xl hover:text-blue-400   text-[#34251F] cursor-pointer transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-150"
                />
              )}
            </span>
          </>
        )}

        {!user.status || localStorage.getItem("token") == {} ? (
          <Link href={"/login"}>
            <button className="cursor-pointer text-xl border-2 border-white hover:border-cyan-800  text-[#34251F] rounded-md font-bold p-1 mx-2 transition ease-in-out hover:-translate-y-0.2 hover:scale-110 duration-150">
              Login
            </button>
          </Link>
        ) : (
          " "
        )}
        <BsFillCartFill
          onClick={activeCart}
          className="text-xl md:text-2xl hover:text-blue-400   text-[#34251F] transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-150"
        />
      </div>

      {/* SideBar (Cart) */}
      {Object.keys(cart).length > 0 && (
        <span className="absolute right-5 top-6 px-1  text-[#34251F] font-blod text-xs rounded-full bg-blue-400">
          {Object.keys(cart).length}
        </span>
      )}
      <div
        ref={ref}
        className={`cart overflow-y-auto w-72 h-[90vh] absolute top-0 bg-blue-200 px-8 py-10 rounded-md mt-14 transition-all ${
          sideCart ? "right-0" : "-right-96"
        } `}
      >
        <span
          onClick={activeCart}
          className="top-4 right-2 absolute text-2xl cursor-pointer text-red-700"
        >
          <AiFillCloseCircle />
        </span>
        <h2 className="font-bold text-2xl text-center">Shoping Cart</h2>
        <ol className="font-semibold list-decimal">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 font-semibold">Your Cart is Empty</div>
          )}

          {Object.keys(cart).map((item) => (
            <li key={item}>
              <div className="item flex my-5">
                <div className="w-2/3 ml-1 font-semibold">
                  {cart[item].name} / {cart[item].varient} ({cart[item].size})
                </div>
                <div className="icon  flex justify-center items-center w-1/3 text-xl space-x-2">
                  <AiFillMinusCircle
                    className="cursor-pointer"
                    onClick={() => removeFromCart(item, 1)}
                  />
                  <span className="font-bold text-2xl">{cart[item].qty}</span>
                  <AiFillPlusCircle
                    className="cursor-pointer"
                    onClick={() =>
                      addToCart(
                        item,
                        cart[item].name,
                        cart[item].prise,
                        cart[item].size,
                        cart[item].varient,
                        1,
                        cart[item].img
                      )
                    }
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* SubTotal */}

        {Object.keys(cart).length != 0 && (
          <div className="sub-total">
            <h3 className="font-semibold">
              Total Price : <span className="font-bold">{SubTotal} </span>$
            </h3>
          </div>
        )}

        {Object.keys(cart).length != 0 && (
          <div className="flex mt-5">
            <Link href={user.status ? "/checkout" : "/login"}>
              <button
                onClick={activeCart}
                className="flex mr-2 text-[#34251F] font-bold bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-sm"
              >
                Checkout <BsFillBagCheckFill className="mt-1 ml-2" />
              </button>
            </Link>
            <button
              disabled={Object.keys(cart).length == 0 ? true : false}
              onClick={() => {
                clearCart();
                setSideCart(false);
                return;
              }}
              className="cursor-pointer flex mr-2   text-[#34251F] font-bold bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-sm disabled:bg-blue-400"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
