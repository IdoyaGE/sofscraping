import Parser from '../../utils/parser.js';
import fs from "fs";



  /**
 * Carga el archivo HTML de prueba test.html y crea una instancia de la clase Parser.
 * @function
 * @name beforeAll
 * @memberof Parser
 * @returns  -Devuelve los elementos de las preguntas y respuestas del test.
 */

  describe("Parser", ()  => {
    let parser;
      beforeAll(() => {
          const html = fs.readFileSync("./test/test.html", "utf8");
           parser = new Parser(html);
  });

//PREGUNTA(TITLE): Test para verificar que la función devuelve el título de la pregunta.
  
it('Debería obtener la pregunta de la página', () => {
  const question = parser.getQuestionTitle();
  console.log(question);
  expect(question).toContain('¿Qué es una promesa en Javascript?');
});



//PREGUNTA(QUESTION): devuelve la pregunta en formato DOM(Document Object Model).

  it ('Debería devolver la pregunta en formato DOM', () => {
  const question = parser.getQuestionAsDOM();
  console.log(question);
  expect(question.innerHTML).toContain('promesa');
});
  

//PREGUNTA(VOTES): Test para verificar los votos de una pregunta

it('Debería obtener los votos de una pregunta', () => {
  const question = parser.getQuestionAsDOM();
  const votes = parser.getQuestionVotes(question);
  console.log(votes);
  expect(votes).toBe(92);
});

//PREGUNTA(DATE): Test para verificar que la función devuelve la fecha de la pregunta
it('Debería obtener la fecha de la pregunta de la página', () => {
  const question = parser.getQuestionAsDOM();
  const date = parser.getQuestionDateTime(question);
  console.log(date);
  expect(date).toBe('el 20 abr. 2017 a las 17:44');
});

//PREGUNTA(USER): Test para verificar que la función devuelva el autor de la pregunta

it('Debería obtener el autor de la pregunta de la página', () => {
  const question = parser.getQuestionAsDOM();
  const user = parser.getQuestionUser(question);
  console.log(user);
  expect(user).toBe('Phi');
});

//RESPUESTA(ANSWER): Test para verificar que la función devuelva las respuestas en formato DOM.

it ('Debería devolver un array de la respuesta en formato DOM', () => {
  const answers = parser.getAnswersAsDOM();
  console.log(answers);
  expect(answers[0].innerHTML).toContain('Me gusta describir una promesa como una especie de Karma:');
});


//RESPUESTA(VOTES): Test para verificar que la función devuelve los votos de la respuesta.

  it('Debería obtener los votos de una respuesta', () => {
    const answer = parser.getAnswersAsDOM();
    const votes = parser.getAnswerVotes(answer[0]);
    expect(votes).toBe(105);
  });

//RESPUESTA(DATE): Test para verificar que la función devuelve la fecha de la respuesta

it('Debería obtener la fecha de la respuesta de la página', () => {
  const answers = parser.getAnswersAsDOM();
  const date = parser.getAnswerDateTime(answers[0]);
  console.log(date);
  expect(date).toBe('el 21 abr. 2017 a las 1:30');
});
  
//RESPUESTA(USER): Test para verificar que la función devuelva el autor de la respuesta

it('Debería obtener el autor de la respuesta de la página', () => {
  const answers = parser.getAnswersAsDOM();
  const user = parser.getAnswerUser(answers[0]);
  console.log(user);
  expect(user).toBe('gugadev');
});

});