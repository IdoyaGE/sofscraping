import sofController from "../../controllers/sofController";

/**
 * Test para verificar que la función getContent del controlador sofController devuelva un contenido de la web
*/



describe ("sof controller", () => {
    it('Deberia conseguir el contenido de una pagina de stackoverflow', async()=> {
/**
     * @type {string} -query para la búsqueda de en la web de stackoverflow.
     */
        const query = "promesa";
 /**
     * @typedef {Object} SofContent - Objeto que contiene el contenido de la web de Stackoverflow.
     * @property {string} title - Título.
     * @property {Object} question - Pregunta.
     * @property {string} question.question - Contenido de la pregunta.
     * @property {string} question.votes - Votos de la pregunta.
     * @property {string} question.date - Fecha de la pregunta.
     * @property {string} question.user - Usuario de la pregunta.
     * @property {Array<Object>} answer - Array del objeto.
     */
        const {title, question, answer} = await sofController.getContent(query); 
        expect(title).toContain('promesa'); 
        expect(question.question).toBe('¿Qué es una promesa en Javascript?'); 
        expect(question.votes).toBe('92');
        expect(question.date).toBe('el 20 abr. 2017 a las 17:44');
        expect(question.user).toBe('Phi');

        expect(answer[0].answer).toContain('Me gusta describir una promesa como una especie de Karma:');
        expect(answerVotes[0].votes).toBe('105');
        expect (answerDate[0].date).toBe('el 21 abr. 2017 a las 1:30');
        expect (answerUser[0].user).toBe('gugadev');
        
       
    },20000);
});