# nestJS-blog

A simple implementation of a blog with JWT authentication.
A client application implemented with Angular + NgRx is included in the `client` folder.

## Installation

First install postgres and start the mysql server. Then create a database called `nest_blog` and configure it to be accessible on port `3306` with the following access:

- user: “local”
- password: “local”

Then:

```bash
cd back/
$ yarn start # or npm run start
```

## Start the Angular app

```bash
$ cd front/
$ ng serve -o
```
