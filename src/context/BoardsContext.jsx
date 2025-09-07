import React, { createContext, useContext, useState, useEffect } from "react";
import { loadBoards, saveBoards } from "../utils/localStorage";

const BoardsContext = createContext();
export const useBoards = () => useContext(BoardsContext);

export const BoardsProvider = ({ children }) => {
  const [boards, setBoards] = useState(loadBoards());

  useEffect(() => saveBoards(boards), [boards]);

  const addBoard = (name) => {
    setBoards([
      ...boards,
      {
        id: Date.now().toString(),
        name,
        lists: [
          { id: "todo", title: "To Do", cards: [] },
          { id: "inprogress", title: "In Progress", cards: [] },
          { id: "done", title: "Done", cards: [] },
        ],
      },
    ]);
  };

  const deleteBoard = (id) => setBoards(boards.filter((b) => b.id !== id));
  const updateBoard = (updatedBoard) =>
    setBoards(boards.map((b) => (b.id === updatedBoard.id ? updatedBoard : b)));

  return (
    <BoardsContext.Provider
      value={{ boards, addBoard, deleteBoard, updateBoard }}
    >
      {children}
    </BoardsContext.Provider>
  );
};
