import { Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}

export type ServerBoolResponse = {
  message: string
}

export type UserRequest = {
  email: string
  password: string
}

export interface AuthUserData {
  username: string;
  email: string;
}

export const fetchNotes = async (search: string, page: number, categoryId?: string): Promise<NotesResponse> => {
  const params: Record<string, string | number> = { page };
  if (search) {
    params.search = search;
  }

  if (categoryId && categoryId !== 'All') {
    params.tag = categoryId;
  }

  const response = await nextServer.get<NotesResponse>(`${baseURL}/notes`, {
    params,
  });

  return response.data;
};

export const createNote = async (newNoteData: NewNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>(`${baseURL}/notes`, newNoteData, {

  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`${baseURL}/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`${baseURL}/notes/${noteId}`)

  return response.data;
}

export const loginUser = async (userData: UserRequest): Promise<User> => {
  const response = await nextServer.post<User>(`/auth/login`, userData);
  return response.data;
};

export const registerUser = async (userData: UserRequest): Promise<User> => {
  const response = await nextServer.post<User>(`/auth/register`, userData);
  return response.data;
};
export const logoutUser = async () => {
  const response = await nextServer.post(`/auth/logout`)
  return response.data;
}

export const editUser = async (user: AuthUserData): Promise<User> => {
  const responce = await nextServer.patch<AuthUserData>("/users/me", user);
  return responce.data;
};

export const getMe = async (): Promise<User> => {
  const response = await nextServer.get<User>("/users/me")
  return response.data;
}

export async function checkSession(): Promise<boolean> {
  try {
    await nextServer.get("/auth/session");
    return true;
  } catch {
    return false;
  }
}