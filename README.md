
# Price monitoring

A mini tool that tracks the changing price of products, helping you buy the product you want at the most reasonable price

## Run Locally

Clone the project

```bash
  git clone https://github.com/hanknguyen14/price-monitoring
```

Go to the project directory

```bash
  cd price-monitoring
```

Install dependencies

```bash
  npm install
```

Copy env example

```bash
  cp .env.example .env
```

Update env according to your parameters 

```bash
  PRODUCTS_URL = '/product-url'
  EXPECTED_PRICE = 123456
  REGEX_PRICE = "[^0-9,-]+"
  PRICE_SELECTOR = '.class .price'
  NAME_SELECTOR = '.name-product h1'
  # Channel id from https://notify.run/
  NOTIFICATION_CHANNEL_ID='notification_channel_id'
  # Time in miliseconds
  INTERVAL_TIME_DURATION=12345
```

Run start application
```bash
  npm start
```

## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## Feedback

If you have any feedback, please reach out to us at hungnguyen.dhg@gmail.com

