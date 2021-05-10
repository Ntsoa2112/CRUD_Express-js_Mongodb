const controller = require("../controller/controller");
const middleware = require("../middleware/auth");

// On injecte le router d"express, nous en avons besoin pour définir les routes 
module.exports = function(router) {   
    router.get("/", controller.index);
    router.post("/api/v1/creation", controller.creation);
    router.get("/api/v1/utilisateur", controller.getUser);
    router.get("/api/v1/list", controller.list);
    router.post("/api/v1/delete", controller.delete);
    router.post("/api/v1/update", controller.update);
    router.post("/api/v1/search", controller.search);
};