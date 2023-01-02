// https://www.digitalocean.com/community/tutorials/angular-custom-webpack-config
module.exports = {
    resolve: {
        modules: [],
        fallback: {
            fs: false,
            path: false,
            crypto: false
        }
    }
};