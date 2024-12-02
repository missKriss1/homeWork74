import express from "express";
import {Message} from "../types";
import {promises as fs} from 'fs';

const path = './messages';

const messagesRouter = express.Router();

messagesRouter.get('/',async (req, res) => {
    const messagesAll: Message[] = []

    const messagesFiles = await fs.readdir(path);
    let message = null

    for (const file of messagesFiles) {
        message = fs.readFile(`${path}/${file}`, 'utf-8');
        messagesAll.push(JSON.parse(await message));
    }
    const messagesFromReverse = [...messagesAll].reverse();
    res.send(messagesFromReverse.slice(0,5));
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