import { User } from "next-auth";

export interface ISpace {
  id?: string,
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
  id? : string,
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

export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface IUserState {
  user: User | null,
  isAuthenticated: boolean,
  token: string | null,
  expiresAt: string | null
}

export interface ISession {
  user: IUser;
  id?: string;
  expires: string;
  sessionToken?: string;
  userId?: string | undefined;
}

export enum ETypeNotification {
  'info' = 'INFO',
  'success' = 'SUCCESS',
  'warning' = 'WARNING',
  'error' = 'ERROR'
}

export enum ELoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}