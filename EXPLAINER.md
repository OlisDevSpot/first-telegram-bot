### TELEGRAM API

Root API url: https://api.telegram.org/bot<bot_API_key>
We put `/action` after the root API url to specify what we want to do
We initialize a webhook connection URL which tells telegram where to send a new bot event when it happens (in local development we specify a ngrok server url)

### DEVELOPMENT

Telegram chat -> telegram bot -> telegram servers -> webhook into ngrok server -> http request into our express locahost -> bot action

### PRODUCTION

Telegram chat -> telegram bot -> telegram servers -> webhook into Render's server -> bot action

### WEBHOOK EVENTS

An event is called an `update`

### FURTHER VIEWING

[this video series](https://www.youtube.com/watch?v=CALd9wiJCmI)
