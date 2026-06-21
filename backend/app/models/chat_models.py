from pydantic import BaseModel

class SendMessage(BaseModel):
    chat_id: int
    sender_id: int
    receiver_id: int
    message_type: str
    message: str