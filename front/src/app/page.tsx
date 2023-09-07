"use client"

import { Button, Paper } from "@mui/material"
import File from "mdi-material-ui/File"
import { ChangeEvent, useState } from "react"
import api from "@/utils/api"

export default function Home() {
  const [nameInput, setNameInput] = useState('')
  const [csvData, setCsvData] = useState({})
  const [isValidated, setIsValidated] = useState(false)
  const [csvDataValidated, setCsvDataValidated] = useState({} as any)
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    csvDataValidated.length > 0 && setCsvDataValidated([])
    setNameInput('')
    setIsValidated(false)

    if (!files) {
      return
    }
    const file = files[0]
    const reader = new FileReader();

    reader.onload = function (e) {
      if (!e.target) {
        return
      }
      const csvContent = e.target.result;
      setNameInput(file.name)

      if (typeof csvContent !== 'string') {
        return;
      }
      let csvContentArray = csvContent.split('\n')

      const title = csvContentArray[0].split(',').map((item) => item.replace(/"/g, '').replaceAll('/r', '').trim())
      csvContentArray.shift()
      const contents = csvContentArray.map(content => content.split(',').map((item) => item.replace(/"/g, '').replaceAll('/r', '').trim()))
      const arrayOfObj = []
      for (const content of contents) {
        const objData = {
          [title[0]]: content[0],
          [title[1]]: content[1]
        };

        arrayOfObj.push(objData)
      }
      setCsvData(arrayOfObj)
    };
    reader.readAsText(file);
  }

  const validateCsv = async () => {
    const response = await api.post('products/validate', {
      data: csvData
    })
    const isValid: boolean = response.data.reduce((acc: any, item: any) => {
      if (item.error) {
        acc = false
      }
      return acc
    }, true)
    setIsValidated(isValid)
    setCsvDataValidated(response.data)
  }

  const sendCSV = async () => {
    const response = await api.put('products', {
      data: csvData
    })
    csvDataValidated.length > 0 && setCsvDataValidated([])
    setNameInput('')
    setIsValidated(false)
    console.log(response.data)
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-800 justify-between p-24">
      <h1 className="text-4xl font-bold text-zinc-100">Envie o arquivo de precificação:</h1>
      <div className="flex space-y-10 w-full justify-center flex-col">
        <Button variant="contained" className="flex max-w-sm bg-zinc-100 text-zinc-800 hover:bg-zinc-500 hover:text-zinc-100">
          <label htmlFor="midia" className="cursor-pointer w-full">
            <div className="flex items-center">
              <span className="text-2xl ">Enviar csv</span>
              <File className="text-2sxl " />
            </div>
            <h1>{nameInput}</h1>
          </label>
        </Button>
        {csvDataValidated.length > 0 && csvDataValidated.map((dataValidated: any, index: number) =>
          <div key={index} className="flex flex-col">
            <h1 className="text-2xl text-zinc-100">Dados validados:</h1>
            <div className="flex flex-col">
              {dataValidated.product && (
                <>
                  <span className="text-zinc-100">Nome: {dataValidated.product.name}</span>
                  <span className="text-zinc-100">Preço atual: {dataValidated.product.sales_price}</span>
                  <span className="text-zinc-100">Novo preço: {dataValidated.new_price}</span>
                </>
              )}
              {dataValidated.error ? (
                <span className="text-red-500">Erro: {dataValidated.error}</span>
              ) : (
                <span className="text-green-500">Sucesso</span>
              )}
            </div>
          </div>
        )
        }
      </div>
      <input
        type="file"
        id="midia"
        onChange={onFileSelected}
        accept="image/*, video/*"
        className="invisible h-0 w-0"
      />
      <div className="flex w-[80%] justify-end">
        {isValidated ? (
          <Button onClick={() => sendCSV()} variant="contained" className="bg-green-500 text-zinc-100 hover:bg-green-100 hover:text-zinc-800">Atualizar</Button>
        ) : (
          <Button onClick={() => validateCsv()} variant="contained" className="bg-zinc-100 text-zinc-800 hover:bg-zinc-500 hover:text-zinc-100">Validar</Button>
        )}
      </div>
    </main>
  )
}
