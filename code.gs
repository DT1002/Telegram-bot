function doGet(e){
  return HtmlService.createHtmlOutput("Hello World!! No, this link should be hidden!!!");
   
 //  return HtmlService.createHtmlOutputFromFile('Index');
}
 
 
function doPost(e){
  var body = JSON.parse(e.postData.contents);

// 检查是否存在消息和文本
  if (body.message && body.message.text) {
    var userMessage = body.message.text;
    var userName = body.message.from.first_name || "匿名用户";
    
    // 使用GmailApp发送邮件
    sendEmail(userName, userMessage);
  }
   
  var payload = preparePayload(body);
   
  var payloads;
 
  if (Array.isArray(payload)){
    payloads = payload;
  } else {
    payloads = [payload]
  }
 
  for (var i = 0; i < payloads.length; i++){
    payload = payloads[i];
    if (payload){
      var res = postTelegram(payload);
    }
  }
 
}

function saveToMongoDB(userId, firstName, username) {
    var mongoDbUrl = "YOUR_MONGODB_API_ENDPOINT"; //例如: https://cloud.mongodb.com/api/atlas/v1.0/groups/YOUR_GROUP_ID/databases/YOUR_DB/collections/YOUR_COLLECTION
    var apiKey = "YOUR_MONGODB_API_KEY";

    var data = {
        "uid": userId,
        "name": firstName,
        "nickname": username
    };

    var options = {
        "method": "POST",
        "headers": {
            "Authorization": "Bearer " + apiKey,
            "Content-Type": "application/json"
        },
        "payload": JSON.stringify(data)
    };

    UrlFetchApp.fetch(mongoDbUrl, options);
}

function sendEmail(userName, userMessage) {
  var emailAddress = "williamchen19990823@gmail.com";  // 替换为甲方的邮箱地址
  var subject = "新的Telegram消息来自 " + userName;
  var messageBody = "来自 " + userName + " 的消息:\n\n" + userMessage;
  
  GmailApp.sendEmail(emailAddress, subject, messageBody);
}
 
function postTelegram(payload) {
  var data = {
    'contentType': 'application/json',
    "method": "post",
    "payload": JSON.stringify(payload)
  }
   
  var response = UrlFetchApp.fetch("https://api.telegram.org/bot5634966285:AAHM3X12fPvCs9mYbaNPNYV0FF_DHJ-76qA/", data);
  var res = JSON.parse(response);
  return res;
}

function getName(user) {
  var name = user.first_name;
  if (user.last_name) {
    name += " " + user.last_name;
  }
 
  return name;
}
 
