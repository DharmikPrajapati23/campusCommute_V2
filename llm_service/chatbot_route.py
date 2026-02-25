from fastapi import APIRouter, Depends

from chatbot_dto import ChatRequest, ChatResponse
from chatbot_service import ChatbotService
from service_dependency import get_chatbot_service

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])


@router.post("/chat", response_model=ChatResponse)
async def chat(
    chat_request: ChatRequest,
    chatbot_service: ChatbotService = Depends(get_chatbot_service)
):
    response = chatbot_service.chat(chat_request)
    return ChatResponse(response=response)