import styled from "@emotion/styled";

interface Props {
  name: string;
}

export default function DashboardSharedContent({ name }: Props) {
  return (
    <SharedContainer>
      <WelcomeMessage>Welcome to Quick University, {name}!</WelcomeMessage>
      <Announcements>
        <h3>Announcements</h3>
        <ul>
          <li>Semester starts on September 5th</li>
          <li>New library hours from next week</li>
          <li>Don’t forget to register for fall courses</li>
        </ul>
      </Announcements>
    </SharedContainer>
  );
}

const SharedContainer = styled.div`
  margin-bottom: 30px;
`;

const WelcomeMessage = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const Announcements = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 5px 0;
    }
  }
`;
