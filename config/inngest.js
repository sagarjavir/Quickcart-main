import { Inngest } from "inngest";

//Ingest function to save user data to a database
import { Inngest } from "inngest";
import { connect } from "mongoose";
import connectDB from "./db";

export const inngest = new Inngest({
  id: "quickcart-next",
//   signingKey: process.env.INNGEST_SIGNING_KEY,
//   eventKey: process.env.INNGEST_EVENT_KEY,
});

//Inngest instance to save user data to DB
export const syncUserCreation = inngest.createFunction(
    {
        id:'sync/user.creation',
    },
    {
        event: 'clerk/user.created',
    },
    async (event)=>{
        const {id,
            first_name, last_name, email_addresses, profile_image_url}=event.data;
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:`${first_name} ${last_name}`,
            imageUrl:profile_image_url
        }
        await connectDB();
        await User.create(userData);
    }
)
//Inngest instance to update user data to DB
export const syncUserUpdate = inngest.createFunction(
    {
        id:'update/user.updated',
    },
    {
       event: 'clerk/user.updated',
    },
    async (event)=>{
     const {id,
            first_name, last_name, email_addresses, profile_image_url}=event.data;
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:`${first_name} ${last_name}`,
            imageUrl:profile_image_url
    }
    await connectDB();
    await User.findByIdAndUpdate(id, userData);//userData from event, update in DB
}
)
//Inngest instance to delete user data from DB
export const syncUserDeletion = inngest.createFunction(
{
    id:'delete-user-with-clerk'
},
{
    event: 'clerk/user.deleted',
},
async (event)=>{
    const {id}=event.data;
    await connectDB();
    await User.findByIdAndDelete(id);//delete user from DB using id
}
)



