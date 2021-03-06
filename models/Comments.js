const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentsSchema = new Schema ({
    body: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;