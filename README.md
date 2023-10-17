# acf.wpgraphql.com

This repository contains the Next.js application intended for acf.wpgraphql.com.

## 🧰 Built With

- [wpengine/faust-scaffold](https://github.com/wpengine/faust-scaffold)
- [wpengine/wp-graphql-content-blocks](https://github.com/wpengine/wp-graphql-content-blocks)
- [wp-graphql/wp-graphql](https://github.com/wp-graphql/wp-graphql)
- [wp-graphql/wpgraphql-acf](https://github.com/wp-graphql/wpgraphql-acf)
- [ACF](https://www.advancedcustomfields.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## ⌨️ Development

Install dependencies

```sh
npm install
```

Create the `.env.local`

```sh
cp .env.local.sample .env.local
```

_Add the appropriate FAUST_SECRET_KEY from the connected WordPress site._

Run the development server

```sh
npm run dev
```
