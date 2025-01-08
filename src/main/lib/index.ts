import { writeFileSync, readFile } from 'fs';
import { homedir } from 'os';
import path from 'path';
import { ensureFile } from "fs-extra"
const todosFilePath = path.join(homedir(), '/sprouts/todo/todos.json');
import { todoProps } from "@shared/types/index";

export const saveTodosToFile = async (todos: todoProps[]) => {
    try {
        const todosJson = JSON.stringify(todos, null, 2);
        await ensureFile(todosFilePath);
        
        writeFileSync(todosFilePath, todosJson);
    } catch (error) {
        console.error('Failed to save todos:', error);
    }
};

const loadTodosFromFile = async (): Promise<todoProps> => {

    //Making sure that the file exists and isn't empty
    await ensureFile(todosFilePath);
    writeFileSync(todosFilePath, '[]');

    return new Promise((resolve, reject) => {
        readFile(todosFilePath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Failed to read todos file:', err);
                reject(err);
            } else {
                try {
                    const todos: todoProps = JSON.parse(data);
                    resolve(todos);
                } catch (parseError) {
                    console.error('Failed to parse todos file:', parseError);
                    reject(parseError);
                }
            }
        });
    });
};

export const loadTodos = async () => {
    try {
        const todos = await loadTodosFromFile();
        return todos;
    } catch (error) {
        console.error('Failed to load todos:', error);
        throw error
    }
};