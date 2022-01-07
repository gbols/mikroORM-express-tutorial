const express = require("express");
const { MikroORM, RequestContext } = require("@mikro-orm/core");

const { initializeORM } = require("./bootstrap");
const { PostController } = require("./controllers/post.controller");
// const { CommentController } = require("./controllers/comment.controller");

let port = process.env.PORT || 3000;

(async () => {
  const app = express();

  const DI = await initializeORM(MikroORM);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    RequestContext.create(DI.orm.em, next);
    req.di = DI;
  });

  app.use("/api/posts", PostController(DI));
  // app.use("/comments", CommentController(DI));

  app.get("*", (req, res) =>
    res
      .status(200)
      .send({ success: true, message: "This is where it all starts!!!" })
  );

  app.listen(port, () => {
    console.log(
      `Express Mikro-ORM tutorial listening at http://localhost:${port}`
    );
  });
})();
