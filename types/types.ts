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
  tag: string
}

export interface ITaskData {
  space_id: string,
  user_id : string,
  title: string,
  description: string,
  tag: string,
  completed: boolean
}

export interface ITaskProps {
  userId: string,
  spaceId: string
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface ISession {
  user: User;
  id?: string;
  expires: string;
  sessionToken?: string;
  userId?: string | undefined;
}