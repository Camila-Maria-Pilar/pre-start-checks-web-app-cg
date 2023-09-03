import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PRECHECKLOG } from "../utils/mutations";
import { GET_QUESTIONS_BY_MACHINE_ID, QUERY_ALLUSERS } from "../utils/queries";

const PreCheckLogForm = () => {
  const { id: machineId } = useParams();
  const { loading, error, data } = useQuery(GET_QUESTIONS_BY_MACHINE_ID, {
    variables: { machineId },
  });
  const { data: userData } = useQuery(QUERY_ALLUSERS);

  const questionsForThisMachine =
    data?.getQuestionsByMachineId?.[0]?.questions || [];
  const [AddPreCheckLog] = useMutation(ADD_PRECHECKLOG);
  const [answers, setAnswers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(""); // state to keep track of selected user id

  const handleSubmit = async () => {
    try {
      await AddPreCheckLog({
        variables: {
          preCheckLog: {
            machineId,
            userId: selectedUserId, // use selected user id
            questionAnswers: answers,
          },
        },
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };  
  
  const updateAnswer = (questionId, answerGiven, comments) => {
    setAnswers((prev) => {
      const existingAnswer = prev.find((ans) => ans.questionId === questionId);
      const updatedAnswerGiven =
        answerGiven || (existingAnswer && existingAnswer.answerGiven) || "";
      const updatedComments =
        comments || (existingAnswer && existingAnswer.comments) || "";

      const updatedAnswers = prev.filter(
        (ans) => ans.questionId !== questionId
      );
      updatedAnswers.push({
        questionId,
        answerGiven: updatedAnswerGiven,
        comments: updatedComments,
      });
      return updatedAnswers;
    });
  };

  return (
    <div>
      {/* Dropdown for selecting user */}
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="" disabled>
          Select user
        </option>
        {userData?.getAllUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>

      {questionsForThisMachine.map((question, index) => (
        <div key={index}>
          <p>{question.text}</p>
          {question.answers.map((answer) => (
            <label key={answer}>
              <input
                type="radio"
                value={answer}
                name={`question_${index}`}
                onChange={(e) => updateAnswer(question.id, e.target.value, "")} // <-- Use question.id here
              />
              {answer}
            </label>
          ))}
          <input
            placeholder="Leave a Comment"
            onChange={(e) => updateAnswer(question.id, "", e.target.value)} // <-- Use question.id here
          />
        </div>
      ))}
      
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PreCheckLogForm;