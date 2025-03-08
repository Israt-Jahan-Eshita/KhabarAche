import { useState } from "react";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (input.trim() === "") return;

        const newMessages = [...messages, { text: input, user: true }];
        setMessages(newMessages);
        setInput("");

        setTimeout(() => {
            setMessages([...newMessages, { text: "Hello! How can I help you?", user: false }]);
        }, 1000);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="w-96 bg-white p-4 rounded-lg shadow-lg">
                <div className="h-72 overflow-y-auto border p-2 mb-2">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-md my-1 ${msg.user ? "bg-blue-200 text-right" : "bg-gray-200"}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border rounded-md"
                    />
                    <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-md">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
