import { NextFunction, Request, Response } from "express"
import { ProductService } from "../../domain/service/productService"

export class ProductController {
  public async get(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const service = new ProductService()
      const listConversation = await service.get()
      return response.status(200).send(listConversation)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}