import { useState } from "react";
import PageShell from "../components/PageShell";

const VoiceChat = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition is not supported in this browser."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setMessage(transcript);
    };

    recognition.start();
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await response.json();

      setReply(data.reply);

      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(
          data.reply
        );

        speech.lang = "en-IN";
        window.speechSynthesis.speak(speech);
      }
    } catch (err) {
      console.error(err);
      alert("Chat failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell
      title="Voice Chat"
      subtitle="Local farming assistant powered by Qwen."
    >
      <section className="detail-card wide">
        <textarea
          rows={5}
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Ask about crops, soil, irrigation..."
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.12)",
            resize: "vertical",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <button
            onClick={startListening}
            disabled={listening}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            {listening
              ? "🎤 Listening..."
              : "🎤 Speak"}
          </button>

          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            {loading
              ? "Thinking..."
              : "Send"}
          </button>
        </div>

        {reply && (
          <div
            style={{
              marginTop: "24px",
              padding: "20px",
              border:
                "1px solid rgba(255,255,255,0.12)",
              borderRadius: "12px",
            }}
          >
            <h3>Assistant Reply</h3>

            <p
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.7",
              }}
            >
              {reply}
            </p>
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default VoiceChat;