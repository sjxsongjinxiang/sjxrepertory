// pages/express/express.js  javascript
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ary:"",
    expressID:0,
    numCode:"",
    index:0,
    list: ["请选择快递公司", "中通快递", "圆通快递", "韵达快递", "百世快递", "申通快递", "EMS", "天天快递", "京东物流", "顺丰速运", "优速快递", "德邦快递", "快捷快递", "宅急送", "TNT快递", "UPS", "DHL", "FEDEX联邦(国内件)", "FEDEX联邦(国际件)"],
    ArrayObject: [
      { id: 0, name: "请选择快递公司" },
      { id: "ZTO", name: "中通快递" },
      { id: "YTO", name: "圆通快递" },
      { id: "YD", name: "韵达快递" },
      { id: "HTKY", name: "百世快递" },
      { id: "STO", name: "申通快递" },
      { id: "EMS", name: "EMS" },
      { id: "HHTT", name: "天天快递" },
      { id: "JD", name: "京东物流" },
      { id: "SF", name: "顺丰速运" },
      { id: "UC", name: "优速快递" },
      { id: "DBL", name: "德邦快递" },
      { id: "FAST", name: "快捷快递" },
      { id: "ZJS", name: "宅急送" },
      { id: "TNT", name: "TNT快递" },
      { id: "UPS", name: "UPS" },
      { id: "DHL", name: "DHL" },
      { id: "FEDEX", name: "FEDEX联邦(国内件)" },
      { id: "FEDEX_GJ", name: "FEDEX联邦(国际件)" },
    ],
  },
  getExpressInfo:function(e){
    /**
     * 实现查询思路
     * 1.先获得快递单号和快递公司
     * 2.验证数据有效性，如果不合格提示用户
     * 3.合格提交数据给用java封装api
     * 4.java封装api返回查询结果
     * 5.把返回查询结果处理，在页面中显示
     */

    var that = this;
    console.log(e);
    //1.先获得快递单号和快递公司
    //1.1获得快递单号
    var ecode = e.detail.value.ecode;
    //1.2获得快递公司
    var expressID = this.data.expressID;
    //测试快递单号和快递公司
    console.log("快递单号:" + ecode + " 快递公司:" + expressID);
    
    //2.验证数据有效性，如果不合格提示用户
    if (ecode==""){
       //提示用户
       wx.showModal({
         title: '温馨提示',
         content: '请输入快递单号',
       });
       return;
    }
    if (expressID == 0) {
      //提示用户
      wx.showModal({
        title: '温馨提示',
        content: '请选择快递公司',
      });
      return;
    }
    //3.合格提交数据给用java封装api
    wx.showLoading({
      title: '请稍等......',
    })
    //提交数据
    wx.request({
      dataType:"json",
      url: 'https://www.itlaobing.com/express/api',
      data:{
        nu: ecode,
        com: expressID
      },
      complete:function(arg2){
         wx.hideLoading();
      },
      success:function(arg){
        console.log(arg);
        if (arg.data.Success=="false"){
          wx.showModal({
            title: '温馨提示',
            content: arg.data.Reason,
          })
        }
        else{
          if (arg.data.Traces==undefined){
            wx.showModal({
              title: '温馨提示',
              content: '提交数据出错',
            })
            return;
          }
          if (arg.data.Traces.length==0)
          {
            wx.showModal({
              title: '温馨提示',
              content: arg.data.Reason,
            })
          }
          that.setData(
           {
            ary: arg.data.Traces
           }
          );
        } 
      },
    })

  },
  /*
  获得快递公司
  */
  getEnterPrise:function(e){
     console.log(e.detail.value);
     this.setData(
       {
         index: e.detail.value,
         expressID: this.data.ArrayObject[e.detail.value].id
       }
     );
    console.log(this.data.expressID);
  },
  /**
   * 能过扫描二维码获得快递单号
   */
  getnum:function(e){
    var that = this;
     wx.scanCode({
       scanType: [],
       success:function(arg){
          console.log(arg.result);
         that.setData(
           {
             numCode: arg.result
           }
         );
       }
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})