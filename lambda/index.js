const Alexa = require('alexa-sdk');

const handlers = {
    NewSession: function () {
        this.emit(':tell', 'Universal remote activated')
    },
    PowerIntent: function () {
        console.log(this.event.request.intent);
        this.emit(':tell', 'power button pressed')
    },
    SourceIntent: function () {
        const device = this.event.request.intent.slots.Device;
        Object.assign(this.attributes, {
            device: device,
        });
        this.emit(':tell', `activated ${device}`)
    }
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
