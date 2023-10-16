function AutoSendMessage15() {
         var payload = {
           "method": "sendMediaGroup",
           "chat_id":"@sdfasf3",
          "media":[{
            "type":"photo",
            "media":"https://t.me/videoBDSY/8",
            "caption":"中通推码 男的不要 年龄小的不要 秒删的不要"
          },
          {
            "type":"photo",
            "media":"https://t.me/videoBDSY/9",
          },
          {
            "type":"photo",
            "media":"https://t.me/videoBDSY/10",
          },
          ]
         }
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