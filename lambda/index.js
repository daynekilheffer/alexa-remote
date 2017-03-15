const Alexa = require('alexa-sdk');
const piApi = require('./pi-api');
const generateVolumeIntent = require('./volume-intent-generator');

const handlers = {
    NewSession: function () {
        if (this.event.request.type === 'IntentRequest') {
            this.emitWithState(this.event.request.intent.name);
        } else {
            this.emit(':ask', 'universal remote started');
        }
    },
    Unhandled: function () {
        this.emit(':ask', `I don't know what you want me to do.`)
    },
    PowerIntent: function () {
        var device = this.event.request.intent.slots.Device.value || this.attributes.device;
        if (device) {
            piApi.power(device, (err, result) => {
                if (err) {
                    console.log(err, result);
                    this.emit(':ask', 'that was a powerful error', '');
                }
                var msg = `power button pressed for ${device}`;
                this.emit(':ask', msg, '')
            })
        } else {
            var msg = 'I do not know which device to interact with.';
            this.emit(':ask', msg, '')
        }
    },
    DeviceIntent: function () {
        const device = this.event.request.intent.slots.Device.value;
        const msg = `${device} is not active.`;
        Object.assign(this.attributes, {
            device: device,
        });

        this.emit(':ask', msg, '')
    },
    VolumeUpIntent: generateVolumeIntent('up'),
    VolumeDownIntent: generateVolumeIntent('down'),
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'OK, Goodbye!');
    }
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
