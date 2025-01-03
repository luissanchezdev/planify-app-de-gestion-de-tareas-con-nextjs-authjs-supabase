export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ){
    super(message)
    this.name = 'AppError'
  }
}

export const handleApiError = (error : unknown) => {
  if(error instanceof AppError){
    return {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code
    }
  }

  if(error instanceof Error){
    return {
      message: error.message,
      statusCode: 500,
      code: 'INTERNAL SERVER ERROR'
    }
  }

  return {
    message: 'Ha ocurrido un error inesperado',
    statusCode: 500,
    code: 'UNKNOWN_ERROR'

  }
}

