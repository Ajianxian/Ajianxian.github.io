---
title: WebSocket实践
author: Ajianxian
createTime: 2024/10/11 15:05:14
tags:
  - Html5
  - websocket
permalink: /article/sh2x3he1/
---
下面是一个使用 WebSocket 技术的实际场景示例，它实现了一个简单的实时聊天应用。这个例子展示了如何使用 Node.js 和 WebSocket 库在服务器端处理多个客户端的连接，并在客户端之间实时地传递消息。

### 示例：实时聊天应用

#### 1. 项目结构

创建一个新的项目文件夹，命名为 `websocket-chat-app`，并在该文件夹中创建以下文件：

```
/websocket-chat-app
|-- server.js
|-- client.html
|-- client.js
```

#### 2. 编写 `server.js`

在 `server.js` 文件中，设置 WebSocket 服务器以处理多客户端连接和消息转发。

```javascript
// server.js
const WebSocket = require('ws');

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ port: 8080 });

// 存储连接的客户端
const clients = new Set();

// 连接事件
wss.on('connection', (ws) => {
    console.log('Client connected.');
    clients.add(ws);

    // 监听客户端消息
    ws.on('message', (message) => {
      // 将接收到的 Buffer 转换为字符串
      const receivedMessage = Buffer.isBuffer(message) ? message.toString() : message;
      console.log('Received: ', receivedMessage);

      // 广播消息给所有连接的客户端
      clients.forEach(client => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(`${receivedMessage}`);
          }
      });
    });

    // 连接关闭事件
    ws.on('close', () => {
        console.log('Client disconnected.');
        clients.delete(ws);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
```

#### 3. 编写 `client.html`

在 `client.html` 文件中，创建一个简单的用户界面，允许用户输入消息并显示聊天记录。

```html
<!-- client.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket Chat App</title>
    <script src="client.js" defer></script>
    <style>
        #messages {
            border: 1px solid #ccc;
            height: 300px;
            overflow-y: auto;
            padding: 10px;
            margin-bottom: 10px;
        }

        input {
            width: 80%;
            padding: 10px;
        }

        button {
            padding: 10px;
        }
    </style>
</head>
<body>
    <h1>WebSocket Chat App</h1>
    <div id="messages"></div>
    <input type="text" id="messageInput" placeholder="Type a message...">
    <button onclick="sendMessage()">Send Message</button>
</body>
</html>
```

#### 4. 编写 `client.js`

在 `client.js` 文件中，处理连接到 WebSocket 服务器、发送消息和接收消息的逻辑。

```javascript
// client.js
const socket = new WebSocket('ws://localhost:8080');

// 连接打开时的回调
socket.onopen = function(event) {
    console.log('WebSocket is open now.');
};

// 监听服务器发送的消息
socket.onmessage = function(event) {
    console.log('Message from server: ', event.data);
    // 显示消息在页面上
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<p>${event.data}</p>`;
};

// 处理连接关闭事件
socket.onclose = function(event) {
    console.log('WebSocket is closed now.');
};

// 处理错误事件
socket.onerror = function(error) {
    console.error('WebSocket error: ', error);
};

// 发送消息按钮事件
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value;
    if (message) {
        socket.send(message);
        input.value = ''; // 清空输入框
    }
}
```

#### 5. 安装依赖

在项目目录中打开终端，确保你在项目的根目录下，然后运行以下命令安装 `ws` 库：

```bash
npm init -y          # 如果还没有 package.json 文件，可以先初始化项目
npm install ws       # 安装 WebSocket 库
```

#### 6. 启动 WebSocket 服务器

在终端中运行以下命令来启动 WebSocket 服务器：

```bash
node server.js
```

你应该能看到输出：

```
WebSocket server is running on ws://localhost:8080
```

#### 7. 启动客户端

打开 `client.html` 文件，可以通过浏览器直接打开（双击文件或右键选择“在浏览器中打开”）。打开后，你应该会看到一个简单的用户界面，其中有一个输入框和一个发送按钮。

#### 8. 进行测试

1. **打开多个浏览器窗口**：你可以在多个浏览器窗口或标签页中打开 `client.html` 文件。
2. **发送消息**：在每个窗口中输入消息并点击“Send Message”按钮。
3. **实时聊天**：所有浏览器窗口都应该能看到发送的消息，实现实时聊天效果。

### 总结

通过上述步骤，你成功创建了一个基本的 WebSocket 实时聊天应用。在这个应用中：

- 客户端通过 WebSocket 连接到服务器。
- 服务器接收来自任意客户端的消息，并将消息广播到所有其他连接的客户端。
- 用户可以在不同的浏览器窗口中实时聊天。

这个例子展示了 WebSocket 在实时通信中的应用和优势，能够轻松扩展以支持更多功能，如用户身份验证、聊天记录存储等。