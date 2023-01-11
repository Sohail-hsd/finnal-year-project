import React from "react";

const NewCollections = () => {
  const products = [
    {
      id: 1,
      name: "Mens Shawl",
      category: "Shawls",
      href: "#",
      price: "RS 2000/-",
      imageSrc: "/Mens_Shawl.png",
      imageAlt: "",
    },
    {
      id: 2,
      name: "Womens Shawl",
      category: "Shawls",
      href: "#",
      price: "RS 2000/-",
      imageSrc: "/pexels-madison-inouye-1937336.jpg",
      imageAlt: "",
    },
    {
      id: 3,
      name: "Mens Shawl",
      category: "Shawls",
      href: "#",
      price: "RS 2000/-",
      imageSrc: "/scarves-g50690e937_1920.jpg",
      imageAlt: "",
    },
    {
      id: 3,
      name: "Mens Shawl",
      category: "Shawls",
      href: "#",
      price: "RS 2000/-",
      imageSrc: "/shirt.jpg",
      imageAlt: "",
    },
    // Add More products...
  ];
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between space-x-4">
            <h2 className="text-lg font-medium text-gray-900">
              New Collection
            </h2>
            <a
              href="#"
              className="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="object-cover object-center"
                  />
                  <div
                    className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <div className="w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                      View Product
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                  <h3>
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p>{product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCollections;
