const createWebSocket = (onMessage: (data: any) => void) => {
    let reconnectInterval = 3000;
    let isConnected = false;

    const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    socket.onopen = () => {
        console.log('WebSocket connected');
        isConnected = true;
        socket.send(
            JSON.stringify({
                event: 'subscribe',
                channel: 'book',
                symbol: 'tBTCUSD',
                freq: 'F0',
            })
        );
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            if (Array.isArray(data) && data[1] && Array.isArray(data[1])) {
                onMessage(data[1]);
            }
        } catch (error) {
            console.error('WebSocket data error:', error);
        }
    };

    socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
        isConnected = false;
    };

    socket.onclose = () => {
        console.warn('WebSocket closed. Attempting to reconnect...');
        isConnected = false;
        setTimeout(() => createWebSocket(onMessage), reconnectInterval);
    };

    return socket;
};

export default createWebSocket;
