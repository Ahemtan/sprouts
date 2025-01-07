import { create } from "zustand";

interface todoProps {
  title: string;
  status: string;
  date: string;
}

interface todoTypes {
  todos: todoProps[];
  addTodo: (todo: todoProps) => void;
}

export const useTodoStore = create<todoTypes>((set) => ({
  todos: [],
  addTodo: (todo) => {
    set((state) => {
      const updatedTodos = [...state.todos, todo]; 

      window.context.saveNotes(updatedTodos);

      return { todos: updatedTodos };
    });
  },
}));
