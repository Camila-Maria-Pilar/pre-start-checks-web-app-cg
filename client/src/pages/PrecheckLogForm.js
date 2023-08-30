import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';  // <-- make sure to import useQuery
import { ADD_PRECHECKLOG } from '../utils/mutations';
import { GET_QUESTIONS_BY_MACHINE_ID } from "../utils/queries";

const PreCheckLogForm = () => {
  const { id: machineId } = useParams();

  const { loading, error, data } = useQuery(GET_QUESTIONS_BY_MACHINE_ID, {
    variables: { machineId: machineId },  // <-- use machineId instead of id
  });

  const questionsForThisMachine = data?.getQuestionsByMachineId?.[0]?.questions || [];
  const [addPreCheckLog] = useMutation(ADD_PRECHECKLOG);
  const [answers, setAnswers] = useState([]);  // Sample format: [{questionId: '123', answer: 'Yes', comment: 'All good'}]

  const handleSubmit = async () => {
    try {
      for (const answerObj of answers) {
        await addPreCheckLog({ 
          variables: { 
            machineId, 
            questionId: answerObj.questionId, 
            answerGiven: answerObj.answer, 
            userId: "someUserId" // Replace with the actual user ID
          } 
        });
      }
      // Handle successful submission
  } catch (error) {
    console.error("Error submitting the form:", error);
  }
};


  return (
    <div>
      {/* Loop over questions */}
      {questionsForThisMachine.map((question, index) => (
        <div key={index}>
          <p>{question.text}</p>
  
          {/* Loop over available answers for each question */}
          {question.answers.map((answer) => (
            <label key={answer}>
              <input
                type="radio"
                value={answer}
                name={`question_${index}`}
                onChange={() => setAnswers([...answers, { questionId: question.id, answer }])}
              />
              {answer}
            </label>
          ))}
          <input placeholder="Leave a Comment" onChange={(e) => {
            const comment = e.target.value;
            setAnswers((oldAnswers) => {
              // Find the existing answer object or create a new one
              let existingAnswer = oldAnswers.find(ans => ans.questionId === question.id);

              // If it doesn't exist, we'll just return the oldAnswers array unchanged
              if (!existingAnswer) {
                return oldAnswers;
              }

              existingAnswer.comment = comment;
              return [...oldAnswers];
            });
          }} />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PreCheckLogForm;
