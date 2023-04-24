import express from "express";
import sofController from "./controllers/sofController.js";

const app =express();
/**
 * @route GET/
 * @desc Get stackoverflow content
 * 
 */

app.get('/', async (req, res) => {
    const query = req.query.p;
    const {title,question,answers}= await sofController.getContent(query);
    res.send(`
    <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Shared/stacks.css?v=83d4b324173a">
    <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Sites/es/primary.css?v=eb3e625b47af">
    <h1>${title}</h1>
    <div>${question}</div>
    <div>${question.user}</div>
    <div>${question.votes}</div>
    <div>${question.question}</div>
    <div>${answers.map((answer) => `
        <div>${answer.answers}</div>
        <div>${answer.user}</div>
        <div>${answer.votes}</div>
        <div>${answer.date}</div>
        `).join("")} </div>
`);
});

    //const data = await sofController.getContent(query);
    //res.send(data); para hacerlo genérico el data
    


app.listen(3999,()=>{
    console.log("Server started on port 3000")
});
