import React from "react";

const Newsletter = () => {
  return (
    <>
      {/* Newsletter Section */}
      <section
        className="lg:py8 mx-auto max-w-md py-24 px-4 sm:max-w-3xl sm:px-6 lg:flex lg:max-w-7xl lg:items-center lg:px-12"
        aria-labelledby="newsletter-heading"
      >
        <div className="lg:w-0 lg:flex-1">
          <h2
            className="text-blue-gray-900 text-3xl font-bold tracking-tight sm:text-4xl"
            id="newsletter-heading"
          >
            Sign up for our newsletter
          </h2>
          <p className="text-blue-gray-500 mt-3 max-w-3xl text-lg">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat.
          </p>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8">
          <form className="sm:flex">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email-address"
              type="email"
              autoComplete="email"
              required
              className="border-blue-gray-300 placeholder-blue-gray-400 w-full rounded-md border px-5 py-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:max-w-xs"
              placeholder="Enter your email"
            />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Notify me
              </button>
            </div>
          </form>
          <p className="text-blue-gray-500 mt-3 text-sm">
            We care about the protection of your data. Read our{" "}
            <a href="#" className="font-medium underline">
              Privacy Policy.
            </a>
          </p>
        </div>
      </section>
      {/* <div className="relative mb-14 mt-12">
        <div
          className="absolute left-0 right-0 h-1/2 bg-warm-gray-50"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="rounded-3xl bg-gradient-to-l from-sky-800 to-cyan-700 py-10 px-6 sm:py-16 sm:px-12 lg:flex lg:items-center lg:py-20 lg:px-20">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Sign up for our newsletter
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-cyan-100">
                Sign up to stay in the loop. Receive updates, access to
                exclusive deals, and more.
              </p>
            </div>
            <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-md border-white px-5 py-3 placeholder-warm-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-700"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-green-400 px-5 py-3 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-cyan-700 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                >
                  Notify me
                </button>
              </form>
              <p className="mt-3 text-sm text-cyan-100">
                We care about the protection of your data. Read our{" "}
                <a href="#" className="font-medium text-white underline">
                  Privacy Policy.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Newsletter;
