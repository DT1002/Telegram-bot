# Telegram机器人基于Google Apps Script
这是一个基于Google Apps Script的Telegram机器人，旨在自动处理和响应用户的消息，并提供丰富的交互体验。

#主要特点
- 实时消息处理：利用Telegram的Webhooks技术，实现实时消息接收。
- 多种消息格式：支持Markdown和HTML消息格式化，增强消息的可读性。
- 电子邮件集成：通过GmailApp服务，机器人可以自动将接收到的消息转发为电子邮件。
- 丰富的交互设计：包括键盘按钮、内联按钮和特定命令响应。
- 广告和长文本管理：自动删除广告消息和长文本消息，维护群组的消息质量。

#如何使用
- 设置：首先，您需要在Google Apps Script中设置您的项目，并确保已启用相关的Google服务。
- 配置：在Code.gs中配置您的Telegram bot token和其他相关设置。
- 部署：部署您的Apps Script项目为一个web应用，并设置正确的访问权限。
- 在Telegram中设置Webhook：使用Telegram Bot API设置webhook，指向您的Apps Script web应用URL。
