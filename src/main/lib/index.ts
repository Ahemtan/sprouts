import { writeFileSync } from 'fs';
import { homedir } from 'os';
import path from 'path';
import { ensureFile } from "fs-extra"
const todosFilePath = path.join(homedir(), '/sprouts/todo/todos.json');

export interface todoProps {
    title: string;
    status: string;
    date: string;
}

export const saveTodosToFile = async (todos: todoProps[]) => {
    try {
        const todosJson = JSON.stringify(todos, null, 2);

        await ensureFile(todosFilePath);
        
        writeFileSync(todosFilePath, todosJson);
    } catch (error) {
        console.error('Failed to save todos:', error);
    }
};
