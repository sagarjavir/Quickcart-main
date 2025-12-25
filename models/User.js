//step:1:-using this model we will store user data in the database,User schema will handle the user Creation, update and delete from the database.
//step:2:-goto the Clerk.com --> webhooks --> add webhook --> paste the ngrok url + /api/webhook --> select the events --> user created, user deleted, user updated --> create webhook
//step 3: INGEST_SIGNING_KEY= get it from inngest dashboard and add it to .env file, INEST_EVENT_KEY= get it from inngest dashboard and add it to .env file
//step 4: provided signin key and Event key in env file
//step 5: create inggest.js in config folder
import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    _id: {type:String,
        required:true},
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    cartItems:{
        type:Object,
        default:{}
    },
}, {minimize:false});
const User = mongoose.models.user||mongoose.model('user', userSchema);

export default User;