This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Installation

This app requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.
### using npm
```bash
cd finnal-year-project/fyp
npm i
npm run dev
# or
yarn install
yarn dev
```
### using yarn
```sh
yarn install
yarn dev
```
### for `.env.local` file

create `.env.local` file in `/finnal-year-project/fyp` and past the following local env variables.

```sh
MONGO_URI=mongodb://127.0.0.1:27017/fyp
PASSWORD_SECRET_KEY=THEIS_IS_THE_KEY_FOR_SECRETE
ADMIN_PASSWORD_SECRET_KEY=THEIS_IS_THE_ADMIN_KEY_FOR_SECRETE
SUPER_ADMIN_PASSWORD_SECRET_KEY=THEIS_IS_THE_SUPER_ADMIN_KEY_FOR_SECRETE
JWT_SECRET_KEY=THEIS_IS_THE_SECRETE_KEY_FOR_JWT
ADMIN_JWT_SECRET_KEY=THEIS_IS_THE_ADMIN_SECRETE_KEY_FOR_JWT
SUPER_ADMIN_JWT_SECRET_KEY=THEIS_IS_THE_SUPER_ADMIN_SECRETE_KEY_FOR_JWT
NEXT_PUBLIC_HOST=http://localhost:3000
```
## Api Requests `/api/Payment/pre-payment`
```sh
{
  "email": "intel@gmail2919.com",
  "name": "Sohial HSD",
  "phone": "03329211550",
  "orderID": "03329211550",
  "address": "Paksitan",
  "district": "Swat",
  "state": "KPK",
  "pin": "23250",
  "SubTotal": 499,
  "cart": {
    "HSD T-Shirt branded": {
      "title": "T-Shirt",
      "category": "T-shirt",
      "price": 499,
      "size": "S",
      "color": "green",
      "qty": 1
    }
  }
}

```

For production environments...
```sh
npm install --production
NODE_ENV=production node app
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
