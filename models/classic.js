import {
    HTTP
} from '../until/http.js'

class ClassicModel extends HTTP {
    getLatest(sCallback) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                sCallback(res)
                this._setLatestIndex(res.index)
                let key=res.index
                wx.setStorageSync(this._getKey(key),res)
            }
        })
    }

    getClassic(index, nextOrPrevious, sCallback) {

        // 在缓存中寻找 没找到 向API发送请求 然后再缓存
        // key 确定key
        let key = nextOrPrevious == 'next' ?
            this._getKey(index + 1) : this._getKey(index - 1)
        let classic = wx.getStorageSync(key)
        if (!classic) {
            this.request({  
                url: 'classic/' + index + '/' + nextOrPrevious,
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.index), res)
                    sCallback(res)
                }
            })
        }else{
            sCallback(classic)
        }

    }



    isFirst(index) {
        return index == 1 ? true : false
    }

    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return latestIndex == index ? true : false
    }

    //缓存最新的序号
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }

    // 获取缓存中的最新序号
    _getLatestIndex() {
        let index = wx.getStorageSync('latest')
        return index
    }

    // 产生key用于缓存数据
    _getKey(index) {
        let key = 'classic-' + index
        return key
    }

    getMyFavor(success){
        const params={
            url:'classic/favor',
            success:success
        }
        this.request(params)
    }
}
export {
    ClassicModel
}