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
      const products = await service.get()
      return response.status(200).send(products)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  public async validate(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const service = new ProductService()
      const validation = await service.validate(request.body.data)
      return response.status(200).send(validation)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const service = new ProductService()
      const products = await service.update(request.body.data)
      return response.status(200).send(products)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}