let params = process.argv.slice(2)
let config = {}
let args = []
for (let i = 0; i < params.length; i++) {
    let param = params[i]
    if (param.indexOf('=') > -1) {
        let [key, value] = param.split('=')
        config[key] = value
    } else {
        args.push(param)
    }
}

module.exports = {config, args}
