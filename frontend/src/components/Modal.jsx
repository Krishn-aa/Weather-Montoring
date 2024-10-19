import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [temp, setTemp] = useState("");
  const [condition, setCondition] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ temp, condition });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Temperature:</label>
            <input
              type="number"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
            />
          </div>
          <div>
            <label>Condition:</label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </div>
          <button type="submit">Set Thresholds</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
