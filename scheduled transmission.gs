function AutoSendMessage() {
      var O ='<b>开通飞机高级会员服务。限制翻倍，防假冒，防止注销和封号，更安全，更放心，享受VIP般的待遇。3分钟即可点亮星星。\n\n</b>\
<b>您还可以帮朋友开通会员（注意：请务必核对并确认账号）</b>'
     var payload ={
        "method": "sendVideo",
        "chat_id":-1001776372912,
        "video": "https://t.me/sese_bd/57.https://t.me/sese_bd/56",
        'parse_mode':'HTML',
        "caption": O,
      };
    payload.caption = O;
            var inlineKeyboardMarkup = {};
            inlineKeyboardMarkup.inline_keyboard = [];
            var keyboardRow = [];
            var keyboardButton1 = {
                text: "北斗首页",
                url: "https://t.me/BeiDouSY"
            };
            var keyboardRow1 = [];
            var keyboardButton2 = {
                text: "3个月会员(25U)",
                callback_data: "3月"
            };
             
            var keyboardButton3 = {
                text: "6个月会员(40U)",
                callback_data: "6月"
            };
             
            var keyboardRow2 = [];
            var keyboardButton4 = {
                text: "12个月会员(68U)",
                callback_data: "12月"
            };
        
            keyboardRow.push(keyboardButton1);
            keyboardRow1.push(keyboardButton2);    
            keyboardRow1.push(keyboardButton3);
            keyboardRow2.push(keyboardButton4);
            inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
            inlineKeyboardMarkup.inline_keyboard.push(keyboardRow1);
            inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
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

  var response = UrlFetchApp.fetch("https://api.telegram.org/bot5774034266:AAH4sZRPC5bNl8LdMeZjotbLWE8KOxqNMCI/", data);
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