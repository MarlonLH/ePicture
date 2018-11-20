const apiUrl = 'https://api.imgur.com/3/'
const clientId = '6ecaa1d0f211536'
const cliendSecret = '6757136dd60d213b01fa95abba8c95cd82304263'

module.exports = {
    get (targetUrl) {
        return fetch(apiUrl + targetUrl, {
            headers: {
                'Authorization': 'Cliend ID' + clientId
            }
        })
        .then((res) => {
            return res.json()
        })
    }
}