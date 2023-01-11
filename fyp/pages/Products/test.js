{Object.keys(products).map((item) => (
    <Link
      key={products[item]._id}
      href={`/products/${products[item].slug}`}
    >
      <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg shadow-green-900 m-5 ">
        <a className="block rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="m-auto block"
            src={products[item].img}
          />
        </a>
        <div className="mt-4 text-center md:text-left">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {products[item].category}
          </h3>
          <h2 className="text-white title-font text-lg font-medium">
            {products[item].title}
          </h2>
          <p className="mt-1">${products[item].price}</p>
          <div className="mt-2">
            {/* {console.log(products[item].size)} */}
            {products[item].size.includes("S") && (
              <span className="border rounded border-green-300 mx-1 p-1">
                S
              </span>
            )}
            {products[item].size.includes("M") && (
              <span className="border rounded border-green-300 mx-1 p-1">
                M
              </span>
            )}
            {products[item].size.includes("L") && (
              <span className="border rounded border-green-300 mx-1 p-1">
                L
              </span>
            )}
            {products[item].size.includes("XL") && (
              <span className="border rounded border-green-300 mx-1 p-1">
                XL
              </span>
            )}
            {products[item].size.includes("XXL") && (
              <span className="border rounded border-green-300 mx-1 p-1">
                XXL
              </span>
            )}
          </div>
          <div className="mt-3">
            {products[item].color.map((color) => {
              if (color == "white")
                return (
                  <button
                    className={`border-2 hover:translate-y-1 border-gray-500 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none`}
                  ></button>
                );
              if (color == "black")
                return (
                  <button
                    className={`border-2 hover:translate-y-1 border-gray-500 bg-gray-500 ml-1 rounded-full w-6 h-6 focus:outline-none`}
                  ></button>
                );
              else
                return (
                  <button
                    className={`border-2 hover:translate-y-1 border-gray-500 ml-1 bg-${color}-700 rounded-full w-6 h-6 focus:outline-none`}
                  ></button>
                );
            })}
          </div>
        </div>
      </div>
    </Link>
  ))}