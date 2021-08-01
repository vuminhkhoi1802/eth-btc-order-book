## Pre-requisites:

- [NodeJS (version 10 and above)](https://nodejs.org/en/)
- [Yarn 1.22.11](https://yarnpkg.com/cli/install)


In the project directory, you can run the comment below to start locally:

```$ yarn && yarn start```

Firebase web hosting: 

`https://eth-btc-order-book.web.app/`

I used firebase for easy, quick & free hosting

## Explanation:

- Due to very limited time as I had to work overtime on my company's task so that I could not create a dedicated backend service for this test.

- I chose `bitstamp` instead of `binance` or `bitfinex` as the websocket provided by `bitstamp` is easier to use and it also provided the easy-to-access data set of `Asks` & `Bids` for the Order Book of `ETH/BTC` pair. Plus, I also could not find time to integrate with `binance` or `bitfinex` or `bittrex`
