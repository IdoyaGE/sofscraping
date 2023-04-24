import Scraper from "../utils/scraper.js";
import Parser from "../utils/parser.js";
import googleSearchController from "./googleSearchController.js";
import Question from "../models/question.js";
import Answer from "../models/answer.js";
/**
 * @function getContent -Con una función asíncrona se obtiene el contenido de la página web, incluyendo las preguntas y las respuestas.
 * @param {string} query -Es la consulta que utiliza para buscar en Google.
 * @returns {Object} -Te devuelve un objeto con las preguntas y las respuestas de la página web.
 */
async function getContent(query) {
    if(!query) query ="undefined";
    const googleLinks = await googleSearchController.searchLinks(`stackoverflow ${query}`);
    const url = googleLinks.find((link) => link.includes("stackoverflow.com/questions"))
    const scraper = new Scraper();
    await scraper.init();
    const html = await scraper.getPageContent(url);
    const parser = new Parser(html);
    const title = parser.getQuestionTitle();
    const question= parser.getQuestion();
    const answers = parser.getAnswers();

//Incluimos las variables que queremos obtener de la página web

/**
 * @function questionModel - Obtiene un modelo de pregunta para la obtención de datos de la web.
 *@param {Object} question - La pregunta que queremos obtener.
 *@param {string} question.query - La query asociada a la pregunta.
 *@param {string} question.title - El título de la pregunta.
 *@param {string} question.question - El contenido de la respuesta.
 *@param {string} question.user - El usuario.
 *@param {Date} question.date - La fecha.
 *@param {number} question.votes - El número de votos que ha recibido. 
 *@returns {Promise} - Te devuelve una promesa con los datos solicitados.
*/


    const questionModel = new Question({
        query,
        title,
        content:question.question, 
        user:question.user,
        date:question.date,
        votes:question.votes,
    })

    await questionModel.save();

    answers.forEach(async (answer) => {
        const answerModel = new Answer({
            question:questionModel._id,
            content:answer.answer,
            user:answer.user,
            date:answer.date,
            votes:answer.votes,
        })
    await answerModel.save();
    });
    
    scraper.close();//cierra la instancia scraper
return {
    title,
    question,
    answers,
}
}

    export default {
        getContent
    }
