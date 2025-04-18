const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify= async (token='') =>{
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the WEB_CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
  });
  const{name,picture,email}=ticket.getPayload()
  //const payload=ticket.getPayload()
  
  //console.log(payload);
  
  
  return{
    nombre:name,
    img:picture,
    correo:email
  }
  
}
module.exports={
   googleVerify
}