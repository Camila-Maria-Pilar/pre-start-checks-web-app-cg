import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_QUESTIONS_BY_MACHINE_ID } from '../utils/queries';
import { ADD_QUESTION_TO_ARRAY } from '../utils/mutations';

import { useParams } from 'react-router-dom';

const EditQuestionnaire = () => {
  let { id: machineId } = useParams();  // Get machineId from the route

  // Objective 1: Fetch the machine's questions
  const { loading, error, data } = useQuery(GET_QUESTIONS_BY_MACHINE_ID, {
    variables: { machineId },
  });

  useEffect(() => {
    if (data) {
      console.log('Fetched Questions:', data.getQuestionsByMachineId);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Edit Questionnaire for Machine {machineId}</h1>

      <ul>
    {data && data.getQuestionsByMachineId && data.getQuestionsByMachineId[0]?.questions.map((question, index) => (
        <li key={index}>
            <p>Question: {question.text}</p>
            <ul>
                {question.answers.map((answer, aIndex) => (
                    <li key={aIndex}>{answer}</li>
                ))}
            </ul>
        </li>
    ))}
</ul>

      
      {/* TODO: Implement Objectives 2.add, 3. edit, and 4. delete */}
    </div>
  );
};

export default EditQuestionnaire;