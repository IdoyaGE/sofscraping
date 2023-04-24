import jsdom from 'jsdom';
//Objeto parse

/**
 * Clase que se encarga de parsear el html de una página web
 * @class 
 */
class Parser {
        /**
         * 
         * Constructor de la clase
         * @constructor 
         * @param {string} html -HTML de la página web 
         */
    constructor(html){
        /**
         * @property {string} html -HTML de la página web
         * @private
         */
        this.html = html;   
        this.loadDocument();
         }
    


    /**
     * Carga el HTML en un objeto de tipo document
     * @method 
     * @private
     * @returns document
     */


loadDocument() {
    const JSDOM =jsdom.JSDOM;
    const dom =new JSDOM(this.html);
    this.document = dom.window.document;
   
    }

//PREGUNTA-----------------------------------------------------------------------------------------------

// Lo hacemos como un objeto, para luego sacar los elementos (querySelector porque es una única pregunta) 
getQuestionAsDOM() {
    return this.document.querySelector('.question');
}

//Elementos que queremos obtener de la pregunta

getQuestion() {
    const question =this.getQuestionAsDOM();
    const title = this.getQuestionTitle(question);
    const votes = this.getQuestionVotes(question);
    const user =this.getQuestionUser(question);
    const date= this.getQuestionDateTime(question);
    return { 
        title, 
        question: question.outerHTML,
        votes, 
        user, 
        date 
    }
 
}

/**
     * Devuelve los títulos de las preguntas.
     * @method
     * @returns {string[]} -Títulos de la pregunta.
     */

getQuestionTitle() {
    return this.document.querySelector('h1').textContent.trim();

}
/**
     * Devuelve los votos de las preguntas.
     * @method
     * @returns {number} -Votos de la pregunta.
     */

getQuestionVotes(element) {
    const votes =element.querySelector('.js-vote-count').textContent;
    return parseInt(votes); //para convertirlo en número

}

/**
     * Devuelve los autores de las preguntas.
     * @method
     * @returns {string[]} -Nombre del usuario que ha realizado la pregunta.
     */

getQuestionUser(element) {
    const user = element.querySelector(".post-signature.owner .d-none").textContent;
    return (user);
}
/**
     * Devuelve las fechas de las preguntas al añadir el atributo título. 
     * @method
     * @returns {string[]} -Fecha de la pregunta.
     */

getQuestionDateTime(element) {
    const date = element.querySelector(".post-signature.owner .relativetime").textContent;
    return (date);
}


//RESPUESTAS-------------------------------------------------------------------------------------

//Lo hacemos como un objeto, para luego sacar los elementos (querySelectorAll porque es un array)
getAnswersAsDOM(){
    return Array.from(this.document.querySelectorAll(".answer"));
}

//Elementos que queremos obtener de la respuesta (tenemos que mapearlos al ser un array)

getAnswers () {
    const answers = this.getAnswersAsDOM();
    return answers.map ((answer) => {
        const user = this.getAnswerUser(answer);
        const date = this.getAnswerDateTime(answer);
        const votes = this.getAnswerVotes(answer);
        return { 
            answer:answer.outerHTML,
            user, 
            date, 
            votes, 
        };
    });
}
    
    /**
         * Devuelve los autores de la respuesta a las preguntas.
         * @method
         * @returns {string[]} -Autores de la respuesta.
         */
    
    getAnswerUser(element) {
        const users = Array.from(element.querySelectorAll(".post-signature .d-none"));
        if (users.length === 0)
            return "";
        if(users.length === 1) {
        return users[0].textContent;
        }
        return users[users.length -1].textContent;
    }
    /**
         * Devuelve las fechas de las respuestas a las preguntas.
         * @method
         * @returns {string[]} 
         */
    
    getAnswerDateTime(element) {
        const dates = Array.from(element.querySelectorAll(".user-info.user-hover .relativetime"));
        if (dates.length === 0)
            return "";
        if(dates.length === 1) {
        return dates[0].textContent;
        }
        return dates[dates.length -1].textContent;
    }
    /**
         * Devuelve las puntuaciones de las respuestas a las preguntas.
         * @method
         * @returns {string[]} 
         */
    
    getAnswerVotes(element) {
        const votes = element.querySelector('.js-vote-count').textContent;
        return parseInt(votes); //Para que lo convierta en número y no es necesario el trim porque ya elimina el espacio.
    }
    getLinks() {
        const links = Array.from(this.document.querySelectorAll("a"));
        return links.map((link) => link.href.replace(/\/$/, '' ));
    }

}   

    

export default Parser;
