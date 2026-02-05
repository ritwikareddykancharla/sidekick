import subprocess
import sys
from typing import Dict, Any, List

class NexusTools:
    """
    The Toolkit for the Nexus Agent.
    """

    def execute_python(self, code: str) -> str:
        """
        Executes arbitrary Python code and returns the output (stdout/stderr).
        Useful for data analysis, math, or testing logic.
        """
        try:
            # Note: In a real production app, use a sandboxed environment like E2B or Docker.
            # For the hackathon, we run locally but warn about risks.
            result = subprocess.run(
                [sys.executable, "-c", code],
                capture_output=True,
                text=True,
                timeout=30  # Prevent infinite loops
            )
            output = result.stdout
            if result.stderr:
                output += f"\n[Stderr]: {result.stderr}"
            return output
        except Exception as e:
            return f"Execution Error: {str(e)}"

    def google_search(self, query: str) -> str:
        """
        Performs a Google Search to get real-time information.
        (Simulated for now, or we can use the Gemini Tool directly)
        """
        # We will let Gemini handle the actual search via its built-in tool,
        # but this method exists if we need custom scraping later.
        return f"Searching for: {query}"

    def save_file(self, filename: str, content: str) -> str:
        """
        Saves content to a file. Useful for writing LaTeX papers or saving CSVs.
        """
        try:
            with open(filename, 'w') as f:
                f.write(content)
            return f"Successfully saved {filename}"
        except Exception as e:
            return f"Error saving file: {str(e)}"

tools = NexusTools()
