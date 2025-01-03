"use client"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

function SkeletonTaskList() {

  return (
    <div className="flex flex-col justify-center items-center gap-4 border-luissdev-250 shadow-md shadow-luissdev-250 py-4 px-2 rounded-md bg-luissdev-250">
      <h3 className="text-gray-750 text-xl text-center">Listado de tareas</h3>
      <div className="flex flex-col justify-center items-center gap-2 min-w-[100%] md:min-w-[80%]">
        <Card className="p-2 w-full">
          <div className="grid grid-cols-5 justify-items-center content-center">
            <div className="col-span-4 grid content-center justify-items-start w-full">
              <Skeleton>
                <p> <span className="text-luissdev-550">📁</span> Título</p>
              </Skeleton>
            </div>
            <div className="col-span-1 my-auto">
              <Button 
                variant={'outline'}
              >
                🗑️
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SkeletonTaskList
