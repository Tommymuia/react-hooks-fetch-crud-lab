// src/components/QuestionItem.js
import { useState } from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedIndex, setSelectedIndex] = useState(correctIndex); // ✅ local state

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" }).then(() =>
      onDeleteQuestion(id)
    );
  }

  function handleAnswerChange(e) {
    const newCorrectIndex = parseInt(e.target.value);
    setSelectedIndex(newCorrectIndex); // ✅ update UI immediately

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      .then((updatedQ) => onUpdateQuestion(updatedQ));
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label htmlFor={`select-${id}`}>Correct Answer</label>
      <select
        id={`select-${id}`}
        aria-label="Correct Answer"
        value={selectedIndex} // ✅ bound to local state
        onChange={handleAnswerChange}
      >
        {answers.map((ans, index) => (
          <option key={index} value={index}>
            {ans}
          </option>
        ))}
      </select>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
