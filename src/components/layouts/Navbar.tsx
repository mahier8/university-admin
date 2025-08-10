import styled from "@emotion/styled";

export default function Navbar() {
  return (
    <NavbarContainer>
      <h2>University of Quick</h2>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.header`
  background-color: white;
  color: #2c3e50;
  padding: 0px 16px;
  border-bottom: 1px solid #ddd;
  font-size: 0.95rem; /* Optional: smaller text size */
  display: flex;
  align-items: center;
`;
