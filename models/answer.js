import mongoose from "../utils/mongoose.js";

/**

Define el esquema de respuesta para MongoDB.
@typedef {Object} AnswerSchema
@property {string} content - El contenido de la respuesta.
@property {number} votes - EL número de votos que tiene la respuesta.
@property {string} user - El usuario que ha escrito la respuesta.
@property {string} date - La fecha de la respuesta.
@property {ObjectID} question - La pregunta asociada a la respuesta.
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