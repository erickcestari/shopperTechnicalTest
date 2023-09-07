"use client"

import { Button } from "@mui/material"
import File from "mdi-material-ui/File"
import { ChangeEvent, useState } from "react"
import axios from "axios"

export default function Home() {
  const [nameInput, setNameInput] = useState('')
  const [data, setData] = useState({})
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }
    const file = files[0]
    const reader = new FileReader();

    setNameInput(file.name)
    reader.onload = function (e) {
      if (!e.target) {
        return
      }
      const csvContent = e.target.result;

      if (typeof csvContent !== 'string') {
        return;
      }
      const title = csvContent.split('\n')[0].split(',')
      const content = csvContent.split('\n')[1].split(',')

      const objData = title.map((item, index) => {
        return {
          [item]: content[index]
        }
      })
      setData(objData)
    };
    reader.readAsText(file);
  }

  const validateCsv = async () => {
    const response = await axios.post('http://localhost:3333/api/validate', data)
    console.log(response.data)
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-800 justify-between p-24">
      <h1 className="text-4xl font-bold text-zinc-100">Envie o arquivo de precificação:</h1>
      <div>
        <label htmlFor="midia" className="cursor-pointer text-zinc-100 hover:text-zinc-500">
          <div className="flex justify-between items-center">
            <span className="text-2xl ">Clique aqui</span>
            <File className="text-3xl " />
          </div>
        </label>
        <h1 className="text-slate-600">{nameInput}</h1>
      </div>
      <input
        type="file"
        id="midia"
        onChange={onFileSelected}
        accept="image/*, video/*"
        className="invisible h-0 w-0"
      />
      <div className="flex w-[80%] justify-end">
        <Button onClick={() => validateCsv()} variant="contained" className="bg-zinc-100 text-zinc-800 hover:bg-zinc-500 hover:text-zinc-100">Validar</Button>
      </div>
    </main>
  )
}
