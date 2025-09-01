import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage clerk User with database
export const clerkWebhooks = async (req, res)=>{
    try{

        console.log("⚡ Webhook received:", req.body);   // ✅ Add this
        
        // create a svix instance with clerk webhook secret 
        const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)

        // verifying headers
        await whook.verify(JSON.stringify(req.body),{
            "svix-id" : req.headers["svix-id"],
            "svix-timestamp" : req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"]
        })

        // getting data from req body
        const {data, type} = req.body
        console.log("✅ Event Type:", type);             // ✅ Add this
        console.log("✅ Event Data:", data);  

        // switch cases for diff events
        switch (type){
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email:data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                await User.create(userData)
                res.json({})
                break;
            }

            case 'user.updated': {
                const userData = {
                    email:data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
   
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }

            default:
                break;

        }

    }
    catch (error) {
        console.log(error.message);
        res.json({success:false, message:'Webhooks Error'})
    }
}


// import { Webhook } from "svix";
// import User from "../models/User.js";

// export const clerkWebhooks = async (req, res) => {
//   try {
//     // raw body ko string banake verify karna hoga
//     const payload = req.body.toString();
//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     // verify + parse event
//     const evt = whook.verify(payload, headers);
//     const { data, type } = evt;

//     console.log("✅ EVENT RECEIVED:", type);
//     console.log("USER DATA:", data);

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses[0].email_address, // FIXED
//           name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//           image: data.image_url,
//           resume: "",
//         };
//         await User.create(userData);
//         console.log("👉 USER CREATED:", userData);
//         res.json({});
//         break;
//       }

//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses[0].email_address, // FIXED
//           name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//           image: data.image_url,
//         };
//         await User.findByIdAndUpdate(data.id, userData);
//         console.log("👉 USER UPDATED:", userData);
//         res.json({});
//         break;
//       }

//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         console.log("👉 USER DELETED:", data.id);
//         res.json({});
//         break;
//       }

//       default:
//         console.log("⚠️ Unhandled event:", type);
//         res.json({});
//         break;
//     }
//   } catch (error) {
//     console.error("❌ Webhook Error:", error.message);
//     res.status(400).json({ success: false, message: "Webhook Error" });
//   }
// };

