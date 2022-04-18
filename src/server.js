
//const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config({ path: './.env' });
console.log(process.env)

const YOUR_DOMAIN = 'http://localhost:3000';
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY)



if (
  !process.env.SENDGRID_API_KEY || !process.env.SENDGRID_VERIFIED_SENDER
) {
  console.log(
    'The .env file is not configured.'
  );
  console.log('');
  // eslint-disable-next-line no-unused-expressions
  process.env.REACT_APP_STRIPE_SECRET_KEY
    ? ''
    : console.log('Add SendGrid API Key and Verified Sender to your .env file.');

  process.exit();
}

if (
  !process.env.REACT_APP_STRIPE_SECRET_KEY
) {
  console.log(
    'The .env file is not configured.'
  );
  console.log('');
  // eslint-disable-next-line no-unused-expressions
  process.env.REACT_APP_STRIPE_SECRET_KEY
    ? ''
    : console.log('Add REACT_APP_STRIPE_SECRET_KEY to your .env file.');

  process.exit();
}

// This is your test secret API key.
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);



/*
// lookup_key
// user_custid
// user_email
// user_phone
// user_name
// product_treatment
// product_total
// product_balance
// product_grandTotal
// product_downpayment
// product_financeam
// product_numpay
// product_monthlypayment
// console.log(req.body);
*/



app.post('/create-checkout-session', async (req, res) => {

  console.log(req.body)

  
  // Get customer
  // Ensure the ID is the same as the reference ID to maintain one custumer for all iteractions
  let customer = null;
  try {
    console.log("======= Get Customer ==========")
    customer = await stripe.customers.retrieve(req.body.user_custid);
  }
  // Create customer when user does not exist
  catch (err) {
    console.log("======= Creating Customer ==========")
    customer = await stripe.customers.create({
      description: 'User created by the CNY portal',
      id: req.body.user_custid,
      email: req.body.user_email,
      name: req.body.user_name,
      phone: req.body.user_phone,
    });
  }
  console.log("======= customer ==========")
  console.log(customer)

  let descript = req.body.product_treatment + ' for ' + req.body.user_custid;

  // Create product (deposit and monthly recurring) - OK
  let product = null;
  try {
    product = await stripe.products.create({
      name: req.body.product_treatment,
      id: req.body.lookup_key,
      active: true,
      description: descript,
    });
  }
  catch (err) {
    console.log("======= Retriving / Updateing Product ==========")
    product = await stripe.products.retrieve(req.body.lookup_key);
  }
  console.log("======= product ==========")
  console.log(product)

  // Create price (for down payment)
  // Creating a new product each time
  let downpayment_price = null;
  let downpament_id = 'dep_' + req.body.lookup_key;
  try {
    downpayment_price = await stripe.prices.create({
      // id: downpament_id,
      unit_amount: Math.round(Number(req.body.product_downpayment) * 100),
      // customer: req.body.user_custid,
      currency: 'usd',
      nickname: 'downpayment pricing: ' + descript,
      product: product.id,
      // lookup_key: req.body.user_custid
    });
  }
  catch (err) {
    console.log("======= Updateing Deposit Price ==========")
    console.log(err)
    downpayment_price = await stripe.prices.retrieve(downpament_id);
  }
  console.log("======= downpayment_price ==========")
  console.log(downpayment_price)

  let monthly_price = null;
  let monthly_id = 'pay_' + req.body.lookup_key;
  try {
    // Create price (for subscription)
    monthly_price = await stripe.prices.create({
      unit_amount: Math.round(Number(req.body.product_monthlypayment) * 100),
      // id: monthly_id,
      currency: 'usd',
      // nickname: 'monthly pricing: '+descript ,
      recurring: { interval: 'month' },
      product: product.id,
      // lookup_key: req.body.user_custid
    });
  }
  catch (err) {
    console.log("======= Updateing Monlthy Payment Price ==========")
    console.log(err)
    monthly_price = await stripe.prices.retrieve(monthly_id);
  }
  console.log("======= monthly_price ==========")
  console.log(monthly_price)

  //Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      { price: monthly_price.id },
    ],
    add_invoice_items: [
      { price: downpayment_price.id },
    ],
    payment_behavior: 'default_incomplete',
    // expand: ['latest_invoice.payment_intent'],
  });
  console.log("======= subscription ==========")

  
const paymentlink12 = await stripe.paymentLinks.create({
  line_items: [{price: monthly_price.id, quantity: 1}],
  subscription_data: {trial_period_days: 7},
});

console.log("======= PAYMENT LINK GENERATED ==========")
console.log(paymentlink12.url)
  
const sgMail = require('@sendgrid/mail')

const verified_sender = process.env.SENDGRID_VERIFIED_SENDER;
const template_id = process.env.SENDGRID_TEMPLATE_ID;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

 
const msg = {
  to: req.body.user_email, // Change to your recipient
  from: verified_sender, // Change to your verified sender
  subject: 'Fertility Treatment Payment Plan Options',
  template_id: template_id,
  dynamic_template_data: {
    "first_name": req.body.user_name,
    "dollar_per_month_12_month_option" : "$89.95",
    "dollar_per_month_18_month_option" : "$59.95",
    "dollar_per_month_24_month_option" : "$29.95",
    "paymentlink12" : paymentlink12.url,
    "paymentlink18" : paymentlink12.url,
    "paymentlink24" : paymentlink12.url
  }
}


