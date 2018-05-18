import Web3 from 'web3';
import Web3Utils from 'web3-utils';
import { USER_REPOSITORY_ABI } from './abi/userRepository';
import { MODEL_ABI } from './abi/modelContract';
import { ENGINE_ABI } from './abi/engineContract';
import 'https://cdn.shopify.com/s/assets/external/app.js';

const WEB3_PROVIDER_URL = __WEB3_PROVIDER_URL__;
const WEB3_PROVIDER_URL = __WEB3_PROVIDER_URL__;
const SHOPIFY_PROVIDER_URL = __SHOPIFY_PROVIDER_URL__;
const SHOPIFY_API_KEY = __SHOPIFY_API_KEY__;
const USER_CONTRACT_ADDRESS = __USER_CONTRACT_ADDRESS__;
const MODEL_CONTRACT_ADDRESS = __MODEL_CONTRACT_ADDRESS__;
const ENGINE_CONTRACT_ADDRESS = __ENGINE_CONTRACT_ADDRESS__;
let web3Context;
let userRepo;
let model;
let engine;
console.log(Web3Utils);

function initWeb3() {
  if (typeof web3 !== 'undefined') {
    web3Context = new Web3(web3.currentProvider);
  } else {
    web3Context = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_URL));
  }
  web3Context.eth.defaultAccount = web3Context.eth.accounts[0];

  const userRepoContract = web3Context.eth.contract(USER_REPOSITORY_ABI);
  userRepo = userRepoContract.at(USER_CONTRACT_ADDRESS);
  const modelContract = web3Context.eth.contract(MODEL_ABI);
  model = modelContract.at(MODEL_CONTRACT_ADDRESS);
  const engineContract = web3Context.eth.contract(ENGINE_ABI);
  engine = engineContract.at(ENGINE_CONTRACT_ADDRESS);
}

function initShopify() {
	ShopifyApp.init({
      apiKey: SHOPIFY_API_KEY,
      shopOrigin: 'https://redhio.myshopify.com'
    });
}
export function postSignup(username, email, password) {
  if (!userRepo || !model) {
    initWeb3();
  }
  return new Promise((resolve, reject) => {
    userRepo.registered(web3Context.eth.defaultAccount, (error, token) => {
      if (!error) {
        userRepo.addUser([web3Context.eth.defaultAccount], Web3Utils.asciiToHex(username),Web3Utils.asciiToHex(email), (error, walletId) => {
          if (!error) {
            resolve({ token, walletId });
          } else {
            reject(error);
          }
        });
      } else {
        reject(error);
      }
    });
  });
}

export function postLogin(username, password) {
  if (!userRepo || !model) {
    initWeb3();
  }
  return new Promise((resolve, reject) => {
	ShopifyApp.init({
      apiKey: SHOPIFY_API_KEY,
      shopOrigin: 'https://redhio.myshopify.com'
    });
      if (!error) {
        resolve({ key: '0x00f' });
      } else {
        reject(error);
      }
    });
  });
}

export function purchaseClassification(fileName) {
  if (!userRepo || !model) {
    initWeb3();
  }
  return new Promise((resolve, reject) => {
    model.Predict(fileName, (error, result) => {
      if (!error) {
        resolve(result);
        // TODO: Purchase confirm event doesn't seem to work, integrate later
      } else {
        reject(error);
      }
    });
  });
}

export function confirmClassification() {
  // TODO: call smart contract function to confirm classification
  return Promise.resolve(null);
}

export function getModelsz() {
  if (!userRepo || !model) {
    initWeb3();
  }
  return Promise.resolve([
    { name: 'Model 1' },
    { name: 'Model 2' },
    { name: 'Model 3' },
    { name: 'Model 4' }
  ]);
}

export function getModels() {
  if (!userRepo || !model) {
    initWeb3();
  }
  return new Promise((resolve, reject) => {
    // TODO: Smart contract function needed to get user id, then get Wallet
    // Currently, walletId is always 0 on login
    userRepo.getModels(web3Context.eth.defaultAccount, (error, modelId) => {
      if (!error) {
        resolve([{ name:  modelId }]);
      } else {
        reject(error);
      }
    });
  });
}
