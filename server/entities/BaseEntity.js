const { EntitySchema } = require("@mikro-orm/core");

class BaseEntity {
  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

const schema = new EntitySchema({
  name: "BaseEntity",
  abstract: true,
  properties: {
    id: { primary: true, type: "number" },
    createdAt: { type: "Date" },
    updatedAt: { type: "Date", onUpdate: () => new Date() },
  },
});

module.exports = {
  BaseEntity,
  entity: BaseEntity,
  schema,
  label: "BaseEntity",
};
