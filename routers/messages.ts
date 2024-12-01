import express from "express";
import {Message} from "../types";
import * as fs from "fs/promises";

const path = './messages';

const messagesRouter = express.Router();

messagesRouter.get('/',async (req, res) => {
    const messagesAll: Message[] = []

    const messagesFiles = await fs.readdir(path);
    let messages = null;

    for (const file of messagesFiles) {
        messages = fs.readFile(`${path}/${file}`, 'utf8');
        messagesAll.push(JSON.parse(await messages));
    }
    res.send(messagesAll.reverse().slice(0,5));
})

messagesRouter.post('/', async (req, res) => {
    const data = new Date().toISOString();
    const messages: Message ={
        message: req.body.message,
        data
    }
    await fs.writeFile(`${path}/${data}.txt`, JSON.stringify(messages));
    res.send(messages);
})

export default messagesRouter;