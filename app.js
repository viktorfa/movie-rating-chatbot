'use strict';
if (!process.env.PAGE_TOKEN) {
    console.log('Error: Specify PAGE_TOKEN in environment');
    process.exit(1);
}
if (!process.env.VERIFY_TOKEN) {
    console.log('Error: Specify VERIFY_TOKEN in environment');
    process.exit(1);
}
var _ = require('lodash');
var request = require('request');
var Botkit = require('botkit');
var commandLineArgs = require('command-line-args');
var localtunnel = require('localtunnel');
var omdb = require('./omdbApi');
var responses = require('./omdb-responses');
var ops = commandLineArgs([
    {
        name: 'lt', alias: 'l', args: 1, description: 'Use localtunnel.me to make your bot available on the web.',
        type: Boolean, defaultValue: false
    },
    {
        name: 'ltsubdomain', alias: 's', args: 1,
        description: 'Custom subdomain for the localtunnel.me URL. This option can only be used together with --lt.',
        type: String, defaultValue: null
    },
]);
if (ops.lt === false && ops.ltsubdomain !== null) {
    console.log("error: --ltsubdomain can only be used together with --lt.");
    process.exit();
}
var controller = Botkit.facebookbot({
    debug: true,
    hostname: '0.0.0.0',
    access_token: process.env.PAGE_TOKEN,
    verify_token: process.env.VERIFY_TOKEN,
});
var bot = controller.spawn({});
controller.setupWebserver(process.env.PORT || 3000, function (err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function () {
        console.log('ONLINE!');
        if (ops.lt) {
            var tunnel = localtunnel(process.env.PORT || 3000, { subdomain: ops.ltsubdomain }, function (err, tunnel) {
                if (err) {
                    console.log(err);
                    process.exit();
                }
                console.log("Your bot is available on the web at the following URL: " + tunnel.url + '/facebook/receive');
            });
            tunnel.on('close', function () {
                console.log("Your bot is no longer available on the web at the localtunnnel.me URL.");
                process.exit();
            });
        }
    });
});
controller.on('facebook_postback', function (bot, message) {
    console.log("POSTBACK INVOKED");
    console.log(message);
    var payload = JSON.parse(message.payload);
    switch (payload.type) {
        case 'SHOW_MOVIE_RATING':
            handleShowMovieRatingPostback(bot, message, payload);
            break;
        default:
            console.log("Got a postback");
    }
    return false;
});
controller.on('message_received', function (bot, message) {
    console.log("MESSAGE RECEIVED");
    console.log(message);
    if (message.is_echo !== true && message.type === 'user_message' && message.text) {
        bot.reply(message, "Searching for \"" + message.text + "\"");
        omdb.getOmdbSearchResponse(message.text)
            .then(function (data) { return handleOmdbSearchResponse(data, bot, message); }, function (error) { return console.log(error); });
    }
    return false;
});
var handleOmdbSearchResponse = function (omdbResponse, bot, message) {
    if (omdbResponse.isValid()) {
        if (omdbResponse.length() === 1) {
            handleShowMovieById(bot, message, omdbResponse.getResults()[0].getImdbId());
        }
        else {
            var response = responses.getSearchResponse(omdbResponse).build();
            console.log("RESPONSE:::");
            console.log(response);
            bot.reply(message, response);
        }
    }
    else {
        bot.reply(message, "Did not find any movies for \"" + message.text + "\"");
    }
};
var handleShowMovieRatingPostback = function (bot, message, payload) {
    console.log("Handling movieratingpostback:::");
    console.log(message);
    handleShowMovieById(bot, message, payload.imdbId);
};
var handleShowMovieById = function (bot, message, imdbId) {
    omdb.getOmdbIdResponse(imdbId).then(function (omdbResponse) {
        console.log("DETAILED RESPONSE OBJECT");
        console.log(omdbResponse);
        if (omdbResponse.isValid()) {
            handleMovieDetailResponse(bot, message, omdbResponse);
        }
    }, function (error) {
        console.log("Error with getting movie with id: " + imdbId);
        console.log(error);
    });
};
var handleMovieDetailResponse = function (bot, message, movieObject) {
    var response = responses.getDetailedRatingResponse(movieObject).build();
    bot.reply(message, response);
};
