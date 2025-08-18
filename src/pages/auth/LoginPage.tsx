import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import universityImage from "../../assets/images/university_pic.jpg";
import styled from "@emotion/styled";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Container>
      <LeftPanel>
        <LoginBox>
          <Title>University Admin Login</Title>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </FormGroup>
            <Button type="submit">Login</Button>
          </form>
        </LoginBox>
      </LeftPanel>

      <RightPanel>
        <Image src={universityImage} alt="University Campus" />
      </RightPanel>
    </Container>
  );
}

// Styled Components

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const LeftPanel = styled.div`
  width: 300px;
  background-color: #f9fafb; /* bg-gray-50 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 430px) {
    width: 100%; /* take full width */
    background: url(${universityImage}) no-repeat center center;
    background-size: cover;
    position: relative;

    /* Optional overlay for readability */
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4); /* darken the image */
      border-radius: inherit;
    }

    /* Make sure content stays readable above overlay */
    > * {
      position: relative;
      z-index: 1;
    }
  }
`;

const LoginBox = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1.25rem; /* rounded-2xl */
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); /* shadow-xl */
  width: 100%;
  border: 1px solid #e5e7eb; /* border-gray-200 */

  @media (max-width: 430px) {
    margin-bottom: 130px; /* move higher on smaller screens */
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  color: #1f2937; /* text-gray-800 */
  text-align: center;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #374151; /* text-gray-700 */
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 86%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db; /* border */
  border-radius: 0.5rem; /* rounded-lg */
  outline: none;
  transition: box-shadow 0.2s ease;
  &:focus {
    box-shadow: 0 0 0 2px #60a5fa; /* focus:ring-2 focus:ring-blue-400 */
    border-color: #60a5fa;
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: #2563eb; /* bg-blue-600 */
  color: white;
  padding: 0.625rem 0;
  border-radius: 0.5rem; /* rounded-lg */
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border: none;

  &:hover {
    background-color: #1e40af; /* bg-blue-700 */
  }
`;

const RightPanel = styled.div`
  flex: 1;

  @media (max-width: 430px) {
    display: none; /* hide the right panel */
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
