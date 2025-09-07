import React, { useState } from "react";

const Card = ({ card, deleteCard, board, updateBoard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");

  const handleSave = () => {
    if (title.trim()) {
      card.title = title.trim();
      card.description = description.trim();
      updateBoard({ ...board });
      setIsEditing(false);
    }
  };

  return (
    <div className="p-2 mb-2 rounded shadow bg-white">
      {isEditing ? (
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-1 w-full mb-1 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-1 w-full mb-1 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSave}
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
        </div>
      ) : (
        <div>
          <h3 className="font-bold">{card.title}</h3>
          {card.description && <p className="text-sm">{card.description}</p>}
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => deleteCard(card.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
