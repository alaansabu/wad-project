const mongoose = require('mongoose')
const connect =async()=>{

try {
    
const connection =await mongoose.connect(process.env.MONGO_URI);
console.log("mongodb connected ✅✅");



} catch (error) {
    
console.log("mongodb is not connected❌❌❌",error);


}
}
module.exports = connect;