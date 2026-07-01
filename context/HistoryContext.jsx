"use client";
import { createContext, useContext, useState } from "react";

const HistoryContext = createContext(null);

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const addReview = (review) => {
    setHistory((prev) => [
      {
        id: review._id,
        language: review.language,
        studentLevel: review.studentLevel,
        verdict: review.overallVerdict?.label,
        score: review.overallVerdict?.score,
        createdAt: review.createdAt || new Date().toISOString(),
      },
      ...prev.slice(0, 19), // keep last 20
    ]);
  };

  return (
    <HistoryContext.Provider value={{ history, addReview }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
