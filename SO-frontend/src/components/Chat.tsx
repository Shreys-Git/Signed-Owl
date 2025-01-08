import { Box, Card } from "@mui/material";
import { UserText } from "./UserText";
import { AIResponseText } from "./AIResponseText";
import { UserChatInput } from "./UserChatInput";
import { useState, useEffect } from "react";
import axios from "axios";

export const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [isNewInputAvailable, setIsNewInputAvailable] = useState(false);
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [AIMessages, setAIMessages] = useState<string[]>([]);

  // Effect to add new user input to userMessages and reset input
  useEffect(() => {
    if (isNewInputAvailable) {
      // Add user input to the list of user messages
      setUserMessages((prevMessages) => [...prevMessages, userInput]);

      // Call the API to get the AI response
      const sendMessageToAI = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8000/llm/chat", // API endpoint
            {
              message: userInput, // Send user input as message to the backend
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // Add the current AI response to the existing ones
          setAIMessages((prevMessages) => [
            ...prevMessages,
            response.data.AIResponse,
          ]);
        } catch (error) {
          console.error("Error sending message to backend for LLM:", error);
        }
      };

      sendMessageToAI();

      // Reset user input and flag
      setUserInput("");
      setIsNewInputAvailable(false);
    }
  }, [isNewInputAvailable, userMessages, AIMessages]);

  return (
    <Card
      sx={{
        bgcolor: "#f5f5f5",
        height: "80vh",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto", // Enable vertical scrolling when content overflows
          paddingRight: "8px",
        }}
      >
        {/* Render user messages */}
        {userMessages.map((message, index) => (
          <Box key={index}>
            <UserText text={message} />
            <AIResponseText text={AIMessages[index]} />
          </Box>
        ))}
      </Box>

      {/* User input area */}
      <UserChatInput
        userInput={userInput}
        setUserInput={setUserInput}
        setIsNewInputAvailable={setIsNewInputAvailable}
      />
    </Card>
  );
};
