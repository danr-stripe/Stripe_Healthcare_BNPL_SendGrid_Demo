1. Setup your Stripe and SendGrid API keys in the /src/.env file per below, as well as the template ID from SendGrid and the verified sender.


//Stripe keys
REACT_APP_STRIPE_SECRET_KEY=
REACT_APP_STRIPE_PUBLISHABLE_KEY=
REACT_APP_YOUR_DOMAIN=localhost

//SendGrid
SENDGRID_API_KEY=
SENDGRID_VERIFIED_SENDER=
SENDGRID_TEMPLATE_ID=

2. Run npm install react
3. Run npm install node
4. Run npm start from the top level directory


One the front end has started, and automatically loaded a browser with localhost:3000, 

5. cd src and run node server.js to run the server

6. All relevant Stripe code and SendGrid code is located in server.js 
