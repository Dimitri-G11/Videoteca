const express=require("express");
const routes =express.Router();
const VideoController - require("./controllers/VideoController")

routes.get("/",(request,response)=>response.send("Hello World"));
routes.get("/videos", VideoController.index);

module.exports =routes;
