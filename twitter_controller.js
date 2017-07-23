'use strict';

var Twitter = require('twitter');
var config = require('./config');

var T = new Twitter(config);

module.exports = class TwitterController {
    constructor() { }

    favourite(params, callback) {

        // Initiate search using passed paramaters
        T.get('search/tweets', params, function (err, data, response) {
            // If there is no error, proceed
            if (!err) {

                // Loop through the returned tweets
                for (let i = 0; i < data.statuses.length; i++) {
                    // Get the tweet Id from the returned data
                    let id = { id: data.statuses[i].id_str }
                    // Try to Favorite the selected Tweet
                    T.post('favorites/create', id, function (err, response) {
                        // If the favorite fails, log the error message
                        if (err) {
                            callback(err[0].message);
                        }
                    });
                }
            } else {
                callback(err);
            }
        })

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Tweets Favourited',
                data: params // eslint-disable-line
            })
        };
        callback(null, response);
    }
}

// 'use strict'
// var Twitter = require('twitter');
// var config = require('./config.js');
// var T = new Twitter(config);
//
// // This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
// var civivTechSearch = {q: "#civictech", count: 10, result_type: "recent"};
//
// // This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
// module.exports = function retweetLatest() {
// 	T.get('search/tweets', civivTechSearch, function (error, data) {
// 	  // log out any errors and responses
// 	  console.log(error, data);
// 	  // If our search request to the server had no errors...
// 	  if (!error) {
// 	  	// ...then we grab the ID of the tweet we want to retweet...
// 		var retweetId = data.statuses[0].id_str;
// 		// ...and then we tell Twitter we want to retweet it!
// 		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
// 			if (response) {
// 				console.log('Success! Check your bot, it should have retweeted something.')
// 			}
// 			// If there was an error with our Twitter call, we print it out here.
// 			if (error) {
// 				console.log('There was an error with Twitter:', error);
// 			}
// 		})
// 	  }
// 	  // However, if our original search request had an error, we want to print it out here.
// 	  else {
// 	  	console.log('There was an error with your hashtag search:', error);
// 	  }
// 	});
// }
//
// // Try to retweet something as soon as we run the program...
// retweetLatest();
// // ...and then every hour after that. Time here is in milliseconds, so
// // 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
// setInterval(retweetLatest, 1000 * 60 * 60);
