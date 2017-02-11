const koa = require('koa');
const router = require('koa-route');
const bodyParser = require('koa-bodyparser');

const app = koa();
app.use(bodyParser());

const lirc = require('lirc_node');

lirc.init();

const doubleSends = {
    soundbar: true,
};

app.use(router.get('/remotes', function *(){
    this.body = lirc.remotes;
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
