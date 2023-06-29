import { load } from 'cheerio';
import fetch from 'node-fetch';
import 'dotenv/config';
import cron from 'node-cron';

const PRODUCTS_URL = process.env.PRODUCTS_URL;
const EXPECTED_PRICE = process.env.EXPECTED_PRICE;
const REGEX_PRICE = new RegExp(process.env.REGEX_PRICE, 'g');
const PRICE_SELECTOR = process.env.PRICE_SELECTOR;
const NAME_SELECTOR = process.env.NAME_SELECTOR;
const NOTIFICATION_CHANNEL_ID = process.env.NOTIFICATION_CHANNEL_ID;
const CRON_EXPRESSION = process.env.CRON_EXPRESSION;
const TIME_ZONE = process.env.TIME_ZONE;

const convertPrice = (amount) => parseInt(Number(amount.replace(REGEX_PRICE, "")));

const getHTML = async (url) => {
    const header = {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
        }
    }
    const res = await fetch(url, header);
    const html = await res.text();
    return load(html);
}

const sendPush = async (name, price) => {
    const dataMessage = `Price went down: ${name} went below ${price}`;
    const header = {
        method: 'POST',
        body: dataMessage,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
        }
    }
    return fetch(`https://notify.run/${NOTIFICATION_CHANNEL_ID}`, header);
}

const checkPrices = async (url, expectedPrice) => {
    const $_parsedHTML = await getHTML(url);
    const price = $_parsedHTML(PRICE_SELECTOR).text();
    const name = $_parsedHTML(NAME_SELECTOR).text();
    const priceInt = convertPrice(price);
    if (priceInt <= expectedPrice) {
        sendPush(name, priceInt);
        console.log('Yay...Price went down', name, price);
    } else {
        console.log('No hope this time', name, price);
    }
}
export default checkPrices;

// Run the checkPrices function every CRON_EXPRESSION
cron.schedule(CRON_EXPRESSION, () => {
    checkPrices(PRODUCTS_URL, EXPECTED_PRICE);
}, {
    scheduled: true,
    timezone: TIME_ZONE
});
