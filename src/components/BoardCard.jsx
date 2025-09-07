import React from "react";
import { Link } from "react-router-dom";

const BoardCard = ({ board, deleteBoard }) => (
  <div className="border p-4 rounded shadow hover:shadow-lg transition">
    <Link
      to={`/board/${board.id}`}
      className="font-bold text-lg block mb-2 hover:text-blue-600"
    >
      {board.name}
    </Link>
    <button
      onClick={() => deleteBoard(board.id)}
      className="text-red-500 text-sm mt-2 hover:underline"
    >
      Delete
    </button>
  </div>
);

export default BoardCard;
