import { ProductRepository } from "../../infra/repository/productRepository";

export class ProductService {
  async get () {
    const repository = new ProductRepository()
    return await repository.get()
  }
}