export interface ISpace {
  id: string,
  user_id: string,
  title: string,
  description: string,
  tag: string
}

export interface IAddTaskFormInputs {
  title: string,
  description: string,
  tag: string,
  completed: boolean
}

export interface ITaskData {
  space_id: string,
  user_id : string,
  title: string,
  description: string,
  tag: string,
  complete: boolean
}

export interface ITaskProps {
  userId: string,
  spaceId: string
}