"use client"

import { Button } from '@mui/material'
import { File } from 'mdi-material-ui'
import React from 'react'

const MediaPicker = () => {
  return (
    <Button variant="contained" className="flex max-w-sm bg-blue-100 text-blue-800 hover:bg-blue-500 hover:text-blue-100">
      <label htmlFor="midia" className="cursor-pointer w-full">
        <div className="flex items-center">
          Enviar csv
          <File className="text-2xl" />
        </div>
      </label>
    </Button>
  )
}

export default MediaPicker