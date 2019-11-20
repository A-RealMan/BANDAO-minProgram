// components/search/index.js


import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'

import {
  paginationBev
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotwords: [],
    searching: false,
    q: '',
    loadingCenter:false
  },

  attached() {
    keywordModel.getHot().then(res => {
      this.setData({
        hotwords: res.hot
      })
    })

    this.setData({
      historyWords: keywordModel.getHistory()
    })

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 用户会同时发送多个请求
    // 强制一次只能发送一次请求
    // 引入锁的概念
    loadMore() {
      if(!this.data.q){
        return
      }
      if(this.islocked()){
        return
      }
     this.locked()
      if(this.hasMore()){
        bookModel.search(this.getCurrenStart(), this.data.q)
        .then(res => {
        this.setMoreData(res.books)
        this.unLocked()
        },()=>{
          this.unLocked()
        })
      }
      

    },
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
      this.setData({
        noneResult:false
      })
    },

    onConfirm(event) {
      this.showResult()
      this.initialize()
      this.showLoadingCenter()
      //拿到用户输入的关键字
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q: q
        })
        keywordModel.addToHistroy(q)
        this.hideLoadingCenter()
        console.log(res.books)
      })

    },

   
    showResult(){
      this.setData({
        searching: true
      })
    },
    closeResult(){
      this.setData({
        searching: false,
        noneResult:false
      })
    },
    showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    },
    onDelete(event) {
      this.closeResult()
    this.setData({
      q:''
    })
    }
  }
})