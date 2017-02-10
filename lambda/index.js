const Alexa = require('alexa-sdk');

const handlers = {
    NewSession: function () {
        if (this.event.request.type === 'IntentRequest') {
            this.emitWithState(this.event.request.intent.name);
        }
    },
    PowerIntent: function () {
        var device = this.event.request.intent.slots.Device.value || this.attributes.device;
        if (device) {
            var msg = `power button pressed for ${device}`;
            this.emit(':ask', msg, msg)
        } else {
            var msg = 'I do not know which device to interact with.';
            this.emit(':ask', msg, msg)
        }
    },
    DeviceIntent: function () {
        const device = this.event.request.intent.slots.Device.value;
        const msg = `${device} is active`;
        Object.assign(this.attributes, {
            device: device,
        });

        this.emit(':ask', msg, msg)
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'OK, see ya!');
    }
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
