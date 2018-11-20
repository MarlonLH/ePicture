const apiUrl = 'https://api.imgur.com/3/'
export const clientId = '6ecaa1d0f211536'
export const cliendSecret = '6757136dd60d213b01fa95abba8c95cd82304263'

module.exports = {
    get (targetUrl, autorization) {
        return fetch(apiUrl + targetUrl, {
            headers: {
                Authorization: autorization
            }
        })
        .then((res) => {
            return res.json()
        })
    },

    postImage (targetUrl, autorization, data) {
        return fetch(apiUrl + targetUrl, {
            method: 'POST',
            headers: {
                Authorization: 'Client-ID ' + clientId,
                Authorization: autorization,
            },
            body: JSON.stringify(data.data)
        })
        .then((res) => {
            return res.json()
        })
    },
}