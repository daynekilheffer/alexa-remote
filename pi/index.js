const koa = require('koa');
const router = require('koa-route');
const bodyParser = require('koa-bodyparser');

const config = require('./.config');

const app = koa();
app.use(bodyParser());

const lirc = require('lirc_node');

lirc.init();

const doubleSends = {
    soundbar: true,
};

const send = (remoteName, keyCode, iterations = 1) => {
    if (lirc.remotes[remoteName]) {
        for (let i = 0; i < iterations; i++) {
            setTimeout(() => {
                lirc.irsend.send_once(remoteName, keyCode);
            }, i * 1000);
        }
        return true;
    }
    return false;
}

app.use(router.get('/remotes', function *(){
    this.body = lirc.remotes;
}));
app.use(router.post('/remotes/volume/:direction', function *(direction) {
    const { remote, keyCode, iterations = 1 } = config.volume[direction];
    const result = send(remote, keyCode, iterations);
    this.status = 204;
    if (!result) {
        this.status = 500;
    }
}));
app.use(router.post('/remotes/:name/source', function *(name) {
    const { remote = name, keyCode, iterations = 1 } = config.source[name];
    console.log(remote, keyCode, iterations)
    const result = send(remote, keyCode, iterations);
    this.status = 204;
    if (!result) {
        this.status = 500;
    }
}));
app.use(router.post('/remotes/:name/power', function *(name){
    console.log(this.request.path);
    if (lirc.remotes[name]) {
        lirc.irsend.send_once(name, "KEY_POWER");
        if (doubleSends[name]) {
            lirc.irsend.send_once(name, "KEY_POWER");
        }
        this.status = 204;
    } else {
        this.status = 500;
    }
}));

app.listen(3000);
console.log('listening on port 3000');
