/** load library express */
const express = require(`express`)
const { authorize } = require("../controller/auth.controller")
/** initiate object that instance of express */
const app = express()
/** allow to read 'request' with json type */
app.use(express.json())

/** load member's controller */
const memberController =
require(`../controller/member.controller`)
/** create route to get data with method "GET" */
app.get("/",[authorize], memberController.getAllMember)
/** create route to add new member using method "POST" */
/** load middleware for validation request */
app.post("/",[authorize], memberController.addMember)
/** create route to find member
* using method "POST" and path "find" */
app.post("/find",[authorize], memberController.findMember)
/** create route to update member
* using method "PUT" and define parameter for "id" */   
app.put("/:id",[authorize], memberController.updateMember)
/** create route to delete member
* using method "DELETE" and define parameter for "id" */
app.delete("/:id",[authorize], memberController.deleteMember)
/** export app in order to load in another file */
module.exports = app
