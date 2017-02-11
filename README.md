# alexa-remote

Hook Alexa up to an infrared universal remote running on a raspberry pi.

## sub-projects

### skill/

The skill definition used to configure alexa.

### lambda/

The lambda function invoked via the skill that interprets the request and communicates with the pi.

### pi/

The pi web server that listens for requests and executes the `lirc` commands needed to fire infrared commands.


## notes

This is currently in development, and based on the current Alexa API limitations, I'm not sure how far it will even go.

It is only a hobby, but I welcome feedback.
