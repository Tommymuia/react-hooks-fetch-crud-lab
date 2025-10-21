// src/components/App.js
import { useState, useEffect } from "react";
import NewQuestionForm from "./NewQuestionForm";   // ✅ fixed
import QuestionList from "./QuestionList";         // ✅ fixed

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  function handleViewQuestions() {
    setShowForm(false);
  }

  function handleNewQuestion() {
    setShowForm(true);
  }

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updated = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updated);
  }

  return (
    <main>
      <nav>
        <button onClick={handleNewQuestion}>New Question</button>
        <button onClick={handleViewQuestions}>View Questions</button>
      </nav>

      {showForm ? (
        <NewQuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <section>
          <h1>Quiz Questions</h1>
          <QuestionList
            questions={questions}
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
          />
        </section>
      )}
    </main>
  );
}

export default App;
