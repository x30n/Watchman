# Watchman
Confirm user's intention to perform sensitive actions out of band

# Install
*untested... still in dev*

* ```npm install winston --save```
* ```cp deploy.env_sample deploy.env```
* Configure deploy.env with your DUO credentials (ikey, skey, and host)
* Change context.json for site specific details (must *at least* change username to valid user in your DUO account)
