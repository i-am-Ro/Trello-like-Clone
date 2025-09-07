import { useState } from "react";
import { useBoards } from "../context/BoardsContext";
import BoardCard from "./BoardCard";
import CreateBoardModal from "./Modals/CreateBoardModal";

const DashboardPage = () => {
  const { boards, deleteBoard } = useBoards();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Boards</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create Board
      </button>

      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} deleteBoard={deleteBoard} />
        ))}
      </div>

      {showModal && <CreateBoardModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default DashboardPage;
