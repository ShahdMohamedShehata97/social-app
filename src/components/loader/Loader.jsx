import React from 'react'
import { BeatLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <BeatLoader color="blue" size={15} />
    </div>
  )
}