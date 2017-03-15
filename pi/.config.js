module.exports = {
    volume: {
        up: {
            remote: 'soundbar',
            keyCode: ['KEY_VOLUMEUP', 'KEY_VOLUMEUP'],
            iterations: 2,
        },
        down: {
            remote: 'soundbar',
            keyCode: ['KEY_VOLUMEDOWN', 'KEY_VOLUMEDOWN'],
            iterations: 2,
        }
    },
    source: {
        fios: {
            remote: 'fios',
            keyCode: 'KEY_FN',
        },
        soundbar: {
            keyCode: 'KEY_FN',
            iterations: 2,
        }
    }
};
