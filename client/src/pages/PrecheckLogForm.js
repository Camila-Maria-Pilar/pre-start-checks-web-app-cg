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

  const questionsForThisMachine =
    data?.getQuestionsByMachineId?.[0]?.questions || [];
  const [AddPreCheckLog] = useMutation(ADD_PRECHECKLOG);
  const [answers, setAnswers] = useState([]);

  console.log("Machines", );

  const handleSubmit = async () => {
    try {
      // Execute the single mutation that takes an array of question-answers
      await AddPreCheckLog({
        variables: {
          preCheckLog: {
            machineId,
            userId: "64ed6131c29d65a2887a431d",
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
      {questionsForThisMachine.map((question, index) => (
        <div key={index}>
          <p>{question.text}</p>
          {question.answers.map((answer) => (
            <label key={answer}>
              <input
                type="radio"
                value={answer}
                name={`question_${index}`}
                onChange={(e) => updateAnswer(question.id, e.target.value, "")}
              />
              {answer}
            </label>
          ))}
          <input
            placeholder="Leave a Comment"
            onChange={(e) => updateAnswer(question.id, "", e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PreCheckLogForm;
