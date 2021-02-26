import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { TodoType } from "../../types/todo";
import todos from "../../data/todos.json";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
            // const todos = await new Promise<TodoType[]>((resolve, reject) => {
            //     fs.readFile("/data/todos.json", (err, data) => {
            //         if(err) {
            //             return reject(err.message);
            //         }
            //         const todosData = data.toString();
            //         if(!todosData) {
            //             return resolve([]);
            //         }
            //     });
            // });
            res.statusCode = 200;
            return res.send(todos);
        } catch (e) {
            console.log(e);
            res.statusCode = 500;
            res.send(e);
        }
    }

    res.statusCode = 405;
    console.log(res.statusCode);
    return res.end();
}