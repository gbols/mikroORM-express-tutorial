# Express + PostgreSQL + JavaScript example

1. Install dependencies via  `npm install`
2. Synchronize schema with database `npx mikro-orm schema:update --run --fk-checks`
3. Run via  `yarn start:dev` (nodemon)
4. Example API is running on localhost:3000

Available routes:

```
GET     /api/posts        finds all posts
GET     /api/posts/:id    finds post by id
POST    /api/posts        creates new post
PUT     /api/posts/:id    updates post by id
DELETE     /api/posts/:id   delete post by id
```

