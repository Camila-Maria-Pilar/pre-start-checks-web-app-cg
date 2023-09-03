import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Card from "../components/Card";

export const GET_ALLPRECHECKLOGS = gql`
  query GetAllPreCheckLogs {
    getAllPreCheckLogs {
      id
      machineId
      questionAnswers {
        questionId
        answerGiven
        comments
      }
      userId
      createdAt
    }
  }
`;

export const QUERY_ALLUSERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      username
    }
  }
`;

export const QUERY_ALLMACHINES = gql`
  query GetAllMachines {
    getAllMachines {
      id
      name
    }
  }
`;

export const DELETE_PRECHECKLOG = gql`
  mutation DeletePreCheckLog($id: ID!) {
    deletePreCheckLog(_id: $id)
  }
`;

function Dashboard() {
  const { loading: logLoading, error: logError, data: logData, refetch } = useQuery(GET_ALLPRECHECKLOGS);
  console.log(logData);

  const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ALLUSERS);
  const { loading: machineLoading, error: machineError, data: machineData } = useQuery(QUERY_ALLMACHINES);
  const [deletePreCheckLog] = useMutation(DELETE_PRECHECKLOG);

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (logData && userData && machineData) {
      setLogs(logData.getAllPreCheckLogs.map(log => {
        const machine = machineData.getAllMachines.find(m => m.id === log.machineId);
        const user = userData.getAllUsers.find(u => u.id === log.userId);
        return {
          ...log,
          machineName: machine?.name,
          username: user?.username,
        };
      }));
    }
  }, [logData, userData, machineData]);

  const handleDeletePreCheckLog = async (id) => {
    try {
      await deletePreCheckLog({ variables: { id } });
      refetch(); // Refresh the list after deletion
    } catch (err) {
      console.error("Failed to delete PreCheckLog:", err);
    }
  };

  if (logLoading || userLoading || machineLoading) return "Loading...";
  if (logError || userError || machineError) return `Error! ${logError?.message || userError?.message || machineError?.message}`;

  return (
    <div>
      <h1>Dashboard</h1>
      {logs.map((log, index) => (
        <div key={index}>
          <Card title={`PreCheckLog - ${log.machineName || log.machineId}`}>
            <p>Machine Name: {log.machineName || log.machineId}</p>
            <p>Comments:</p>
            <ul>
              {log.questionAnswers.map((qa, idx) => (
                <li key={idx}>{qa.comments}</li>
              ))}
            </ul>
            <p>Username: {log.username || log.userId}</p>
            <p>Date Created: {log.createdAt ? new Date(parseInt(log.createdAt, 10)).toLocaleString() : 'Invalid Date'}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to={`/preCheckLogs/${log.id}`}>
                <button style={{ padding: '8px 12px', cursor: 'pointer' }}>Details</button>
              </Link>
              <button onClick={() => handleDeletePreCheckLog(log.id)}>Delete</button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
