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
        self.client = genai.Client()
        self.model_id = "gemini-2.0-flash"
        
        # Define the available tools for the model
        self.tool_config = [
            types.Tool(
                function_declarations=[
                    types.FunctionDeclaration(
                        name="execute_python",
                        description="Executes Python code to solve math, data analysis, or logic problems.",
                        parameters=types.Schema(
                            type="OBJECT",
                            properties={
                                "code": types.Schema(type="STRING", description="The Python code to run.")
                            },
                            required=["code"]
                        )
                    ),
                    types.FunctionDeclaration(
                        name="save_file",
                        description="Saves text or code to a file (e.g., .tex, .py, .csv).",
                        parameters=types.Schema(
                            type="OBJECT",
                            properties={
                                "filename": types.Schema(type="STRING", description="Name of the file"),
                                "content": types.Schema(type="STRING", description="Content to save")
                            },
                            required=["filename", "content"]
                        )
                    )
                ],
                # We also enable the built-in Google Search tool
                google_search=types.GoogleSearch()
            )
        ]

        self.system_instruction = """
        You are Nexus, an advanced AI Sidekick. 
        Your goal is to actively SOLVE problems, not just chat.
        
        CAPABILITIES:
        1. **Code Execution:** If a user asks for data analysis, Kaggle solutions, or math, WRITE and EXECUTE Python code.
        2. **Research:** If a user asks for facts, use Google Search.
        3. **Creation:** If a user asks for a paper, write the LaTeX and SAVE it to a file.
        
        METHODOLOGY:
        - Break down complex requests (like "Solve this Kaggle comp") into steps.
        - Step 1: Analyze data (run code).
        - Step 2: Propose model.
        - Step 3: Train model (run code).
        
        Always explain your plan before you execute it.
        """

    async def chat(self, request: ChatRequest) -> ChatResponse:
        # Convert history
        contents = []
        for msg in request.history:
            contents.append(
                types.Content(
                    role="user" if msg['role'] == 'user' else 'model',
                    parts=[types.Part.from_text(text=msg['content'])]
                )
            )
        
        # Add current message
        contents.append(
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=request.message)]
            )
        )

        # 1. Generate initial response (Model decides to call tool or speak)
        response = self.client.models.generate_content(
            model=self.model_id,
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=self.system_instruction,
                tools=self.tool_config,
                temperature=0.4 # Lower temp for more precise tool use
            )
        )

        # 2. Handle Tool Calls Loop
        # In a real agent, we loop here. For this prototype, we handle one turn of tool execution.
        tool_logs = []
        final_text = ""

        # Check if model wants to call a function
        if response.function_calls:
            for call in response.function_calls:
                tool_logs.append(f"Calling Tool: {call.name}")
                
                # Execute the tool
                function_response = None
                if call.name == "execute_python":
                    code = call.args['code']
                    output = tools.execute_python(code)
                    function_response = {"output": output}
                    tool_logs.append(f"Python Output: {output[:200]}...") # Log partial output
                elif call.name == "save_file":
                    res = tools.save_file(call.args['filename'], call.args['content'])
                    function_response = {"status": res}
                
                # Send result back to Gemini (The "Observation" step)
                if function_response:
                    # We continue the conversation with the tool output
                    # (Simplified for this snippet - typically requires appending to contents and calling generate_content again)
                    pass

        # If it used Google Search, the text is already synthesized
        final_text = response.text or "I executed the task."

        return ChatResponse(response=final_text, tool_calls=tool_logs)

nexus = NexusAgent()
