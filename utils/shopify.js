import Client from 'shopify-buy';
 
// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'back-in-time-comics-toys.myshopify.com',
  storefrontAccessToken: '2ef3445070a263a260c0f82cebbff07a'
});

export { client }