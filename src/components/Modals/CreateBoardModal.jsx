import { useState } from "react";
import { useBoards } from "../../context/BoardsContext";

const CreateBoardModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const { addBoard } = useBoards();

  const handleSubmit = () => {
    if (name.trim()) {
      addBoard(name.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Create Board</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Board Name"
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

export default CreateBoardModal;
