import React from "react";

const Policies = () => {
  const incentives = [
    {
      name: "Free shipping",
      imageSrc: "/icons/Shipping.png",
      description: "Free shipping on orders above PKR 2000/-",
    },
    {
      name: "Secure Payment",
      imageSrc: "/icons/card-security.png",
      description: "End-to-End encryption",
    },
    {
      name: "Customer Care",
      imageSrc: "/icons/Support.png",
      description: "Available 24/7 at +92 34-123-87654",
    },
  ];
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gray-50 px-6 py-10 sm:p-10">
            <div className="mx-auto max-w-xl lg:max-w-none">
              <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  We built our business on customer service
                </h2>
              </div>
              <div className="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-y-10 gap-x-8 sm:max-w-none lg:grid-cols-3">
                {incentives.map((incentive) => (
                  <div
                    key={incentive.name}
                    className="text-center sm:flex sm:text-left lg:block lg:text-center"
                  >
                    <div className="sm:flex-shrink-0">
                      <div className="flow-root">
                        <img
                          className="mx-auto h-16 w-16"
                          src={incentive.imageSrc}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        {incentive.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {incentive.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Policies;
