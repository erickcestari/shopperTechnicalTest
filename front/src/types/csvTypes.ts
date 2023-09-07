export interface CsvDataType  {
  product_code: string
  new_pric: string
}

export interface CsvDataValidatedType {
  right: boolean
  product: ProductType
}

export interface ProductType {
  code: string
  cost_price: number
  name: string
  sales_price: number
}