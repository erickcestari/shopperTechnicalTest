import express from "express";
import { ProductController } from "../../application/controller/productController";

const router = express.Router({ strict: true })
const controller = new ProductController()

router.route('/').get(
  controller.get,
)

export default router