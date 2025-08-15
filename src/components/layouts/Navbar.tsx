import styled from "@emotion/styled";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  // Example: user.avatar can be a URL if available
  const avatarUrl = user?.avatar || null;
  console.log('avatarUrl')
  console.log(avatarUrl)

  // Generate initials if no avatar
  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <NavbarContainer>
      <h2>University of Quick</h2>

      {user && (
        <ProfileContainer>
          <Avatar>
            {avatarUrl ? <img src={avatarUrl} alt={user.name} /> : initials}
          </Avatar>
          <ProfileInfo>
            <Name>{user.name}</Name>
            <Role>{user.role}</Role>
          </ProfileInfo>
        </ProfileContainer>
      )}
    </NavbarContainer>
  );
}

const NavbarContainer = styled.header`
  background-color: white;
  color: #2c3e50;
  padding: 0px 16px;
  border-bottom: 1px solid #ddd;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: 500;
`;

const Role = styled.span`
  font-size: 0.8rem;
  color: #666;
  text-transform: capitalize;
`;
