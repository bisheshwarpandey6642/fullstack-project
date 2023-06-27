const { default: mongoose } = require("mongoose")

const dataSchema = new mongoose.Schema({
username: {
    type:String,
    required: true, 
    unique: true,
},
newData: {
    type:String,
    required: true
}

})

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;