function AutoSendMessage11() {
var L ='<b>➖➖🚀北斗TG会员充值平台🚀➖➖</b>\n\
<b>担保额度全网最高.诚信至上.服务至上，价格全网最低。</b>\n\
<b>联系客服购买:<a href="https://t.me/BD_CJHY">👉点击联系客服🧑🏿‍💻</a></b>'
         var payload = {
           "method": "sendPhoto",
           "chat_id":"@teleVipnews",
           'parse_mode':'HTML',
           "photo":"https://t.me/sese_bd/54",
           "caption": L,
           "protect_content":true
           };
         var inlineKeyboardMarkup = {};
            inlineKeyboardMarkup.inline_keyboard = [];
            var keyboardRow = [];
            var keyboardButton1 = {
                text: "购买会员",
                url: "https://t.me/BDSY_VIP"
            }
            keyboardRow.push(keyboardButton1);
            inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
            payload.reply_markup = inlineKeyboardMarkup;
         postTelegram(payload);
 }

function postTelegram(payload) {
  var data = {
    'contentType': 'application/json',
    "method": "post",
    "payload": JSON.stringify(payload)
  }
  
  // 没有数据库的小伙伴可以删除以下这行

  var response = UrlFetchApp.fetch("https://api.telegram.org/bot5634966285:AAHM3X12fPvCs9mYbaNPNYV0FF_DHJ-76qA/", data);
  var res = JSON.parse(response);
  // 没有数据库的小伙伴可以删除以下这行

  return res;
}

function AutoSendVdeo() {
  var payload = {
    "method": "sendVideo",
    "chat_id": -1001776372912,
    "video": ""
  };
  postTelegram(payload);
}
 
 
function AutoTask() {
  AutoSendMessage();
  AutoSendPhoto();
}