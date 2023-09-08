import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { GET_QUESTIONS_BY_MACHINE_ID, QUERY_MACHINE } from "../utils/queries";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";


const printQRCode = () => {
  window.print();
};

function MachineDetails({ id, machine }) {
  return (
    <div>
      <h1>Machine Details</h1>
      <Card title="Machine Details">
        <p>{machine?.name}</p>
        {/* 1.2 "Back to Machines" Button */}
        <Link to="/machines">
          <button>Back to Machines</button>
        </Link>
      </Card>
    </div>
  );
}

function MachineQuestions({ id }) {
  const { loading, error, data } = useQuery(GET_QUESTIONS_BY_MACHINE_ID, {
    variables: { machineId: id },
  });

  const questionsForThisMachine = data?.getQuestionsByMachineId?.[0]?.questions || [];

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Questions</h1>
      <Card title="Machine Questions Details">
        {questionsForThisMachine.length === 0 ? (
          <>
            <p>No questions available for this machine.</p>
            <Link to={`/addquestionnaire/${id}`}>
              <button>Add Questions</button>
            </Link>
          </>
        ) : (
          <>
            {questionsForThisMachine.map((q, index) => (
              <div key={index}>
                <p>Question: {q.text}</p>
                <p>
                  Answers: 
                  {q.answers ? q.answers.join(", ") : "No answers available"}
                </p>
              </div>
            ))}
            {/* 1.1 Hidden "Edit Questions" button */}
            {/* 
            <Link to={`/editquestionnaire/${id}`}>
              <button>Edit Questions</button>
            </Link>
            */}
          </>
        )}
      </Card>
    </div>
  );
}

function MachinePage() {
  let { id } = useParams();

  const { loading: machineLoading, error: machineError, data: machineData } = useQuery(QUERY_MACHINE, {
    variables: { getMachineId: id },
  });
  const machine = machineData?.getMachine;

  if (machineLoading) return "Loading...";
  if (machineError) return `Error! ${machineError.message}`;

  return (
    <div>
      <MachineDetails id={id} machine={machine} />
      <MachineQuestions id={id} />
      <div className="printableSection">
        <Card title={`Scan this QR Code for the Pre-Start Check of ${machine?.name}!`}>
        <QRCode value={`${apiUrl}/machines/${id}/prechecklog-form`} />
          <button onClick={printQRCode}>Print QR Code</button>
        </Card>
      </div>
    </div>
  );
}

export default MachinePage;

