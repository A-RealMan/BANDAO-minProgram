import {
    HTTP
}
from '../until/http-p.js'


class KeywordModel extends HTTP{
    key='q'
    maxLength=10
    getHistory(){
        const words=wx.getStorageSync(this.key)
        if(!words){
            return []
        }

        return words
    }

    getHot(){
        return this.request({
            url:'book/hot_keyword'
        })
    }

    addToHistroy(keyword){
        let words=this.getHistory()
       const has= words.includes(keyword)
        if(!has){
            // 先把末尾的删除 然后再添加
            const length=words.length
            if(length>=this.maxLength){
                words.pop()
            }
            words.unshift(keyword)
            wx.setStorageSync(this.key, words)
        }
      
    }
}
export {KeywordModel}