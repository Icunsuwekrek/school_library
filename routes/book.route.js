const exppress = require(`express`)
const router = exppress.Router();
const bookController = require(`../controller/book.controller`)
/** load function from simple-middleware */
const { midOne } = require(`../middlewares/simple-middleware`)
module.exports = router

/** load library express */
const express = require(`express`);
const upload = require("../controller/upload-profile");
/** load authorization function from controllers */
const { authorize } = require(`../controller/auth.controller`);
const { validateBook } = require("../middlewares/book-validation");

/** initiate object that instance of express */
const app = express()

/** create route to get data with method "GET" */
app.get("/", [midOne],[authorize], bookController.getAllBooks)

/** allow to read 'request' with json type */
app.use(express.json())

/** create route to get data with method "GET" */
app.get("/",[authorize], bookController.getAllBooks)

/** create route to find book
* using method "POST" and path "find" */
app.post("/find",[authorize], bookController.findBook)

/** create route to add new book using method "POST" */
app.post("/",[authorize], bookController.addBook)

/** create route to update book using method "PUT" and define parameter for "id" */
app.put("/:id",[authorize], bookController.updateBook)

/** create route to delete book using method "DELETE" and define parameter for "id" */
app.delete("/:id",[authorize], bookController.deleteBook)

/** export app in order to load in another file */
module.exports = app