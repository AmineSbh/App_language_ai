from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import base64
import os

app = FastAPI()

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Route pour traiter l'audio
@app.post("/converse/audio")
async def converse_with_audio(
    scenarioName: str = Form(...),
    audio: UploadFile = File(...)
):
    # Pour tester, on ne traite pas réellement l'audio
    # On renvoie simplement une réponse factice

    # Lire un fichier audio de test (vous pouvez placer un fichier .mp3 dans un dossier 'static')
    test_audio_path = os.path.join(os.path.dirname(__file__), "static", "test_response.mp3")

    # Si vous n'avez pas de fichier audio, vous pouvez créer une chaîne base64 vide
    audio_base64 = ""

    # Si le fichier existe, le lire et l'encoder en base64
    if os.path.exists(test_audio_path):
        with open(test_audio_path, "rb") as audio_file:
            audio_content = audio_file.read()
            audio_base64 = base64.b64encode(audio_content).decode('utf-8')

    # Réponse de test
    return {
        "audio": audio_base64,
        "frenchText": f"Voici une réponse en français pour le scénario: {scenarioName}",
        "englishText": f"Here is a response in English for the scenario: {scenarioName}"
    }

# Route pour démarrer une conversation avec du texte
@app.post("/converse/text")
async def converse_with_text(request_data: dict):
    scenarioName = request_data.get("scenarioName", "unknown")

    # Même logique que pour l'audio
    test_audio_path = os.path.join(os.path.dirname(__file__), "static", "test_response.mp3")

    audio_base64 = ""
    if os.path.exists(test_audio_path):
        with open(test_audio_path, "rb") as audio_file:
            audio_content = audio_file.read()
            audio_base64 = base64.b64encode(audio_content).decode('utf-8')

    return {
        "audio": audio_base64,
        "frenchText": f"Bienvenue dans le scénario: {scenarioName}. Comment puis-je vous aider?",
        "englishText": f"Welcome to the scenario: {scenarioName}. How can I help you?"
    }