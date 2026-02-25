from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chatbot_route import router as chatbot_router

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"]
    # allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "CampusCommute HuggingFace Chatbot Running 🚀"}


# Register chatbot routes
app.include_router(chatbot_router)