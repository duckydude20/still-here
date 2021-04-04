module.exports = {
    launch: {
        headless: false,
        slowMo: 0,
        devtools: false,
    },
    server: {
        command: 'yarn http-server build/src -a localhost -p 3030',
        port: 3030,
    }
}