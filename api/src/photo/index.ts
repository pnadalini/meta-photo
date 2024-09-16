import express from "express";

const router = express.Router();

router.use("/externalapi");

router.route("/photos").get(() => {});
