"use client"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

function SkeletonAddTaskForm() {

  return (
    <Card className="flex flex-col justify-center items-center gap-4 p-6">
      <h3 className="text-lg text-gray-700 text-center">Agregar tarea</h3>
      <div className="p-2 flex flex-col justify-center items-center gap-2 w-full">
        <div className="w-full">
          <label>Título</label>
          <Skeleton className="dark:text-black h-6"/>
        </div>
        <div className="w-full">
          <label>Descripción</label>
          <Skeleton className="dark:text-black h-6" />
        </div>
        <div className="w-full">
          <label>Etiqueta</label>
          <Skeleton className="dark:text-black h-6"/>        </div>
        <Button className="bg-luissdev-650 mt-2">Crear tarea</Button>
      </div>
    </Card>
  )
}

export default SkeletonAddTaskForm
