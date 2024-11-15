# NOWPayments API Client for Node.js

A powerful and feature-rich Node.js client for the NOWPayments cryptocurrency payment gateway API with WebSocket support for real-time payment updates.

[![npm version](https://img.shields.io/npm/v/nowpayments-api.svg)](https://www.npmjs.com/package/nowpayments-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 Complete NOWPayments API integration
- ⚡ Real-time payment updates via WebSocket
- 🔒 Strong TypeScript support
- ✅ Input validation
- 🔄 Automatic retries with exponential backoff
- ⚖️ Rate limiting
- 🏦 Sandbox environment support
- 📝 Comprehensive documentation

## Installation

```bash
npm install nowpayments-api
```

## Quick Start

```javascript
const { createClient, createWebSocketClient } = require("nowpayments-api");

// Initialize API client
const client = createClient({
  apiKey: "YOUR_API_KEY",
  ipnSecret: "YOUR_IPN_SECRET", // Optional
  sandbox: false, // Optional, defaults to false
});

// Create payment
const payment = await client.createPayment({
  price_amount: 100,
  price_currency: "USD",
  pay_currency: "BTC",
});

// Initialize WebSocket client for real-time updates
const ws = createWebSocketClient("YOUR_API_KEY");

ws.on("payment_update", (update) => {
  console.log("Payment update received:", update);
});

ws.connect();
```

## API Methods

### Payments

```javascript
// Create payment
const payment = await client.createPayment({
  price_amount: 100,
  price_currency: "USD",
  pay_currency: "BTC",
});

// Get payment status
const status = await client.getPaymentStatus("payment_id");

// Get payments list
const payments = await client.getPayments({
  limit: 50,
  page: 1,
});
```

### Invoices

```javascript
// Create invoice
const invoice = await client.createInvoice({
  price_amount: 100,
  price_currency: "USD",
});
```

### Currencies & Estimates

```javascript
// Get available currencies
const currencies = await client.getCurrencies();

// Get price estimate
const estimate = await client.getEstimatePrice({
  amount: 100,
  currency_from: "USD",
  currency_to: "BTC",
});
```

### Payouts

```javascript
// Create payout
const payout = await client.createPayout({
  address: "crypto_address",
  amount: 1.5,
  currency: "BTC",
});
```

### WebSocket Events

```javascript
const ws = createWebSocketClient("YOUR_API_KEY");

ws.on("connected", () => {
  console.log("Connected to WebSocket");
});

ws.on("payment_update", (update) => {
  console.log("Payment update:", update);
});

ws.on("error", (error) => {
  console.error("WebSocket error:", error);
});

ws.on("disconnected", (reason) => {
  console.log("Disconnected:", reason);
});
```

### Error Handling

```javascript
const { errors } = require('nowpayments-api');

try {
  await client.createPayment({...});
} catch (error) {
  if (error instanceof errors.ValidationError) {
    console.error('Invalid input:', error.details);
  } else if (error instanceof errors.APIError) {
    console.error('API error:', error.message);
  }
}
```

### IPN Verification

```javascript
// Verify IPN callback signature
const isValid = client.verifyIPN(ipnData, signature);
```

## Available Methods

### Payment Operations

- `createPayment(params)` - Create new cryptocurrency payment
- `getPaymentStatus(paymentId)` - Get payment status by ID
- `getPayments(params)` - Get paginated list of payments
- `getPaymentFlow(paymentId)` - Get detailed payment processing flow
- `getMinimumPaymentAmount(currency)` - Get minimum payment amount for currency

### Invoice Operations

- `createInvoice(params)` - Create payment invoice
- `getInvoicePaymentStatus(invoiceId)` - Get invoice payment status

### Currency Operations

- `getCurrencies()` - Get list of available cryptocurrencies
- `getEstimatePrice(params)` - Get estimated price for currency conversion

### Payout Operations

- `createPayout(params)` - Create cryptocurrency payout
- `createBatchPayout(params)` - Create batch cryptocurrency payout

### Verification

- `verifyIPN(ipnData, signature)` - Verify IPN callback signature
- `getStatus()` - Check API availability

### WebSocket Methods

- `connect()` - Establish WebSocket connection
- `close()` - Close WebSocket connection
- `getState()` - Get current connection state

### WebSocket Events

- `connected` - Connection established
- `disconnected` - Connection closed
- `payment_update` - Payment status update received
- `error` - Error occurred
- `reconnecting` - Attempting to reconnect
- `pong` - Heartbeat response received

## TypeScript Support

The package includes comprehensive TypeScript definitions:

```typescript
import NowPaymentsAPI, { CreatePaymentParams, PaymentStatus } from "nowpayments-api";

const client = new NowPaymentsAPI({
  apiKey: "YOUR_API_KEY",
});

const payment: PaymentStatus = await client.createPayment({
  price_amount: 100,
  price_currency: "USD",
  pay_currency: "BTC",
} as CreatePaymentParams);
```

## Documentation

For detailed API documentation, visit:

- [NOWPayments API Documentation](https://documenter.getpostman.com/view/7907941/2s93JusNJt)
- [TypeScript Definitions](./types/index.d.ts)
- [WebSocket Events](./types/websocket.d.ts)

Key Resources:

- [Payment Methods](./types/index.d.ts#L36-L60)
- [Currency Support](./lib/constants.js#L71-L74)
- [Error Handling](./lib/errors.js)
- [WebSocket Integration](./lib/WebSocketClient.js)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
