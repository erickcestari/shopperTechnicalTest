"use client"

import { Button } from "@mui/material"
import { ChangeEvent, useState, useEffect } from "react"
import api from "@/utils/api"
import { DataGrid } from "@mui/x-data-grid/DataGrid"
import { DisplayData } from "@/components/displayData"
import MediaPicker from "@/components/mediaPicker"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CsvDataType, CsvDataValidatedType, ProductType } from "@/types/csvTypes"

export default function Home() {
  const [nameInput, setNameInput] = useState<string>('')
  const [csvData, setCsvData] = useState<Array<CsvDataType>>([])
  const [isValidated, setIsValidated] = useState<boolean>(false)
  const [csvDataValidated, setCsvDataValidated] = useState<Array<CsvDataValidatedType>>([])
  const [csvDataDisplay, setCsvDataDisplay] = useState<Array<ProductType>>([])

  const getProducts = async () => {
    const response = await api.get('products')
    setCsvDataDisplay(response.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    csvDataValidated.length > 0 && setCsvDataValidated([])
    setIsValidated(false)

    if (!files || files.length === 0) {
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
      const arrayOfObj: CsvDataType[] = []
      for (const content of contents) {
        const objData: any = {
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
    const isValid: boolean = response.data.reduce((acc: boolean, item: any) => {
      if (item.error) {
        acc = false
      }
      return acc
    }, true)
    setIsValidated(isValid)
    setCsvDataValidated(response.data)
    if (isValid) {
      toast.success('Arquivo validado!', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    else {
      toast.error('Arquivo inválido!', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  const sendCSV = async () => {
    const response = await api.put('products', {
      data: csvData
    })
    setIsValidated(false)
    setCsvDataValidated([])
    setCsvDataDisplay(response.data)


    toast.success('Banco atualizado!', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-800 justify-between p-24">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-zinc-100 mb-5">Envie o arquivo de precificação:</h1>
        <h1 className="text-zinc-400 mb-5">{nameInput}</h1>
      </div>
      <div className="flex space-y-5 w-full justify-center flex-col">
        <div className="min-h-[150px] bg-zinc-900 p-5 rounded-lg">
          {csvDataValidated.length > 0 && csvDataValidated.map((dataValidated: any, index: number) =>
            <DisplayData key={index} dataValidated={dataValidated} />
          )}
        </div>
        <input
          type="file"
          id="midia"
          onChange={onFileSelected}
          accept="image/*, video/*"
          className="invisible h-0 w-0"
        />
        <div className="flex w-full justify-between ">
          <MediaPicker />
          {isValidated ? (
            <Button onClick={() => sendCSV()} variant="contained" className="bg-green-500 text-zinc-100 hover:bg-green-100 hover:text-zinc-800">Atualizar</Button>
          ) : (
            <Button onClick={() => validateCsv()} variant="contained" className="bg-orange-100 text-orange-800 hover:bg-orange-500 hover:text-orange-100">Validar</Button>
          )}
        </div>
        <div className="flex w-full">
          {csvDataDisplay && csvDataDisplay.length > 0 && (
            <DataGrid
              className="bg-white w-full"
              getRowId={(row) => row.code}
              rows={csvDataDisplay}
              initialState={{
                pagination: {
                  paginationModel: { page: 10, pageSize: 15 },
                },
              }}
              pageSizeOptions={[10, 15]}
              checkboxSelection
              columns={[
                { field: 'code', headerName: 'ID', width: 100 },
                { field: 'name', headerName: 'Nome', width: 800 },
                { field: 'sales_price', headerName: 'Preço atual', width: 200 },
              ]}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}
