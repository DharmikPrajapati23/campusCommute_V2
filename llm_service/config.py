import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

HUGGINGFACE_API_KEY=os.getenv("HUGGINGFACE_API_KEY")
HF_MODEL=os.getenv("HF_MODEL")