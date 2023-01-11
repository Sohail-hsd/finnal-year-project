import React from "react";

const OurProducts = () => {
  const Hotproducts = [
    {
      id: 1,
      name: "Multiple Colors Scarves",
      price: "$149",
      imageSrc: "/scarves-g50690e937_1920.jpg",
      imageAlt: "TODO",
      href: "#",
    },
    {
      id: 2,
      name: "Wool Shawls",
      price: "$15",
      imageSrc: "/pexels-madison-inouye-1937336.jpg",
      imageAlt: "TODO",
      href: "#",
    },
    {
      id: 3,
      name: "Women Shawls",
      price: "$15",
      imageSrc: "/pexels-nati-14641430.jpg",
      imageAlt: "TODO",
      href: "#",
    },
    {
      id: 4,
      name: "Apple Watch",
      price: "$15",
      imageSrc: "/apple-watch.png",
      imageAlt: "TODO",
      href: "#",
    },
    //Add More products here
  ];

  return (
    <>
      {/* Heading Section */}
      <h1 className="my-6 text-center text-3xl font-bold capitalize text-gray-800  lg:text-4xl">
        Our Products
      </h1>
      <div className="flex items-center justify-center">
        <div className="flex items-center rounded-xl border border-blue-600 p-1 dark:border-blue-400">
          <button className=" rounded-xl  px-4 py-2 text-sm font-medium capitalize text-blue-600 transition-colors hover:bg-blue-600 hover:text-white md:py-2 md:px-12">
            Hot
          </button>
          <button className="focus:xl: mx-4 rounded-xl px-4 py-2 text-sm font-medium capitalize text-blue-600 transition-colors duration-300 hover:bg-blue-600 hover:text-white focus:outline-none md:mx-8 md:py-2 md:px-12">
            Trending Now
          </button>
          <button className="rounded-xl px-4 py-2 text-sm font-medium capitalize text-blue-600 transition-colors duration-300 hover:bg-blue-600 hover:text-white focus:outline-none md:py-2 md:px-12">
            New Arrival
          </button>
        </div>
      </div>

      {/* Hot Products Tab*/}
      <div className="my-10 bg-white" id="#Tab1">
        <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {Hotproducts.map((product) => (
              <div
                key={product.id}
                className="group relative border-r border-b border-gray-200 p-4 sm:p-6"
              >
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="pt-10 pb-4 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-4 text-base font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OurProducts;
