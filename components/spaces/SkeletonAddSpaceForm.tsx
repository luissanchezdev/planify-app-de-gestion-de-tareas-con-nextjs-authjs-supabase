"use client"

import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Skeleton } from "../ui/skeleton"

function SkeletonAddSpaceForm() {
  
  return (
    <>
      <Card className="flex flex-col justify-center items-center gap-4 p-6">
        <p className="text-lg text-gray-700 text-center">Agregar espacio</p>
        <div className="p-2 flex flex-col justify-center items-center gap-2 w-full">
          <div className="w-full">
            <p>Título</p>
            <Skeleton className="dark:text-black h-4"/>
            <Skeleton className="h-4"></Skeleton> 
          </div>
          <div className="w-full">
            <p>Descripción</p>
            <Skeleton className="dark:text-black h-4"/>
            <Skeleton className="h-4" />
          </div>
          <div className="w-full">
            <p>Etiqueta</p>
            <Skeleton className="dark:text-black h-4"/>
            <Skeleton className="h-4" />
          </div>
          <Button className="bg-luissdev-650 mt-2">
            Crear espacio
          </Button>
        </div>
      </Card>
    </>
  )
}

export default SkeletonAddSpaceForm
