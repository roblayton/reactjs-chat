# reactjs-chat

More focused on demonstrating the integration between a ReactJS chat client, statsD, influxDB, and grafana. Borrowed client code from [DanialK](https://github.com/DanialK/ReactJS-Realtime-Chat). 
 

```
# install npm dependencies
npm install

# spin up the service dependencies
docker-compose up

# start development mode
gulp watch

# start the express server
node server/app.js

```

Then browse to http://localhost:3000

Notes:
* Any changes to files in the `server` folder will require restarting `server/app.js`.

This is about as much development as I'm going to do on this repo. There's a lot more that can be done with the code, but my goal here wasn't to build a chat client, but to teach others about docker-powered infrastrucure for applications like this.

http://www.roblayton.com
