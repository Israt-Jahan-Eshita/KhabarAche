import { useState, useEffect, useRef } from "react";
export default function ChatPage() {
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [orderDetails, setOrderDetails] = useState({
        item: "",
        quantity: "",
        deliveryDate: "",
        contactInfo: "",
    });
    const [isBotTyping, setIsBotTyping] = useState(false);
    const chatBoxRef = useRef(null);

    const menuItems = ["pizza", "burger", "salad", "Pizza", "Burger", "Salad"];

    const handleSendMessage = () => {
        if (userInput.trim() === "") return;

        const newChat = [...chatHistory, { text: userInput, user: true }];
        setChatHistory(newChat);
        setUserInput("");
        setIsBotTyping(true);

        setTimeout(() => {
            let response = "";
            switch (currentStep) {
                case 0:
                    response = `Welcome! Please choose an option:\nType 1 for Menu\nType 2 for Ordering\nType 3 for Ordering for a Future Date\nType 4 for Contact Info`;
                    setCurrentStep(1);
                    break;

                case 1:
                    if (userInput === "1") {
                        response = `Here's our menu: \n1. Pizza\n2. Burger\n3. Salad\nWhat would you like to order?`;
                        setCurrentStep(2);
                    } else if (userInput === "2") {
                        response = "Please tell me what you'd like to order and how many.";
                        setCurrentStep(3);
                    } else if (userInput === "3") {
                        response = "When would you like to place an order for a future date? Please provide a date in the format YYYY-MM-DD.";
                        setCurrentStep(4);
                    } else if (userInput === "4") {
                        response = "Please provide your contact information (Name or Phone Number).";
                        setCurrentStep(5);
                    } else {
                        response = "Sorry, I didn't understand that. Please select a valid option.";
                    }
                    break;

                case 2:
                    if (menuItems.includes(userInput)) {
                        setOrderDetails((prevOrder) => ({ ...prevOrder, item: userInput }));
                        response = `You selected ${userInput}. How many would you like to order?`;
                        setCurrentStep(3);
                    } else {
                        response = `Sorry, we don't have ${userInput} on the menu. Please choose a valid item.`;
                    }
                    break;

                case 3:
                    setOrderDetails((prevOrder) => ({ ...prevOrder, quantity: userInput }));
                    response = `You want to order ${userInput} items. When would you like it delivered? (Please provide a date in format YYYY-MM-DD)`;
                    setCurrentStep(4);
                    break;

                case 4:
                    setOrderDetails((prevOrder) => ({ ...prevOrder, deliveryDate: userInput }));
                    response = `You want it delivered on ${userInput}. Please provide your contact info (name or phone number).`;
                    setCurrentStep(5);
                    break;

                case 5:
                    setOrderDetails((prevOrder) => ({ ...prevOrder, contactInfo: userInput }));
                    response = `Thank you! Your order for ${orderDetails.quantity} ${orderDetails.item}(s) has been placed. It will be delivered on ${orderDetails.deliveryDate}. We will contact you at ${userInput}.`;
                    setCurrentStep(0);
                    break;

                default:
                    response = "Sorry, I didn't understand that.";
                    break;
            }
            const formattedResponse = response.split("\n").map((line, index) => (
                <span key={index}>
                    {line}
                    <br />
                </span>
            ));

            setChatHistory([...newChat, { text: formattedResponse, user: false }]);
            setIsBotTyping(false);
        }, 1000);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSendMessage();
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div className="flex justify-center items-center h-screen bg-orange-500">
            <div className="w-[700px] bg-gray-900 p-8 rounded-lg shadow-lg text-white">
                <h2 className="text-3xl font-bold text-center mb-6">Order Chat</h2>
                <div
                    ref={chatBoxRef}
                    className="h-[500px] overflow-y-auto border border-gray-700 p-4 mb-4 rounded-md"
                >
                    {chatHistory.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-md my-2 text-lg ${
                                msg.user
                                    ? "bg-blue-500 text-right ml-auto w-max text-white"
                                    : "bg-gray-700 text-left w-max"
                            }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    {isBotTyping && <div className="text-gray-400 text-sm mt-2">Bot is typing...</div>}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your response..."
                        className="flex-1 p-4 border border-gray-600 rounded-md bg-gray-800 text-white text-xl"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-4 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xl"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
