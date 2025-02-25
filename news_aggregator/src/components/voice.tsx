import { useRef, useState } from "react";
import { Mic } from "lucide-react";

interface SpeechToTextProps {
  setSearchText: (text: string) => void;
}

const SpeechToText = ({ setSearchText }: SpeechToTextProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsRecording(true);

    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setSearchText(transcript); // 👈 Update search bar text
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  return (
    <button
      onClick={startListening}
      className={`px-3 py-1 text-black text-sm rounded-lg bg-foreground_light ${
        isRecording ? "bg-red-400" : "bg-foreground_light"
      }`}
    >
      <Mic size={18} className="text-black cursor-pointer" />
    </button>
  );
};

export default SpeechToText;
