import React, { useState } from "react";
import Carousel from "../components/twe/Carousel";

const Checkout1 = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-lg py-2 bg-gray-50 relative flex items-center w-full justify-between">
        <div className="px-6">
          <button
            className="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContentY"
            aria-controls="navbarSupportedContentY"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              className="w-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              />
            </svg>
          </button>
          <div
            className="navbar-collapse collapse grow items-center"
            id="navbarSupportedContentY"
          >
            <ul className="navbar-nav mr-auto flex flex-row">
           
              <li className="nav-item dropdown static">
                <a
                  className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out dropdown-toggle flex items-center whitespace-nowrap"
                  href="#"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  type="button"
                  id="dropdownMenuButtonY"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mega menu
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="caret-down"
                    className="w-2 ml-2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path
                      fill="currentColor"
                      d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                    />
                  </svg>
                </a>
                <div
                  className="dropdown-menu w-full mt-0 hidden shadow-lg bg-white absolute left-0 top-full"
                  aria-labelledby="dropdownMenuButtonY"
                >
                  <div className="px-6 lg:px-8 py-5">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-white text-gray-600">
                        <p className="block px-6 py-2 border-b border-gray-200 w-full uppercase font-semibold text-gray-700">
                          Lorem ipsum
                        </p>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Dolor sit
                        </a>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Amet consectetur
                        </a>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Cras justo odio
                        </a>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Adipisicing elit
                        </a>
                      </div>
                      <div className="bg-white text-gray-600">
                        <p className="block px-6 py-2 border-b border-gray-200 w-full uppercase font-semibold text-gray-700">
                          Explit voluptas
                        </p>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Perspiciatis quo
                        </a>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Cras justo odio
                        </a>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Laudant maiores
                        </a>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Provident dolor
                        </a>
                      </div>
                      <div className="bg-white text-gray-600">
                        <p className="block px-6 py-2 border-b border-gray-200 w-full uppercase font-semibold text-gray-700">
                          Iste quaerato
                        </p>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Cras justo odio
                        </a>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Est iure
                        </a>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Praesentium
                        </a>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Laboriosam
                        </a>
                      </div>
                      <div className="bg-white text-gray-600">
                        <p className="block px-6 py-2 border-b border-gray-200 w-full uppercase font-semibold text-gray-700">
                          Cras justo odio
                        </p>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Saepe
                        </a>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Vel alias
                        </a>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Sunt doloribus
                        </a>
                        <a
                          href="#!"
                          aria-current="true"
                          className="block px-6 py-2 w-full hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
                        >
                          Cum dolores
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Checkout1;