sgMail.send(msg).then(() => {
    console.log('Email sent:' + msg)
  })
  .catch((error) => {
    console.error(error)
  })

  console.log(subscription)



  // Create the invoice item
  // const invoiceItem = await stripe.invoiceItems.create({
  //   customer: customer.id,
  //   price: monthly_price.id,
  //   description: "Monthly payment of " + monthly_price.unit_amount / 100 + " for: " + req.body.product_treatment + '  Customer Number:  ' + customer.id,
  // });
  // console.log("======= invoiceItem ==========")
  // console.log(invoiceItem)

  //   //Create teh subscription
  //   const subscription = await stripe.subscriptions.create({
  //     customer: customer.data[0].id,
  //     items: [
  //       {price: price.data[0].id},
  //     ],
  //   });
  /*
    const prices = await stripe.prices.list({
      lookup_keys: ['IVF-user001'],
      expand: ['data.product'],
    });

    console.log(prices)
  */
  
     const session = await stripe.checkout.sessions.create({
       billing_address_collection: 'auto',
       line_items: [
         {
           price: downpayment_price.id,
           // For metered billing, do not pass quantity
           quantity: 1,

         },
       ],
       mode: 'payment',
       success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
       cancel_url: `${YOUR_DOMAIN}?canceled=true`,
     });


//Send email

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs



    res.redirect(303, session.url);
   
  

  // Create the invoice item
  // const invoiceItem = await stripe.invoiceItems.create({
  //   customer: customer.id,
  //   price: monthly_price.id,
  //   description: "Monthly payment of " + monthly_price.unit_amount / 100 + " for: " + req.body.product_treatment + '  Customer Number:  ' + customer.id,
  // });
  // console.log("======= invoiceItem ==========")
  // console.log(invoiceItem)
  // Create an Invoice

  /*
===
===  Invoice item directly
===

  // Create an Invoice Item with the Price, and Customer you want to charge
  const invoiceItem = await stripe.invoiceItems.create({ // You can create an invoice item after the invoice
    customer: customer.id,
    price: downpayment_price.id,
  });
  console.log("======= invoiceItem ==========")
  console.log(invoiceItem)

  // Why cant the invoice item be reoccuring?


  const invoice = await stripe.invoices.create({
    customer: customer.id,
    stat
    collection_method: 'send_invoice',
    days_until_due: 30,
  });
  console.log("======= invoice ==========")
  console.log(invoice)


  const finvoice = await stripe.invoices.finalizeInvoice(invoice.id);

  // Send the Invoice
  const sendEmail = await stripe.invoices.sendInvoice(finvoice.id);
  console.log("======= sendEmail ==========")
  console.log(sendEmail)

  // Dont seem to get the email

*/

  // if (monthly_price) {
  //   const session = await stripe.checkout.sessions.create({
  //     billing_address_collection: 'auto',
  //     line_items: [
  //       {
  //         price: monthly_price.id,
  //         // For metered billing, do not pass quantity
  //         quantity: 1,

  //       },
  //     ],
  //     mode: 'subscription',
  //     success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  //   });

  //   res.redirect(303, session.url);
  // }
  // else {
  //   console.err("Make sure a product is created")
  // }

 // res.send('CNY Payment Server - now redirect to page')

});

app.post('/create-portal-session', async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
});


app.post('/create-customer', async (req, res) => {
  // Create a new customer object
  const customer =  stripe.customers.create({
    email: req.body.email,
  });

  // Save the customer.id in your database alongside your user.
  // We're simulating authentication with a cookie.
  res.cookie('customer', customer.id, { maxAge: 900000, httpOnly: true });

  res.send({ customer: customer });
});

app.post('/create-subscription', async (req, res) => {
  // Simulate authenticated user. In practice this will be the
  // Stripe Customer ID related to the authenticated user.
  const customerId = req.cookies['customer'];

  // Create the subscription
  const priceId = req.body.priceId;

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

app.get('/invoice-preview', async (req, res) => {
  const customerId = req.cookies['customer'];
  const priceId = process.env[req.query.newPriceLookupKey.toUpperCase()];

  const subscription = await stripe.subscriptions.retrieve(
    req.query.subscriptionId
  );

  const invoice = await stripe.invoices.retrieveUpcoming({
    customer: customerId,
    subscription: req.query.subscriptionId,
    subscription_items: [{
      id: subscription.items.data[0].id,
      price: priceId,
    }],
  });

  res.send({ invoice });
});

app.post('/cancel-subscription', async (req, res) => {
  // Cancel the subscription
  try {
    const deletedSubscription = await stripe.subscriptions.del(
      req.body.subscriptionId
    );

    res.send({ subscription: deletedSubscription });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

app.post('/update-subscription', async (req, res) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(
      req.body.subscriptionId
    );
    const updatedSubscription = await stripe.subscriptions.update(
      req.body.subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: process.env[req.body.newPriceLookupKey.toUpperCase()],
      }],
    }
    );

    res.send({ subscription: updatedSubscription });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

app.get('/subscriptions', async (req, res) => {
  // Simulate authenticated user. In practice this will be the
  // Stripe Customer ID related to the authenticated user.
  const customerId = req.cookies['customer'];

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    expand: ['data.default_payment_method'],
  });

  res.json({ subscriptions });
});



app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    let event = request.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = 'whsec_12345';
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.trial_will_end':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case 'customer.subscription.deleted':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case 'customer.subscription.created':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case 'customer.subscription.updated':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

/*
// app.post('/create-user', async (req, res) => {
//   const customer = await stripe.customers.create({
//     description: 'User created by the CNY portal',
//     email:  [req.body.email],
//     name:  [req.body.name],
//     phone:  [req.body.phone],
//   });
// });

// app.post('/create-product', async (req, res) => {
//   const product = await stripe.customers.create({
//     description: [req.body.description],
//     id:  [req.body.id],
//     name:  [req.body.name],
//   });
// });
*/

// If no PORT defined, assuming its local
// Local mode uses express to listen to the port defined
// non local is pushed to lambda on sls deploy
app.listen(3000, () => console.log('Running on port 3000'));