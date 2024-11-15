const NowPaymentsAPI = require('./lib/NowPaymentsAPI');
const NOWPaymentsWebSocket = require('./lib/WebSocketClient');
const { NOWPaymentsError, APIError, ValidationError, WebSocketError } = require('./lib/errors');
const constants = require('./lib/constants');
const utils = require('./lib/utils');

/**
 * @module nowpayments-api
 * @typedef {import('./types').APIConfig} APIConfig
 * @typedef {import('./types').PaymentStatus} PaymentStatus
 * @typedef {import('./types').Currency} Currency
 * @typedef {import('./types').EstimatePrice} EstimatePrice
 * @typedef {import('./types').Invoice} Invoice
 * @typedef {import('./types').Payout} Payout
 * @typedef {import('./types/advanced').PaymentStatusExtended} PaymentStatusExtended
 * @typedef {import('./types/advanced').PaymentFlow} PaymentFlow
 */

module.exports = {
  NowPaymentsAPI,
  NOWPaymentsWebSocket,
  errors: {
    NOWPaymentsError,
    APIError,
    ValidationError,
    WebSocketError
  },
  constants,
  utils,
  /**
   * Create new API client instance
   * @param {APIConfig} config - API configuration
   * @returns {NowPaymentsAPI} API client instance
   */
  createClient: config => new NowPaymentsAPI(config),
  /**
   * Create new WebSocket client instance
   * @param {string} apiKey - API key
   * @param {import('./types/websocket').WebSocketOptions} [options] - WebSocket options
   * @returns {NOWPaymentsWebSocket} WebSocket client instance
   */
  createWebSocketClient: (apiKey, options) => new NOWPaymentsWebSocket(apiKey, options)
};
