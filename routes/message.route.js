import express from "express";
import {
  getWebhookInfo,
  onReceiveMessage,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.route("/").post(onReceiveMessage);

router.route("/test").get(getWebhookInfo).post(sendMessage);

export default router;
