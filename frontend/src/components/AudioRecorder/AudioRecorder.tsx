import React, { useState } from "react";

const useAudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);

      recorder.ondataavailable = (e) => {
        setAudioChunks((prev) => [...prev, e.data]);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      recorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setPermissionDenied(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);

      // Stop all tracks to release the microphone
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    }
  };

  return {
    recording,
    audioURL,
    permissionDenied,
    startRecording,
    stopRecording,
  };
};

const AudioRecorder = () => {
  const {
    recording,
    audioURL,
    permissionDenied,
    startRecording,
    stopRecording,
  } = useAudioRecorder();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Enregistreur audio</h1>
      {permissionDenied ? (
        <div className="text-red-500 text-center p-4 bg-red-100 rounded-md">
          <p>Accès au microphone refusé.</p>
          <p className="text-sm">
            Veuillez autoriser l'accès au microphone dans les paramètres de
            votre navigateur.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center mb-6">
            {recording ? (
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative flex items-center justify-center w-20 h-20 bg-red-600 rounded-full">
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </div>
              </div>
            ) : (
              <button
                onClick={startRecording}
                className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-6v18l-12-6z"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="flex gap-4">
            {!recording ? (
              <button
                onClick={startRecording}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Commencer l'enregistrement
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Arrêter l'enregistrement
              </button>
            )}
          </div>

          {audioURL && (
            <div className="mt-6 w-full max-w-md">
              <p className="text-sm text-gray-400 mb-2">Votre enregistrement :</p>
              <audio controls src={audioURL} className="w-full rounded-lg" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AudioRecorder;