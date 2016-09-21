# Watchman
Confirm user's intention to perform sensitive actions out of band

Currently meant to run in AWS lambda and use Duo security as out-of-band confirmation

# NOT PRODUCTION READY... THIS IS AN EXPERIMENT FOR NOW!

# Install
*untested... still in dev*

* ```npm install winston --save```
* ```cp deploy.env_sample deploy.env```
* Configure deploy.env with your DUO credentials (ikey, skey, and host)
* Change context.json for site specific details (must *at least* change username to valid user in your DUO account)
