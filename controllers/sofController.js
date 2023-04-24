import Scraper from "../utils/scraper.js";
import Parser from "../utils/parser.js";
import googleSearchController from "./googleSearchController.js";
import Question from "../models/question.js";
import Answer from "../models/answer.js";
/**
 * @function getContent -Con una función asíncrona se obtiene el contenido de la página web, incluyendo las preguntas y las respuestas.
 * @param {string} query -Consulta que utiliza para buscar en Google.
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
 *@var questionModel -Modelo de pregunta para la obtención de datos de la web.
 *@param {Object} question -Pregunta que realiza el usuario.
 *@param {string} question.query -Query asociada a la pregunta.
 *@param {string} question.title -Título de la pregunta.
 *@param {string} question.question -Contenido de la respuesta.
 *@param {string} question.user -Usuario que realiza la pregunta.
 *@param {Date} question.date -Fecha de la pregunta.
 *@param {number} question.votes -Número de votos que ha recibido la pregunta. 
 *@returns {Promise} -Promesa con los datos solicitados.
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
