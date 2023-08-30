import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Card from "../components/Card";
import { GET_QUESTIONS_BY_MACHINE_ID } from "../utils/queries";
import { ADD_QUESTION, EDIT_QUESTION, DELETE_QUESTION } from "../utils/mutations";
import { useParams } from "react-router-dom";





const AddQuestionnaire = () => {
  const { id: machineId } = useParams();
  const [addQuestion] = useMutation(ADD_QUESTION);
  const [questions, setQuestions] = useState([{ text: '', answers: ['', ''] }]);

  const handleAddQuestion = () => {
    const newQuestions = [...questions, { text: '', answers: ['', ''] }];
    setQuestions(newQuestions);
  };

  const handleSaveQuestions = () => {
    addQuestion({ variables: { machineId, questions } }).then((res) => {
      // Redirect to MachineDetails or handle result
    });
  };

  return (
    <div>
      <h4>Add/Edit Questions for Machine {machineId}</h4>
      {questions.map((q, index) => (
        <div key={index}>
          <input
            placeholder="Question"
            value={q.text}
            onChange={(e) => {
              const newText = e.target.value;
              setQuestions((oldQuestions) => {
                const updated = [...oldQuestions];
                updated[index].text = newText;
                return updated;
              });
            }}
          />
          <input
            placeholder="Answer 1"
            value={q.answers[0]}
            onChange={(e) => {
              const newAnswer = e.target.value;
              setQuestions((oldQuestions) => {
                const updated = [...oldQuestions];
                updated[index].answers[0] = newAnswer;
                return updated;
              });
            }}
          />
          <input
            placeholder="Answer 2"
            value={q.answers[1]}
            onChange={(e) => {
              const newAnswer = e.target.value;
              setQuestions((oldQuestions) => {
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
    </div>
  );
};

export default AddQuestionnaire;

