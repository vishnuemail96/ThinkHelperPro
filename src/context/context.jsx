import { createContext, useState } from "react";
import PropTypes from "prop-types";
import runChat from "../config/gemini";
import { marked } from "marked";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setInput("");
  };

  const delayTyping = (words, delay = 25) => {
    setResultData(""); // Clear before starting
    words.forEach((word, index) => {
      setTimeout(() => {
        setResultData((prev) => prev + word);
      }, delay * index);
    });
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;

    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

    // ✅ Convert to HTML using marked
    const htmlResponse = marked.parse(response);

    // ✅ Break HTML into small chunks for typing effect
    const chunkedWords = htmlResponse.match(/(<[^>]+>|[^<>\s]+|\s+)/g); // Tags, words, spaces

    delayTyping(chunkedWords, 20); // Type each chunk with delay

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
