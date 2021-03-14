const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => `
   <h2>Your recent Order for ${total}</h2>
   <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
   <ul>
      ${order
         .map(
            (item) => `
         <li>
            <img src="${item.thumbnail}" alt="${item.name}"/>
            ${item.size} ${item.name} - ${item.price}
         </li>
      `
         )
         .join('')}
   </ul>
   <p>Your total is $${total} due at pickup.</p>
   <style>
         ul {
            list-style: none;
         }
   </style>
   `;

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
   host: process.env.MAIL_HOST,
   port: 587,
   auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
   },
});

exports.handler = async (event, context) => {
   const body = JSON.parse(event.body);
   console.log(body);
   // validate the data coming in is correct
   const requiredFields = ['email', 'name', 'order'];

   for (const field of requiredFields) {
      if (!body[field]) {
         return {
            statusCode: 400,
            body: JSON.stringify({ message: `Ooops! you are missing the ${field} field` }),
         };
      }
   }
   // send the email

   // Send the success on error message
   // Test send an email
   const info = await transporter.sendMail({
      from: 'test <slick@example.com>',
      to: `${body.name} <${body.email}>, orders@example.com`,
      subject: 'New order!',
      html: generateOrderEmail({ order: body.order, total: body.total }),
   });

   return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
   };
};
