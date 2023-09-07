import React from 'react'
import { Paper } from '@mui/material'

interface displaytDataProps {
  dataValidated: {
    product: {
      code: string
      name: string
      sales_price: string
    }
    new_price: string
    error: string
  }
}

export const DisplayData = (props: displaytDataProps) => {
  return (
    <Paper className="flex flex-col bg-zinc-800 p-5 my-5">
      <h1 className="text-2xl text-zinc-100">Dados validados:</h1>
      <hr />
      <div className="flex flex-col">
        {props.dataValidated.product && (
          <>
            <span className="text-zinc-100">ID: {props.dataValidated.product.code}</span>
            <span className="text-zinc-100">Nome: {props.dataValidated.product.name}</span>
            <span className="text-zinc-100">Preço atual: {props.dataValidated.product.sales_price}</span>
            <span className="text-zinc-100">Novo preço: {props.dataValidated.new_price}</span>
          </>
        )}
        {props.dataValidated.error ? (
          <span className="text-red-500">Erro: {props.dataValidated.error}</span>
        ) : (
          <span className="text-green-500">Sucesso</span>
        )}
      </div>
    </Paper>
  )
}
