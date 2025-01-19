const WS_URL = import.meta.env.VITE_WEBSOCKET_URL;

export class WebSocketService {
  constructor() {
    this.ws = null;
    this.subscribers = new Set();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    this.ws = new WebSocket(WS_URL);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;

      // Subscribe to market data
      const subscribeMessage = {
        method: 'subscribe',
        params: {
          channels: ['ticker'],
        },
        id: Date.now(),
      };

      this.ws.send(JSON.stringify(subscribeMessage));
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.subscribers.forEach((callback) => callback(data));
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => this.connect(), 5000);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.connect();
    }
    return () => this.subscribers.delete(callback);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export const websocketService = new WebSocketService();
