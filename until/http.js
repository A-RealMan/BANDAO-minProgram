import {
    config
} from '../config.js'

const tips = {
    1: '抱歉出现了一个错误',
    1005: 'appkey无效',
    3000: '期刊不存在'
}
class HTTP {
    request(params) {
        // URL,data,method,
        if (!params.method) {
            params.method = "GET"
        }
        wx.request({
            url: config.api_base_url + params.url,
            method: params.method,
            data: params.date,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            data:params.data,
            success: (res) => {
                let code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    params.success && params.success(res.data)
                } else {
                    let error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
             
        fail: (err) => {
            this._show_error(1)
        }
        })
       
    }
    _show_error(error_code) {
        wx.showToast({
            title: tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
}

export {
    HTTP
}