import mongoose from "../utils/mongoose.js";

/**

Define el esquema de respuesta para MongoDB.
@typedef {Object} AnswerSchema
@property {string} content -Contenido de la respuesta.
@property {number} votes -Número de votos que tiene la respuesta.
@property {string} user -Usuario que ha escrito la respuesta.
@property {string} date -Fecha de la respuesta.
@property {ObjectID} question -Pregunta asociada a la respuesta.
*/
const answerSchema = new mongoose.Schema({
    content: {
        type: String,
        required:true,
    },
    votes: {
        type:Number,
        default:0,
    },
    user:{
        type:String,
        required:false,
    },
    date: {
        type:String,
        required:false,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Question",
        required:true,
    }
});

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;