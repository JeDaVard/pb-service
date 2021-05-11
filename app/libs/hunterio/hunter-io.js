const fetch = require('node-fetch');

class HunterIO {
    constructor(opts) {
        if (!opts.apiKey) throw new Error('Need HunterIO api key!');
        this.apiKey = opts.apiKey;
    }
    _getDomainSearchUrl(domain) {
        return `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${this.apiKey}`;
    }
    async getInfo(domain) {
        const url = this._getDomainSearchUrl(domain);
        const response = await fetch(url);
        return response.json();
    }
}

module.exports = HunterIO;
