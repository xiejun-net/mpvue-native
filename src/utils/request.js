let apiHost = ''
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
function wxRequest(url, data, cookie, method = 'POST') {
    return new Promise((resolve, reject) => {
        wx.request({
            url: apiHost + url,
            data: data,
            method: method,
            header: {
                'content-type': 'application/json',
                Cookie: cookie,
                'Authorization': wx.getStorageSync('userToken'),
            },
            success: function (res) {
                if (parseInt(res.data.status) === 200) {
                    resolve(res.data.data)
                } else if (res.data.success) {
                    resolve(res.data.data || '')
                } else {
                    reject(res.data)
                }
            },
            fail: function (err) {
                console.log(err)
                reject(err.data)
            }
        })
    })
}
export default {
    post(url, data, cookie) {
        return wxRequest(url, data, cookie, 'POST')
    },
    httpGet(url, data, cookie) {
        return wxRequest(url, data, cookie, 'GET')
    },
    postForm(url, data, cookie) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: apiHost + url,
                data: data,
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    Cookie: cookie,
                    'Authorization': wx.getStorageSync('userToken')
                },
                success: function (res) {
                    if (res.data.success) {
                        resolve(res.data.data)
                    } else {
                        reject(res.data)
                    }
                },
                fail: function (err) {
                    reject(err.data)
                }
            })
        })
    }
}
