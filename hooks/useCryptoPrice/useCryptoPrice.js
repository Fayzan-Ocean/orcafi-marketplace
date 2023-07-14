import {Cpk} from 'cryptocurrency-price-kit';
import CoinMarketCap from "cryptocurrency-price-kit/providers/livecoinwatch.com"


// Add Providers
Cpk.useProviders([
    CoinMarketCap({apiKey: "8ee0e122-e7c3-48de-b3ab-42e77cb68276"}), // supports almost all coins
])


async function Run(){

  const coinmarketcap = new Cpk('coinmarketcap.com');
  
  // Get bitcoin Price and cache for 60 secs by default
  const price = await coinmarketcap.getPrice('BTC');

  console.log("Blockchain - BTC/USD:", price); // The current price of bitcoin in USD

  // OR
  // GET Many Prices and cache for 60 secs
  const prices = await livecoinwatch.getMany(['BTC/USD', 'ETH/USD', "BNB/USD"], 60);
  console.log('LiveCoinWatch - Many:', prices) // {BTC/USD: price, ETH/USD: price, BNB/USD: price}
  
  // Also supports using the symbol your provider supports
  // e.g coingecko supports using code instead of symbol
  // i.e `bitcoin` instead of `BTC`
  const prices2 = await coingecko.getMany(["BITCOIN/EUR", "ETHEREUM", "KADENA"], 60);
  console.log("CoinGecko: Many:", prices2); // {BITCOIN/EUR: price, ETHEREUM/USD: price, KADENA/USD: price}
}

Run().catch(console.error);

const useCryptoPrice =  () =>{

}