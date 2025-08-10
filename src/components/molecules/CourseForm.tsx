import React, { useState } from "react";
import styled from "@emotion/styled";

interface CourseFormProps {
  // Optional: add callback prop to handle new course submission
}

export default function CourseForm() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [credits, setCredits] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !name || !credits) {
      alert("Please fill all fields.");
      return;
    }
    alert(`Course Added:\nCode: ${code}\nName: ${name}\nCredits: ${credits}`);
    // Reset form
    setCode("");
    setName("");
    setCredits("");
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>Add New Course</h3>
      <Label>
        Course Code
        <Input value={code} onChange={(e) => setCode(e.target.value)} />
      </Label>
      <Label>
        Course Name
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Label>
      <Label>
        Credits
        <Input
          type="number"
          min={1}
          value={credits}
          onChange={(e) =>
            setCredits(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </Label>
      <Button type="submit">Add Course</Button>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 20px;

  h3 {
    margin-bottom: 12px;
    color: #2c3e50;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
  color: #2c3e50;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 6px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;
