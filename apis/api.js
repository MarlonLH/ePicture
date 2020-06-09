const apiUrl = 'https://api.imgur.com/3/'
const clientId = {CLIENT_ID}
const cliendSecret = {CLIENT_SECRET}

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
