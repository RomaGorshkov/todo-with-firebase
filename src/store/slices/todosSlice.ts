import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import type { RootState } from "../store";
import { db } from "../../firebase/firebaseConfig";
import type { NewTodo, Todo } from "../../types";

export const addTodo = createAsyncThunk<
  Todo,
  NewTodo,
  { rejectValue: string; state: RootState }
>("todos/addTodo", async ({ text, description }, thunkAPI) => {
  const state = thunkAPI.getState();
  const user = state.auth.user;

  if (!user || !user.id) {
    return thunkAPI.rejectWithValue("User not authenticated to add todo.");
  }

  try {
    const todoToSave = {
      text: text,
      completed: false,
      userId: user.id,
      userDisplayName: user.displayName || user.email,
      createdAt: serverTimestamp(),
      description: description,
    };

    const docRef = await addDoc(collection(db, "todos"), todoToSave);

    return {
      id: docRef.id,
      text: todoToSave.text,
      description: todoToSave.description,
      completed: todoToSave.completed,
      userId: todoToSave.userId,
      userDisplayName: todoToSave.userDisplayName,
      createdAt: new Date().toISOString(),
    } as Todo;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error && error.message
        ? error.message
        : "Failed to add todo";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const fetchUserTodos = createAsyncThunk<Todo[], string>(
  "todos/fetchUserTodos",
  async (userId, thunkAPI) => {
    try {
      const todosRef = collection(db, "todos");
      const q = query(todosRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const todos: Todo[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          description: data.description ?? "",
          completed: data.completed,
          userId: data.userId,
          userDisplayName: data.userDisplayName,
          createdAt: data.createdAt?.toDate().toISOString() ?? null,
        };
      });

      return todos;
    } catch (error: unknown) {
      console.error("Error fetching todos:", error);
      return thunkAPI.rejectWithValue("Failed to fetch todos");
    }
  }
);
