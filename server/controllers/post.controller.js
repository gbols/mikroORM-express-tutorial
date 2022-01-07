const { wrap } = require("@mikro-orm/core");
const { Router } = require("express");
const { Post } = require("../entities/Post");

const router = Router();

const PostController = (DI) => {
  router.post("/", async (req, res) => {
    const { title, author, content } = req.body;

    if (!title || !author || !content) {
      return res.status(400).send({
        success: false,
        message: "One of `title, author`  or `content` is missing",
      });
    }

    try {
      const post = new Post(title, author, content);
      await DI.postRepository.persistAndFlush(post);

      res
        .status(200)
        .send({ success: true, message: "post successfully created", post });
    } catch (e) {
      return res.status(400).send({ success: false, message: e.message });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const posts = await DI.postRepository.find({});
      res
        .status(200)
        .send({
          success: true,
          message: "all post successfully retrieved",
          posts,
        });
    } catch (e) {
      return res.status(400).send({
        success: false,

        message: e.message,
      });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const post = await DI.postRepository.findOneOrFail({ id });
      res.status(200).send({
        success: true,
        message: `post with id ${id} has been successfully retrieved`,
        post,
      });
    } catch (e) {
      return res.status(400).send({ success: false, message: e.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const post = await DI.postRepository.findOneOrFail({ id });
      await DI.postRepository.removeAndFlush(post);
      res.status(200).send({
        success: true,
        message: `successfully deleted post with ${id} id`,
        post,
      });
    } catch (e) {
      return res.status(400).send({ success: false, message: e.message });
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, author, content } = req.body;

    if (!title && !author && !content) {
      return res.status(400).send({
        success: false,
        message: "One of `title, author` or `content` must be present",
      });
    }

    try {
      const post = await DI.postRepository.findOneOrFail({ id });

      wrap(post).assign({
        title: title || post.title,
        author: author || post.author,
        content: content || post.content,
      });

      await DI.postRepository.flush();

      res.status(200).send({
        success: true,
        message: "post successfully updated",
        post,
      });
    } catch (e) {
      return res.status(400).send({ success: false, message: e.message });
    }
  });

  return router;
};

module.exports = { PostController };
