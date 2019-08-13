const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const ioRedis = require('ioredis');
require('dotenv').config();
var sub = new ioRedis(process.env.DB_REDIS_PORT, process.env.DB_REDIS_HOST);
var pub = new ioRedis(process.env.DB_REDIS_PORT, process.env.DB_REDIS_HOST);
//subscribe redis to laravel with prefix "laravel_database_"
sub.subscribe("laravel_database_message", function(err, count) {});
//receive message from the subscribe channel
sub.on("message", function(channel, message) {
    console.log("Receive message: %s from channel: %s", message, channel);
    //publish to channel server laravel
    //pub.publish("laravel_database_message", "i was receive message!");
    //send message to client
    io.sockets.emit("message", "what name dmm");
});
server.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`run at host:${process.env.APP_HOST}-port:${process.env.APP_PORT}`);
});
