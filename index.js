//env variable
require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//config
import googleAuthConfig from "./configs/google.config"

//API
import Auth from "./API/Auth"; 
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
//import Image from "./API/Image";
import Order from "./API/orders";
import Review from "./API/reviews";

//Database connection
import ConnectDB from "./database/connection";

const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configuration
googleAuthConfig(passport);

//For application routes
//localhost:5000/auth/signup
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
//zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/reviews", Review);

zomato.get("/", (req,res) => res.json({message: "Server Is Running🚀"}));

zomato.listen(5000, ()=>
ConnectDB().then(()=>console.log("Server Is Running🚀🚀🚀"))
.catch(()=>console.log("Server Is Running But DB Connection Failed :{😢 ")));