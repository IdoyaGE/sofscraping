import moongose from"../utils/mongoose.js";

/**

Define el esquema de la pregutna para MongoDB.
@typedef {Object} QuestionSchema
@property {string} query - La pregunta.
@property {string} title - El título de la pregunta.
@property {string} content - El contenido de la pregunta.
@property {string} date - La fecha de la pregunta.
@property {string} user - El usuario que ha realizado la pregunta.
@property {number} votes - El número de votos de la pregunta.
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