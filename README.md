# Bkmark Boi

Bkmark Boi is a Discord bot built for interacting with Bkmark's unofficial API 😅.

## Setup

To run your own version of this bot, you will need the following:  
  
- Discord Bot Token (Grab yours from the Discord Developer panel.)  
- Somewhere to host the bot (I'm using DigitalOcean)  
- Bkmark Account  
- A Discord Server (Invite the bot to the server.)

## Environment Variables

```
TOKEN="" // Your Discord Bot Token
PREFIX="" // Bot Command Prefix
SERVER_URL="https://api.bkmark.io/"
CHANNEL_ID='' // Channel to log bot messages to.
```

## Commands  

There are currently 4 commands:

### ``Add``:  

This adds a bookmark to a collection, if no collection is supplied, the default collection is given.  

```
bk add https://google.com collection_name
```

### ``Default``:

Sets your default collection.

```
bk default collection_name
```

### ``Token``:

Sets your JWT Token to authenticate requests to Bkmark's unofficial API.

```
bk token jwt_token
```

### ``User``:

Gets the currently authenticated user.

```
bk user
```
