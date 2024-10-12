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