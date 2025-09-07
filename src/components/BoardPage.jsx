import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBoards } from "../context/BoardsContext";
import List from "./List";
import CreateListModal from "./Modals/CreateListModal";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const BoardPage = () => {
  const { boardId } = useParams();
  const { boards, updateBoard } = useBoards();
  const board = boards.find((b) => b.id === boardId);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  if (!board) return <div>Board not found</div>;

  // Drag-and-Drop Handler
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceList = board.lists.find((l) => l.id === source.droppableId);
    const destList = board.lists.find((l) => l.id === destination.droppableId);

    const [movedCard] = sourceList.cards.splice(source.index, 1);
    destList.cards.splice(destination.index, 0, movedCard);

    updateBoard({ ...board });
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-4">{board.name}</h1>

      {/* Add List Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add List
      </button>

      {/* Lists with Drag & Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto">
          {board.lists.map((list) => (
            <Droppable droppableId={list.id} key={list.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-w-[250px]"
                >
                  <List list={list} board={board} updateBoard={updateBoard} />
                  {provided.placeholder} {/* REQUIRED for drag spacing */}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Create List Modal */}
      {showModal && (
        <CreateListModal
          board={board}
          updateBoard={updateBoard}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default BoardPage;
