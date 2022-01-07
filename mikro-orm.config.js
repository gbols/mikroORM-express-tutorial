const allEntities = require("./server/entities");

module.exports = {
  entities: allEntities,
  type: "postgresql",
  clientUrl: "some string from https://www.elephantsql.com/",
};
