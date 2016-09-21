exports.handler = function( event, context ) {
    var duo_api = require('./lib/duo_api');
    const winston = require('winston');
    
    var duo_ikey = process.env.DUO_IKEY;
    var duo_skey = process.env.DUO_SKEY;
    var duo_host = process.env.DUO_HOST;
    var msg = encodeURIComponent(event.message);
    var cmd = encodeURIComponent(event.command);
    var date = encodeURIComponent(event.date);

    var client = new duo_api.Client(duo_ikey, duo_skey, duo_host);
    // Configure logger
    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({'timestamp':true})
        ]
    });
    
    // Should probably ping(), check() and preauth() first before trying to auth...?
    
    client.jsonApiCall(
        'POST',
        '/auth/v2/auth',
        {
            username: event.username,
            factor: 'auto',
            device: 'auto',
            type: 'Sensitive Command Confirmation',
            pushinfo: 'Message=' + msg + '&Command=' + cmd + '&Date=' + date
        },
        function(res) {
            if (res.stat !== 'OK') {
                console.error('DUO API call returned error: '
                              + res.message);
                process.exit(1);
            }
            res = res.response;
            if (res.result !== 'allow') {
                switch (res.status) {
                case 'deny':
                case 'fraud':
                    logger.error('Watchman Event Denied!', {
                        user: event.username,
                        command: cmd,
                        date: date,
                        status: res.status
                    });
                    break;
                case 'timeout':
                    logger.warn('Watchman Event Confirmation Timedout', {
                        user: event.username,
                        message: msg,
                        command: cmd,
                        date: date
                    });
                    break;
                }
            }
            // console.log('status = ' + res.status);
    });    
}




