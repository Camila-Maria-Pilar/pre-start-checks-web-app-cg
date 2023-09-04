import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Card from "../components/Card";
import { GET_QUESTIONS_BY_MACHINE_ID } from "../utils/queries";
import { ADD_QUESTION, EDIT_QUESTION, DELETE_QUESTION } from "../utils/mutations";
import { useNavigate, useParams } from "react-router-dom";



const AddQuestionnaire = () => {
  const { id: machineId } = useParams();
  const navigate = useNavigate();
  const [addQuestion] = useMutation(ADD_QUESTION);
  const [questions, setQuestions] = useState([{ text: '', answers: ['', ''] }]);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(null);

  const handleAddQuestion = () => {
    const newQuestions = [...questions, { text: '', answers: ['', ''] }];
    setQuestions(newQuestions);
  };

  const handleSaveQuestions = async () => {
    // Validate questions and answers
    if (questions.every(q => q.text && q.answers.every(a => a))) {
      setIsValid(true);
      setError(null);
      try {
        await addQuestion({ variables: { machineId, questions } });
        navigate(`/machines/${machineId}`);
      } catch (e) {
        setError('Failed to save questions.');
        setIsValid(false);
      }
    } else {
      setError('Please fill in all fields.');
      setIsValid(false);
    }
  };

  return (
    <Card>
      <h4>Add/Edit Questions for this Machine</h4>
      {questions.map((q, index) => (
        <div key={index}>
          <input
            placeholder='Question'
            value={q.text}
            onChange={e => {
              const newText = e.target.value;
              setQuestions(oldQuestions => {
                const updated = [...oldQuestions];
                updated[index].text = newText;
                return updated;
              });
            }}
          />
          <input
            placeholder='Answer 1'
            value={q.answers[0]}
            onChange={e => {
              const newAnswer = e.target.value;
              setQuestions(oldQuestions => {
                const updated = [...oldQuestions];
                updated[index].answers[0] = newAnswer;
                return updated;
              });
            }}
          />
          <input
            placeholder='Answer 2'
            value={q.answers[1]}
            onChange={e => {
              const newAnswer = e.target.value;
              setQuestions(oldQuestions => {
                const updated = [...oldQuestions];
                updated[index].answers[1] = newAnswer;
                return updated;
              });
            }}
          />
        </div>
      ))}
      <button onClick={handleAddQuestion}>+</button>
      <button onClick={handleSaveQuestions}>Save All Questions</button>
      {isValid && <div style={{ color: 'green' }}>All fields are valid.</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </Card>
  );
};

export default AddQuestionnaire;

