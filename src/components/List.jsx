import { useState } from "react";
import Card from "./Card";
import CreateCardModal from "./Modals/CreateCardModal";
import { Draggable } from "@hello-pangea/dnd";

const List = ({ list, board, updateBoard }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  const addCard = (card) => {
    list.cards.push({ id: Date.now().toString(), ...card });
    updateBoard({ ...board });
  };

  const deleteCard = (cardId) => {
    list.cards = list.cards.filter((c) => c.id !== cardId);
    updateBoard({ ...board });
  };

  const handleRename = () => {
    if (newTitle.trim()) {
      list.title = newTitle.trim();
      updateBoard({ ...board });
      setIsEditing(false);
    }
  };

  const handleDeleteList = () => {
    board.lists = board.lists.filter((l) => l.id !== list.id);
    updateBoard({ ...board });
  };

  return (
    <div className="bg-gray-100 p-4 rounded min-w-[250px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border p-1 rounded"
            />
            <button
              onClick={handleRename}
              className="bg-blue-500 text-white px-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-2 border rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-bold text-lg">{list.title}</h2>
            <div className="flex gap-1">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 text-sm"
              >
                Rename
              </button>
              <button
                onClick={handleDeleteList}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Add Card Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white px-2 py-1 mb-2 rounded"
      >
        Add Card
      </button>

      {/* Cards */}
      {list.cards.map((card, index) => (
        <Draggable key={card.id} draggableId={card.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Card
                card={card}
                board={board}
                updateBoard={updateBoard}
                deleteCard={deleteCard}
              />
            </div>
          )}
        </Draggable>
      ))}

      {/* Create Card Modal */}
      {showModal && (
        <CreateCardModal
          list={list}
          board={board}
          addCard={addCard}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default List;
