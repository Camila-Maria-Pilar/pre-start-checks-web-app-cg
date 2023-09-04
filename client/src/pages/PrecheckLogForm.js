import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PRECHECKLOG } from "../utils/mutations";
import { GET_QUESTIONS_BY_MACHINE_ID, QUERY_ALLUSERS, QUERY_MACHINE } from "../utils/queries";
import InputField from '../components/InputField';
import Button from '../components/Button';
import Card from '../components/Card';

const PreCheckLogForm = () => {
  const { id: machineId } = useParams();
  const { loading: questionsLoading, error: questionsError, data } = useQuery(GET_QUESTIONS_BY_MACHINE_ID, {
    variables: { machineId },
  });
  const { loading: machineLoading, error: machineError, data: machineData } = useQuery(QUERY_MACHINE, {
    variables: { getMachineId: machineId },
});

  const { loading: usersLoading, error: usersError, data: userData } = useQuery(QUERY_ALLUSERS);

  const questionsForThisMachine = data?.getQuestionsByMachineId?.[0]?.questions || [];
  const [AddPreCheckLog] = useMutation(ADD_PRECHECKLOG);
  const [answers, setAnswers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [showThanksMessage, setShowThanksMessage] = useState(false);
  const [validationMessages, setValidationMessages] = useState({}); // State for validation messages


  const validateForm = () => {
    let isValid = true;
    let messages = {};

    if (!selectedUserId) {
        messages["user"] = "Please select a username.";
        isValid = false;
    }

    if (answers.length !== questionsForThisMachine.length) {
        messages["answers"] = "Please answer all questions.";
        isValid = false;
    }

    setValidationMessages(messages);
    return isValid;
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;  // If form is not valid, do not proceed with the submission
    }
    try {
      await AddPreCheckLog({
        variables: {
          preCheckLog: {
            machineId,
            userId: selectedUserId,
            questionAnswers: answers,
          },
        },
      });
      setShowThanksMessage(true); // Show thanks message after successful submission
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
  const navigate = useNavigate();
  const closePage = () => {
    navigate('/thanks');
  };
  

  if (showThanksMessage) {
    const selectedUser = userData?.getAllUsers.find(u => u.id === selectedUserId);
    return (
      <Card title="Thank You!" >
        <p>Thanks {selectedUser?.username} for submitting the Pre-Start Check for {machineData?.getMachine?.name || machineId}!</p>
        <p>Now you can close this page!</p>
        <Button label="Close Page" onClick={closePage} />
      </Card>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <img src="/applogo_notbg3.png" alt="App Logo" style={{ width: '200px' }} />
      <h1>Pre-Start Check Form</h1>

      <Card title="User Details">
        <label>1. Please Select your username</label>
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
        
        {validationMessages["user"] && <div style={{color: 'red'}}>{validationMessages["user"]}</div>}
      </Card>

      <Card title="Please answer the questions">
        {questionsForThisMachine.map((question, index) => (
          <div key={index}>
            <p>{index + 1}. {question.text}</p>
            {question.answers.map((answer, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  value={answer}
                  name={`question_${index}`}
                  onChange={(e) => updateAnswer(question.id, e.target.value, "")}
                />
                {answer}
              </label>
            ))}
            <InputField
              placeholder="Leave a Comment"
              onChange={(e) => updateAnswer(question.id, "", e.target.value)}
            />
          </div>
        ))}
        {validationMessages["answers"] && <div style={{color: 'red'}}>{validationMessages["answers"]}</div>}
      </Card>

      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default PreCheckLogForm;
