'use strict';

if (!process.env.PAGE_TOKEN) {
    console.log('Error: Specify PAGE_TOKEN in environment');
    process.exit(1);
}

if (!process.env.VERIFY_TOKEN) {
    console.log('Error: Specify VERIFY_TOKEN in environment');
    process.exit(1);
}
const _ = require('lodash');
const request = require('request');

const Botkit = require('botkit');
const commandLineArgs = require('command-line-args');
const localtunnel = require('localtunnel');

import * as omdb from './omdbApi';
import * as responses from './omdb-responses';
import {OmdbSearchResponse, FullMovieObject} from './models';


const ops = commandLineArgs([
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

const controller = Botkit.facebookbot({
    debug: true,
    hostname: '0.0.0.0',
    access_token: process.env.PAGE_TOKEN,
    verify_token: process.env.VERIFY_TOKEN,
});

const bot = controller.spawn({});

controller.setupWebserver(process.env.PORT || 3000, function (err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function () {
        console.log('ONLINE!');
        if (ops.lt) {
            const tunnel = localtunnel(process.env.PORT || 3000, {subdomain: ops.ltsubdomain}, function (err, tunnel) {
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


controller.on('facebook_postback', (bot, message) => {
    console.log("POSTBACK INVOKED");
    console.log(message);
    // First checking if the payload is simply a string
    switch (message.payload) {
        case 'GET_STARTED':
            bot.reply(message, "Send a movie title to search for ratings");
            return;
    }
    const payload: any = JSON.parse(message.payload);
    // If not a string, it's a parseable JSON object
    switch (payload.type) {
        case 'SHOW_MOVIE_RATING':
            handleShowMovieRatingPostback(bot, message, payload);
            break;
        default:
            console.log("Got a postback, but don't know its type");
    }
});


controller.on('message_received', (bot, message) => {
    console.log("MESSAGE RECEIVED");
    console.log(message);
    if (message.is_echo !== true && message.type === 'user_message' && message.text) {
        bot.reply(message, `Searching for "${message.text}"`);
        omdb.getOmdbSearchResponse(message.text)
            .then(data => handleOmdbSearchResponse(data, bot, message), error => console.log(error));
    }
    return false;
});

const handleOmdbSearchResponse = (omdbResponse: OmdbSearchResponse, bot: any, message: any) => {
    if (omdbResponse.isValid()) {
        if (omdbResponse.length() === 1) {
            handleShowMovieById(bot, message, omdbResponse.getResults()[0].getImdbId())
        } else {
            const response = responses.getSearchResponse(omdbResponse).build();
            console.log("RESPONSE:::");
            console.log(response);
            bot.reply(message, response);
        }
    } else {
        bot.reply(message, `Did not find any movies for "${message.text}"`);
    }
};

const handleShowMovieRatingPostback = (bot, message, payload) => {
    console.log("Handling movieratingpostback:::");
    console.log(message);
    handleShowMovieById(bot, message, payload.imdbId);
};

const handleShowMovieById = (bot, message, imdbId: string) => {
    omdb.getOmdbIdResponse(imdbId).then((omdbResponse: FullMovieObject) => {
        console.log("DETAILED RESPONSE OBJECT");
        console.log(omdbResponse);
        if (omdbResponse.isValid()) {
            handleMovieDetailResponse(bot, message, omdbResponse);
        }
    }, error => {
        console.log(`Error with getting movie with id: ${imdbId}`);
        console.log(error);
    });
};

const handleMovieDetailResponse = (bot, message, movieObject: FullMovieObject) => {
    const response = responses.getDetailedRatingResponse(movieObject).build();
    bot.reply(message, response);
};