function escapeMarkDown(toEscapeMsg) {
  var escapedMsg = toEscapeMsg
  .replace(/_/g, "\\_")
  .replace(/\*/g, "\\*")
  .replace(/\[/g, "\\[")
  .replace(/`/g, "\\`");
    return escapedMsg;
}
 
 
function getMentionName(user) {
  var username = user.username;
  var mentionName = "";
 
  var name = getName(user);
  if (!name) {
    name = "神秘人";
  }
 
  // if (!username) {
    mentionName = getMarkDownUserUrl(escapeMarkDown(name), user.id);
  // } else {
  //   mentionName = "[" + escapeMarkDown(name) + "](@" + escapeMarkDown(username) + ")";
  // }
 
  return mentionName;
}
 
function getMarkDownUserUrl(userName, userId) {
  return "[" + userName + "](tg://user?id=" + userId + ")";
}
 
 
function preparePayload(body){
  var payload;
   
  if (body.message) {
    body.message.chat.id = body.message.chat.id + '';
  }
  //功能：点击按钮后自动发相应的消息``````````````````````````````````````````````````````````````````````````````````````````````````````````````
  var H ='<b>商品:</b>3个月会员(25u)\n\
<b>请支付：</b><u>25U</u>\n\
<b>支付到：(点击地址复制)\n</b>\
<code>TSzVNgdHfTdvG8qpKMGLADj5Zrp2ehX3Lj\n</code>\n\
<b>温馨提示：请在 15 分钟 内完成支付。</b>\n\
<b>支付完成后请务必将  <u>转账截图</u>  以及  <u>需要开通会员账号</u>  发给下方客服人员。</b>'

 var J ='<b>商品:</b>6个月会员(40u)\n\
<b>请支付：</b><u>40U</u>\n\
<b>支付到：(点击地址复制)\n</b>\
<code>TSzVNgdHfTdvG8qpKMGLADj5Zrp2ehX3Lj\n</code>\n\
<b>温馨提示：请在 15 分钟 内完成支付。</b>\n\
<b>支付完成后请务必将  <u>转账截图</u>  以及  <u>需要开通会员账号</u>  发给下方客服人员。</b>'

var K ='<b>商品:</b>12个月会员(68u)\n\
<b>请支付：</b><u>68U</u>\n\
<b>支付到：(点击地址复制)\n</b>\
<code>TSzVNgdHfTdvG8qpKMGLADj5Zrp2ehX3Lj\n</code>\n\
<b>温馨提示：请在 15 分钟 内完成支付。</b>\n\
<b>支付完成后请务必将  <u>转账截图</u>  以及  <u>需要开通会员账号</u>  发给下方客服人员。</b>'
  if (body.callback_query) {
      payload = {
        "method": "sendMessage",
        "chat_id": body.callback_query.message.chat.id,
        "text": "qq",
        "parse_mode": "Markdown",
        "disable_web_page_preview": true,
        "protect_content":true
       };
       payload.text = "您好!";
       payload.text += "下面显示是业务导航:";         
    //返回
      if(body.callback_query.data.indexOf("返回") === 0){
         var U ='<b>开通飞机高级会员服务。限制翻倍，防假冒，防止注销和封号，更安全，更放心，享受VIP般的待遇。3分钟即可点亮星星。\n</b>\
<b>了解会员特权：</b><a href="https://t.me/teleVipnews/7">高级会员\n\n</a>\
<b>您还可以帮朋友开通会员（注意：请务必核对并确认账号）</b>'
         payload = {
          "method": "editMessageCaption",
          "chat_id": body.callback_query.message.chat.id,
          "message_id": body.callback_query.message.message_id,
          "caption":U,
          "parse_mode": 'HTML',
          "disable_web_page_preview": false,
        };
//         payload.caption = "开通飞机高级会员服务。限制翻倍，防假冒，防止注销和封号，更安全，更放心，享受VIP般的待遇。3分钟即可点亮星星。\n\n"
//         +"您还可以帮朋友开通会员（注意：请务必将对方的账号发来）"


             ;
                        
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

           return payload;
      }
    //3月
      if(body.callback_query.data.indexOf("3月") === 0){
         payload = {
          "method": "editMessageCaption",
          "chat_id": body.callback_query.message.chat.id,
          "message_id": body.callback_query.message.message_id,
          "caption":H,
          "parse_mode": 'HTML',
          "disable_web_page_preview": false,
        };
        var inlineKeyboardMarkup = {};
          inlineKeyboardMarkup.inline_keyboard = [];
          var keyboardRow = [];
          var keyboardButton1 = {
            text: "会员客服",
            url: "https://t.me/BD_CJHY"
          };
          var keyboardRow1 = [];
          var keyboardButton2 = {
            text: "返回上级",
            callback_data: "返回"
          };
          keyboardRow.push(keyboardButton1);
          keyboardRow1.push(keyboardButton2);
          inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
          inlineKeyboardMarkup.inline_keyboard.push(keyboardRow1);
          payload.reply_markup = inlineKeyboardMarkup;
      };
    //6月
      if(body.callback_query.data.indexOf("6月") === 0){ 
         payload = {
          "method": "editMessageCaption",
          "chat_id": body.callback_query.message.chat.id,
          "message_id": body.callback_query.message.message_id,
          "caption":J,
          "parse_mode": 'HTML',
          "disable_web_page_preview": false,
        };
        var inlineKeyboardMarkup = {};
          inlineKeyboardMarkup.inline_keyboard = [];
          var keyboardRow = [];
          var keyboardButton1 = {
            text: "会员客服",
            url: "https://t.me/BD_CJHY"
          };
          var keyboardRow1 = [];
          var keyboardButton2 = {
            text: "返回上级",
            callback_data: "返回"
          };
          keyboardRow.push(keyboardButton1);
          keyboardRow1.push(keyboardButton2);
          inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
          inlineKeyboardMarkup.inline_keyboard.push(keyboardRow1);
          payload.reply_markup = inlineKeyboardMarkup;
      }
    //12月
      if(body.callback_query.data.indexOf("12月") === 0){ 
        payload = {
          "method": "editMessageCaption",
          "chat_id": body.callback_query.message.chat.id,
          "message_id": body.callback_query.message.message_id,
          "caption":K,
          "parse_mode": 'HTML',
          "disable_web_page_preview": false,
        };
         //payload.caption =K;
        var inlineKeyboardMarkup = {};
          inlineKeyboardMarkup.inline_keyboard = [];
          var keyboardRow = [];
          var keyboardButton1 = {
            text: "会员客服",
            url: "https://t.me/BD_CJHY"
          };
          var keyboardRow1 = [];
          var keyboardButton2 = {
            text: "返回上级",
            callback_data: "返回"
          };
          keyboardRow.push(keyboardButton1);
          keyboardRow1.push(keyboardButton2);
          inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
          inlineKeyboardMarkup.inline_keyboard.push(keyboardRow1);
          payload.reply_markup = inlineKeyboardMarkup;
      };
      return payload;
  }
//欢迎------------------------------------------------------------------------------------------------------------------------------------------
  if (body.message.new_chat_member) {
     payload = {
        "method": "sendMessage",
        "chat_id": body.message.chat.id,
        "text": "你好， 欢迎加入本群",
        "parse_mode": "Markdown",
        "disable_web_page_preview": true,
        "protect_content":true
      }
    var mentionName = getMentionName(body.message.from);
         payload.text = "*您好!*" + mentionName;
         payload.text += "*,欢迎加入北斗TG会员充值群.*\n";
         payload.text += "[👉点击查看会员特权](https://t.me/BDSY_VIP/1186)";
         
    //删除含有广告的的用户
    var payloads=[];
    payloads.push(payload);
    var payload2 = {
      "method": "restrictChatMember",
      "chat_id": body.message.chat.id,
      "user_id": body.message.new_chat_member.id,
      "can_send_messages": false,
      "can_send_media_messages": false,
      "can_send_other_messages": false,
      "can_add_web_page_previews": false,
    };
    if (getName(body.message.new_chat_member).indexOf("广告") >= 0) {
      payloads.push(payload2);
    }
    return payloads;
  }
//置顶感谢----------------------------------------------------------------------------------------------------------------------------
   if (body.message.pinned_message) {
    payload = {
        "method": "sendMessage",
        "chat_id": body.message.chat.id,
        "text": "",
        "parse_mode": "Markdown",
        "disable_web_page_preview": true,
        "protect_content":true
      } 
    var whoPinned = getName(body.message.from);
    var whoOwned = getName(body.message.pinned_message.from);
 
    payload.text = whoPinned + "*置顶了一条消息:*\n\n" + body.message.pinned_message.text+"\n\n*请注意查看*🔍";
//      + "本BOT代表" + whoOwned + "感谢您";
    return payload;
  }
 
 
  body.message.text = body.message.text.toLowerCase();
  body.message.text = body.message.text.replace(/@temptestbot2/g, '');
   
  var paras = body.message.text.trim().split(" ");
  // remove empty strings
  paras = paras.filter(function(para){
    if (para){
      return true;
    }
  });
   
   
 //关键字=========================================================================================================================================
  if (body.message.text){
      payload = {
        "method": "sendMessage",
        "chat_id": body.message.chat.id,
        "text": "",
        "parse_mode": "Markdown",
        "disable_web_page_preview": true,
        "protect_content":true
      } 
      
      if(body.message.text.indexOf("/sr") === 0){
         payload = {
        "method": "sendMessage",
        "chat_id": body.message.chat.id,
        "text": "",
        "parse_mode": "Markdown",
        "disable_web_page_preview": true,
        "protect_content":true
        } 
        var mentionName = getMentionName(body.message.from);
        payload.text = "您好！" + mentionName + "! ";
        payload.text += "欢迎使用本机器人。"+body.message.chat.id+"...."+body.message.from.id;
         return payload;
      }
    
      
//删除键盘按钮的操作_________________________________________________________________________________________
if(body.message.text.includes("关闭")){ 
      var replyKeyboardRemove = {
      remove_keyboard: true,
      selective: false //false就是把所有人的keyboard都删除掉，ture只会删除掉mention那个人的keyboard
      };
      payload.reply_markup = replyKeyboardRemove;
      payload.text = "您好！已经帮您删除掉keyborad";
      return payload;
}
//输入/service命令，执行弹出键盘的操作-------------------------------------------------------------------------------------------------
      if(body.message.text.includes("/start")){      
         payload = {
        "method": "sendMessage",
        "chat_id": body.message.chat.id,
        "text": "hi你好"+body.message.from.username,
        "parse_mode": "Markdown",
        "disable_web_page_preview": true,
        "protect_content":true
      }
    var mentionName = getMentionName(body.message.from);
         payload.text = "您好!" +mentionName+",";
         payload.text += "北斗飞机会员bot将为您服务！";
         var command9 = [
           "💰会员价格",
           "投诉",
           "⚠️购买须知",
         ];         
          var replyKeyboardMarkup = {}; //键盘读取的markup
          replyKeyboardMarkup.keyboard = []; //
          replyKeyboardMarkup.resize_keyboard = true; //键盘是否可以改变大小
          replyKeyboardMarkup.one_time_keyboard = true; //键盘被点击之后是否可以自动的消失
          replyKeyboardMarkup.selective = true; //键盘是不是只显示点击该命令的人 所以需要mensionn人出来
           
          
          var count = 0;  //按钮的总数
          for (var i = 0; i < command9.length / 3; i++) {
            var keyboardRow = [];
            for (var j = 0; j < 3; j++) {
              var keyboardButton = {
                text: command9[i * 3 + j],
              };
              count++;
              keyboardRow.push(keyboardButton);
              if (count >= command9.length) {
                break;
              }
               
            }
            replyKeyboardMarkup.keyboard.push(keyboardRow);
          }
          
          payload.reply_markup = replyKeyboardMarkup;
          return payload;
      }
//客服—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    var Y='<b><a href="https://t.me/DT_1W">👉点击联系我的客服🧑🏿‍💻</a></b>';
      if(body.message.text.includes("客服")){      
         payload = {
        "method": "sendMessage",
        "chat_id": body.message.chat.id,
        "text":Y,
        "parse_mode": "html",
        "disable_web_page_preview": true,
        "protect_content":true
        }
         return payload;
      }
//投诉———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
var Y='<b><a href="https://t.me/BD_Enger">👉点击留言投诉📝</a>\n我们将24小时内给你答复，请耐心等待.</b>';
      if(body.message.text.includes("投诉")){      
         payload = {
        "method": "sendMessage",
        "chat_id": body.message.chat.id,
        "text":Y,
        "parse_mode": "html",
        "disable_web_page_preview": true,
        "protect_content":true
        }
         return payload;
      }
//建议———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    var mentionName = getMentionName(body.message.from);
    var Y='<b><a href="https://t.me/BD_Enger">👉点击留言建议📝</a>\n</b>';
      if(body.message.text.includes("建议")){      
         payload = {
        "method": "sendMessage",
        "chat_id": body.message.chat.id,
        "text":Y,
        "parse_mode": "html",
        "disable_web_page_preview": true,
        "protect_content":true
        }
         return payload;
      }
       
//TG会员频道————————————————————————————————————————————————————————————————————————————————————————————————————————————————————-——————      
if(body.message.text.indexOf("频道") === 0){
      var H='<b><a href="https://t.me/teleVipnews">👉点击进入频道📣</a></b>'   
        var payload = {
          "method": "sendMessage",
          "chat_id": body.message.chat.id,
          'parse_mode':'HTML',
          "text": H,
          "protect_content":true
        }; 
      return payload;
};
//TG会员特权详情————————————————————————————————————————————————————————————————————————————————————————————————————————
if(body.message.text.indexOf("特权") === 0){   
         var L ='<b>担保额度全网最高.诚信至上.服务至上，价格全网最低。</b>\n\
<b>联系客服购买:<a href="https://t.me/DT_1W">👉点击联系客服🧑🏿‍💻</a></b>'
         var payload = {
           "method": "sendPhoto",
           "chat_id":-1001776372912,
           'parse_mode':'HTML',
           "photo":"https://postimg.cc/r0jhGyW6",
           "caption": L,
           "protect_content":true
           };
         var inlineKeyboardMarkup = {};
            inlineKeyboardMarkup.inline_keyboard = [];
            var keyboardRow = [];
            var keyboardButton1 = {
                text: "TG客服🧑🏿‍💻",
                url: "https://t.me/DT_1W"
            }
            keyboardRow.push(keyboardButton1);
            inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
            payload.reply_markup = inlineKeyboardMarkup;
         return payload;
      };

//购买会员——————————————————————————————————————————————————————————————————————————————————————————————————————————————
var M ='<b>开通飞机高级会员服务。限制翻倍，防假冒，防止注销和封号，更安全，更放心，享受VIP般的待遇。3分钟即可点亮星星。\n</b>\
<b>了解会员特权：</b><a href="https://t.me/teleVipnews/7">高级会员\n\n</a>\
<b>您还可以帮朋友开通会员（注意：请务核对并确认账号）</b>'
    if(body.message.text.indexOf("购买") === 0){
     var payload = {
        "method": "sendVideo",
        "chat_id":-1001776372912,
        "video": "https://t.me/sese_bd/57",
        'parse_mode':'HTML',
        "caption": M,
      };
    payload.caption = M;
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
//发广告 实行删除广告信息 提出群聊 或者 禁言__________________________________________________________________________________________________
    if(body.message.text.indexOf("https:") === 0){
      var payload = {
        "method": "deleteMessage",
        "message_id": body.message.message_id,
        "chat_id": body.message.chat.id
      };
      var payloads = [];
      payloads.push(payload);
      
      //提出群聊
//    var payload1 = {
//    "method": "kickChatMember",
//    "chat_id": body.message.chat.id,
//    "user_id": body.message.from.id,
//    };
      
      //禁言
      const unixTime = Math.floor(Date.now() / 1000);
      const time01=unixTime+86400;
      var payload2 = {
        "method": "restrictChatMember",
        "chat_id": body.message.chat.id,
        "user_id": body.message.from.id,
        "until_date":time01,
        "can_send_messages": false,
        "can_send_media_messages": false,
        "can_send_other_messages": false,
        "can_add_web_page_previews": false,
      };
      payloads.push(payload2);
      return payloads;
     }
//限制发消息超过10个字，超过则进行限制语言---------------------------------------------------------------------------------------------    
    if(body.message.text.length>=10){
      var payload = {
        "method": "deleteMessage",
        "message_id": body.message.message_id,
        "chat_id": body.message.chat.id
      };
      var payloads = [];
      payloads.push(payload);
      
      var payload2 = {
        "method": "sendMessage",
        "chat_id": body.message.chat.id,
        "text": "您好，北斗索引仅支持搜索，不支持聊天，您的消息已自动销毁，请谅解！",
        "parse_mode": "Markdown",
        "disable_web_page_preview": true,
        "protect_content":true
      };
      var mentionName = getMentionName(body.message.from);
      payload2.text = "您好,"+mentionName + "⚠️";
      payload2.text+="本群已开启【禁止长文字】请控制在10字以内,否则将会封禁⚠️"
      payloads.push(payload2);
      
      return payloads;
     }     
//脏话处理，对脏话进行封禁处理-------------------------------------------------------------------------------------------------------------------
    function grade01(){
      var payload = {
        "method": "deleteMessage",
        "message_id": body.message.message_id,
        "chat_id": body.message.chat.id
      };
      var payloads = [];
      payloads.push(payload);
     //禁言
      const unixTime = Math.floor(Date.now() / 1000);
      const time01=unixTime+3600;
      var payload1 = {
        "method": "restrictChatMember",
        "chat_id": body.message.chat.id,
        "user_id": body.message.from.id,
        "until_date":time01,
        "can_send_messages": false,
        "can_send_media_messages": false,
        "can_send_other_messages": false,
        "can_add_web_page_previews": false,
      }
//      payloads.push(payload1);
      var T='<b>您好!请文明辞词.</b>';
      var payload2 = {
        "method": "sendMessage",
        "chat_id": body.message.chat.id,
        "text":T,
        "parse_mode":"HTML",
        "disable_web_page_preview": true,
        "protect_content":true
      };
      var mentionName = getMentionName(body.message.from);
      payloads.push(payload2);
      
      return payloads;
    }
    var data=["病","妈逼","傻逼","麻痹","妈b","死","草","操","孙","儿子","爸","垃圾","lj","老母","家铲","肺","抄","曹","尼玛","马","艹","辣鸡","拉基","爷","你妈","擦"];
    for (var i = 0; i < data.length; i++) {
      if(body.message.text.includes(data[i])){
         return grade01();
      }
    }
  }
}