const { wrap } = require("@mikro-orm/core");
const { Router } = require("express");
const { Comment } = require("../entities/Comment");

const router = Router();

const CommentController = (DI) => {
  router.post("/post/:id", async (req, res) => {
    const {
      body: { content },
      params: { id },
    } = req;

    if (!content) {
      return res.status(400).send({
        success: false,
        message: "`content` is missing",
      });
    }

    try {
      const comment = new Comment(parseInt(id), content);
      await DI.commentRepository.persistAndFlush(comment);

      res.status(200).send({
        success: true,
        message: "comment successfully created",
        comment,
      });
    } catch (e) {
      return res.status(400).send({ success: false, message: e.message });
    }
  });

  router.get("/post/:id", async (req, res) => {
    const {
      params: { id },
    } = req;

    try {
      const comments = await DI.commentRepository.find({ postID: id });
      res.status(200).send({
        success: true,
        message: `comment with postID ${id} successfully retrieved`,
        comments,
      });
    } catch (e) {
      return res.status(400).send({
        success: false,
        message: "allComment successfully retrieved",
        message: e.message,
      });
    }
  });

  router.get("/:id", async (req, res) => {
    const {
      params: { id },
    } = req;

    try {
      const comments = await DI.commentRepository.findOneOrFail({ id });
      res.status(200).send({
        success: true,
        message: `comment with id ${id} successfully retrieved`,
        comments,
      });
    } catch (e) {
      return res.status(400).send({
        success: false,
        message: "allComment successfully retrieved",
        message: e.message,
      });
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const comment = await DI.commentRepository.findOneOrFail({ id });
      await DI.commentRepository.removeAndFlush(comment);
      res.status(200).send({
        success: true,
        message: `successfully deletedComment with ${id} id`,
        comment,
      });
    } catch (e) {
      return res.status(400).send({ success: false, message: e.message });
    }
  });

  router.put("/:id", async (req, res) => {
    const {
      params: { id },
      body: { content },
    } = req;

    if (!content) {
      return res.status(400).send({
        success: false,
        message: "`content` must be present",
      });
    }

    try {
      const comment = await DI.commentRepository.findOneOrFail({ id });

      wrap(comment).assign({
        content: content || comment.content,
      });

      await DI.commentRepository.flush();

      res.status(200).send({
        success: true,
        message: "comment successfully updated",
        comment,
      });
    } catch (e) {
      return res.status(400).send({ success: false, message: e.message });
    }
  });

  return router;
};

module.exports = { CommentController };
