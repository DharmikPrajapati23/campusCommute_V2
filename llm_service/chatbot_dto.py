from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str
    user_name: str


class ChatResponse(BaseModel):
    response: str