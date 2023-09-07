import express from "express";
import { ProductController } from "../../application/controller/productController";

const router = express.Router({ strict: true })
const controller = new ProductController()

router.route('/').get(
  controller.get,
)

router.route('/').put(
  controller.update,
)

router.route('/validate').post(
  controller.validate,
)

export default router