import { useMutation } from '@apollo/client';
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Card from "../components/Card";

import { useParams } from "react-router-dom";



// Machine Details Query

const DETAILS_MACHINE = gql`
    query GetMachine($getMachineId: ID!) {
    getMachine(id: $getMachineId) {
        name
    }
}
`;

// Machine Details Card

function MachineDetails() {
    let { id } = useParams();    
    const { loading, error, data } = useQuery(DETAILS_MACHINE, {
      variables: { getMachineId: id }
    });
    const machine = data?.getMachine;

  console.log(id);

  console.log("MACHINE ID", machine);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return  (
    <div>
        <h1>Machine Details</h1> 
        <Card Title = "Machine Details">
            <p>{machine?.name}</p>
        </Card>

    </div>
  );
}

const GET_ALL_QUESTIONS = gql`
  query GetQuestionsByMachineId($machineId: ID!) {
  getQuestionsByMachineId(machineId: $machineId) {
    machineId
    questions {
      answers
      text
    }
  }
}
`;

// Questions Card

function MachineQuestions({ id }) {  
  const { loading, error, data } = useQuery(GET_ALL_QUESTIONS, {
    variables: { machineId: id }
  });
  
  // Extract the specific machine's questions. Here I'm assuming that
  // the query will only return one machine's questions.
  const questionsForThisMachine = data?.getQuestionsByMachineId?.[0]?.questions || [];

  console.log(id);
  console.log("Machine Questions array", questionsForThisMachine);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Questions</h1>
      <Card title="Machine Questions Details">
        {questionsForThisMachine.length === 0 ? (
          <p>No questions available for this machine.</p>
        ) : (
          questionsForThisMachine.map((q, index) => (
            <div key={index}>
              <p>Question: {q.text}</p>
              <p>Answers: {q.answers ? q.answers.join(', ') : "No answers available"}</p>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}





// QRCode Card


function MachinePage() {
  let { id } = useParams();

  return (
    <div>
      <MachineDetails id={id} />
      <MachineQuestions id={id} />
      {/* Later on, here you can render the QRCode Card */}
    </div>
  );
}


export default MachinePage;

