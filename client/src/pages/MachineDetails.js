import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

import Card from "../components/Card";

import { useParams } from "react-router-dom";

// Machine Details Query

const QUERY_MACHINE = gql`
  query GetMachine($getMachineId: ID!) {
    getMachine(id: $getMachineId) {
      name
    }
  }
`;

// Machine Details Card

function MachineDetails() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_MACHINE, {
    variables: { getMachineId: id },
  });
  const machine = data?.getMachine;

  console.log(id);

  console.log("MACHINE ID", machine);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Machine Details</h1>
      <Card Title="Machine Details">
        <p>{machine?.name}</p>
      </Card>
    </div>
  );
}

const GET_QUESTIONS_BY_MACHINE_ID = gql`
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
  const { loading, error, data } = useQuery(GET_QUESTIONS_BY_MACHINE_ID, {
    variables: { machineId: id },
  });

  const questionsForThisMachine =
    data?.getQuestionsByMachineId?.[0]?.questions || [];

  console.log(id);
  console.log("Machine Questions array", questionsForThisMachine);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Questions</h1>
      <Card title="Machine Questions Details">
        {/* Conditional Rendering for Edit/Add Questions */}
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
                  Answers:{" "}
                  {q.answers ? q.answers.join(", ") : "No answers available"}
                </p>
              </div>
            ))}
            {<Link to={`/addquestionnaire/${id}`}>
              <button>Edit Questions</button>
            </Link> }
          </>
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
      <div>QRCODE</div>
      <QRCode value={`http://localhost:3000/machines/${id}/prechecklog-form`} />

    </div>
  );
}

export default MachinePage;
