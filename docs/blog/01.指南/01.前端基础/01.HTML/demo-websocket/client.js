// client.js
const socket = new WebSocket('ws://localhost:8080');

// 连接打开时的回调
socket.onopen = function(event) {
    console.log('WebSocket is open now.');
    socket.send('Hello, Server!');
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
    socket.send(message);
    input.value = ''; // 清空输入框
}