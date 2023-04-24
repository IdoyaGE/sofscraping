import moongose from"../utils/mongoose.js";

/**

Define el esquema de la pregunta para MongoDB.
@typedef {Object} QuestionSchema
@property {string} query -Query de la pregunta.
@property {string} title -Título de la pregunta.
@property {string} content -Contenido de la pregunta.
@property {string} date -Fecha de la pregunta.
@property {string} user -Usuario que ha realizado la pregunta.
@property {number} votes -Número de votos de la pregunta.
*/
const QuestionSchema = new moongose.Schema({

    query:{
        type:String,
        required:true,
    },
    title: {
        type:String,
        required: true,
    },
    content: {
        type:String,
        required:true,
    },
    date: {
        type: String,
        required:false,
    },
    user:{
        type:String,
        default: false,
    },
    votes: {
        type:Number,
        required:0,
    },
});

const Question = moongose.model("Question", QuestionSchema);

export default Question;