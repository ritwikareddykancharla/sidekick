import os
import json
from google import genai
from google.genai import types
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
from .tools import tools

load_dotenv()

class ChatRequest(BaseModel):
    message: str
    history: List[dict] = []

class ChatResponse(BaseModel):
    response: str
    tool_calls: List[str] = []

class NexusAgent:
    def __init__(self):
        self._client = None
        self.model_id = "gemini-2.0-flash"

    @property
    def client(self):
        if self._client is None:
            api_key = os.getenv("GOOGLE_API_KEY")
            if not api_key:
                raise ValueError("GOOGLE_API_KEY not set.")
            self._client = genai.Client(api_key=api_key)
        return self._client

    async def chat(self, request: ChatRequest) -> ChatResponse:
        contents = [
            types.Content(
                role="user" if msg['role'] == 'user' else 'model',
                parts=[types.Part.from_text(text=msg['content'])]
            ) for msg in request.history
        ]
        contents.append(types.Content(role="user", parts=[types.Part.from_text(text=request.message)]))

        # Simplified tool config for stability
        tools_config = [types.Tool(google_search=types.GoogleSearch())]

        response = self.client.models.generate_content(
            model=self.model_id,
            contents=contents,
            config=types.GenerateContentConfig(tools=tools_config)
        )

        return ChatResponse(response=response.text or "Task completed.", tool_calls=[])

nexus = NexusAgent()