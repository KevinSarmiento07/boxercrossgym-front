import { useState } from "react";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
} from "docx";

const formatMarkdown = (text) => {
  const formatted = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
  return formatted;
};

const formatTime = (date) => {
  return date.toLocaleString("es-ES", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const ChatNutricion = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const now = new Date();
    const userMessage = {
      role: "user",
      content: input,
      timestamp: now.toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Eres un asistente experto en nutrición y salud alimentaria. Puedes responder preguntas relacionadas con la alimentación, dietas, nutrientes, calorías, hábitos saludables y factores que influyen en las necesidades nutricionales (como edad, peso, estatura o nivel de actividad). Si te preguntan algo completamente fuera de ese contexto, responde amablemente: 'Lo siento, solo puedo ayudarte con temas relacionados con la nutrición y la salud alimentaria.'",
            },
            ...messages.map(({ role, content }) => ({ role, content })),
            { role: "user", content: input },
          ],
        }),
      });

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content?.trim();

      if (botReply) {
        const botMessage = {
          role: "assistant",
          content: botReply,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Hubo un error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Hubo un error al procesar tu mensaje.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadWord = async () => {
    const doc = new Document({
        sections: [
        {
            children: messages.map((msg) => {
            const isUser = msg.role === "user";
            const color = isUser ? "1E90FF" : "228B22";
            const time = formatTime(new Date(msg.timestamp));
            const content = msg.content;

            // Insertar título (Usuario - Fecha)
            const header = new Paragraph({
                children: [
                new TextRun({
                    text: `${isUser ? "Usuario" : "IA"} - ${time}`,
                    bold: true,
                    color,
                    size: 24,
                }),
                ],
                spacing: { after: 100 },
                alignment: isUser ? AlignmentType.RIGHT : AlignmentType.LEFT,
            });

            // Parseo de contenido
            const paragraphLines = [];
            const contentWithBreaks = content.replace(/(\d+\.\s)/g, "\n$1"); // Fuerza salto antes de cada número con punto
            const lines = contentWithBreaks.split("\n");

            for (const line of lines) {
                const parts = line.split(/(\*\*.*?\*\*)/g); // Detectar negritas
                const children = parts.map((part) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                    return new TextRun({
                    text: part.slice(2, -2),
                    bold: true,
                    color: "000000",
                    size: 22,
                    });
                }
                return new TextRun({
                    text: part,
                    color: "000000",
                    size: 22,
                });
                });

                paragraphLines.push(
                new Paragraph({
                    children,
                    alignment: isUser ? AlignmentType.RIGHT : AlignmentType.LEFT,
                    spacing: { after: 100 },
                })
                );
            }

            return [header, ...paragraphLines];
            }).flat(),
        },
        ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "conversacion_chat_nutricion.docx");
    };



  return (
    <div className="mx-auto p-4 bg-white shadow-lg rounded">
      <h2 className="text-xl font-bold mb-3">🤖 Chat de Alimentación</h2>
      <div className="h-64 overflow-y-auto bg-gray-100 p-2 rounded mb-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block p-2 rounded ${
                msg.role === "user" ? "bg-blue-200" : "bg-green-200"
              }`}
              dangerouslySetInnerHTML={{
                __html: formatMarkdown(msg.content),
              }}
            ></span>
            <div className="text-xs text-gray-500 mt-1">
              {formatTime(new Date(msg.timestamp))}
            </div>
          </div>
        ))}
      </div>

      <textarea
        rows={3}
        className="w-full border p-2 rounded mb-2 resize-none overflow-y-auto"
        placeholder="Escribe tu pregunta..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />

      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full mb-2"
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? "Pensando..." : "Enviar"}
      </button>

      <button
        className="bg-blue-700 text-white px-4 py-2 rounded w-full"
        onClick={handleDownloadWord}
        disabled={messages.length === 0}
      >
        Descargar conversación en Word
      </button>
    </div>
  );
};

export default ChatNutricion;
