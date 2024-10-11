// server.js
const WebSocket = require('ws');

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ port: 8088 });

// 连接事件
wss.on('connection', (ws) => {
    console.log('Client connected.');

    // 监听客户端消息
    ws.on('message', (message) => {
        // 将接收到的 Buffer 转换为字符串
        const receivedMessage = Buffer.isBuffer(message) ? message.toString() : message;
        console.log('Received: ', receivedMessage);

        // 发送消息回客户端
        ws.send(`Server received: ${receivedMessage}`);
    });

    // 连接关闭事件
    ws.on('close', () => {
        console.log('Client disconnected.');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');