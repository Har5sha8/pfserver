// creating Router : define path to resolve various request
const usercontroller = require('../Controllers/usercontroller')
const projectController = require('../Controllers/projectController')
// const appMiddleware=require("../Middleware/apllicationMiddleware")
const jwtMiddleware=require('../Middleware/jwtMiddleware')
// 1)import express

const express = require('express');
const multerConfig = require('../Middleware/multerMiddleware');

// 2)create am object for the class Router in express

const router = new express.Router();

// 3)define path for resolving request
router.post('/user/register',usercontroller.register)

// user login
router.post('/user/login',usercontroller.login)

// add project
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)


// get home project
router.get('/project/home-project',jwtMiddleware,projectController.getHomeprojects)


// get all projects
router.get('/project/all-project',jwtMiddleware,projectController.getAllProject)

// get user project
router.get('/project/user-project',jwtMiddleware,projectController.getUserProject)

// 4) export router

module.exports=router;

