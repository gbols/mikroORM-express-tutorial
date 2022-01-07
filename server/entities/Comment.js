"use strict";

const { EntitySchema } = require("@mikro-orm/core");
const { BaseEntity } = require("./BaseEntity");

class Comment extends BaseEntity {
  constructor(postID, content) {
    super();
    this.postID = postID;
    this.content = content;
  }
}

const schema = new EntitySchema({
  class: Comment,
  extends: "BaseEntity",
  properties: {
    postID: { type: "number", reference: "m:1", type: "Post", fk: "id" },
    content: { type: "string" },
  },
});

module.exports = {
  Comment,
  entity: Comment,
  schema,
  label: "commentRepository",
};
