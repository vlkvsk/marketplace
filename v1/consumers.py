from channels.generic.websocket import AsyncWebsocketConsumer
import json
from datetime import datetime

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = "chat"
        self.room_group_name = f"chat_{self.room_name}"
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['text']
        nickname = data['nickname']
        timestamp = datetime.now().isoformat()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'nickname': nickname,
                'timestamp': timestamp,
            }
        )

    async def chat_message(self, event):
        message = event['message']
        nickname = event['nickname']
        timestamp = event['timestamp']
        
        await self.send(text_data=json.dumps({
            'message': message,
            'nickname': nickname,
            'timestamp': timestamp,
        }))
