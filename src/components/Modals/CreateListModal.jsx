import { useState } from "react";

const CreateListModal = ({ board, onClose, updateBoard }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      const newList = {
        id: Date.now().toString(),
        title: title.trim(),
        cards: [],
      };
      board.lists.push(newList);
      updateBoard({ ...board });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Create List</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="List Title"
          className="border p-2 w-full mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListModal;
