import styled from "@emotion/styled";

interface Announcement {
  id: number;
  title: string;
  date: string;
  description: string;
}

const sampleAnnouncements: Announcement[] = [
  { id: 1, title: "Semester Registration Opens", date: "2025-08-15", description: "Students can now register for the Fall semester courses." },
  { id: 2, title: "Library Maintenance", date: "2025-08-20", description: "The library will be closed for system upgrades from 9 AM to 3 PM." },
  { id: 3, title: "Career Fair", date: "2025-09-05", description: "Join the annual career fair in the Main Hall." },
];

export default function Announcements() {
  return (
    <AnnouncementsContainer>
      <h3>Upcoming Events</h3>
      <ul>
        {sampleAnnouncements.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> <span>({item.date})</span>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </AnnouncementsContainer>
  );
}

const AnnouncementsContainer = styled.section`
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 20px;

  h3 {
    margin-bottom: 12px;
    color: #2c3e50;
  }

  ul {
    list-style: none;
    padding: 0;    
  }

  li {
    margin-bottom: 12px;
  }

  strong {
    color: #2563eb;
  }

  span {
    font-size: 0.85rem;
    color: gray;
  }

  p {
    margin: 4px 0 0;
    font-size: 0.9rem;
    color: #555;
  }
`;
