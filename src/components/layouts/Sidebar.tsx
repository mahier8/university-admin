import { useState } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";  // Import your auth context

// icons
import { FaTachometerAlt, FaBook, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuth();  
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogoutClick = () => setShowLogoutModal(true);

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate("/login");
  };

  const cancelLogout = () => setShowLogoutModal(false);


  return (
    <SidebarContainer collapsed={collapsed}>
      <Hamburger onClick={toggleSidebar} collapsed={collapsed}>
        <span />
        <span />
        <span />
      </Hamburger>

      {!collapsed && (
        <>
          {/* <h2>Menu</h2> */}
          <ul>
            <li>
              <StyledLink to="/dashboard">
                <FaTachometerAlt />
                Dashboard
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/courses">
                <FaBook />
                Courses
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/profile">
                <FaUser />
                Profile
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/settings">
                <FaCog />
                Settings
              </StyledLink>
            </li>
            <li>
              <LogoutButton onClick={handleLogoutClick}>
                <FaSignOutAlt />
                Logout
              </LogoutButton>
            </li>
          </ul>
        </>
      )}

      {showLogoutModal && (
        <ModalOverlay>
          <ModalContent>
            <p>Are you sure you want to logout?</p>
            <Buttons>
              <Button onClick={cancelLogout} cancel>
                Cancel
              </Button>
              <Button onClick={confirmLogout}>Logout</Button>
            </Buttons>
          </ModalContent>
        </ModalOverlay>
      )}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.aside<{ collapsed: boolean }>`
  width: ${(props) => (props.collapsed ? "60px" : "160px")};
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  transition: width 0.3s ease;
  overflow: hidden;

  h2 {
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;

  li {
      margin-bottom: 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e0e0e0; 
      padding-bottom: 5px; 

      svg {
        margin-right: 10px;
        font-size: 18px;
      }
    }
  }
`;

const Hamburger = styled.div<{ collapsed: boolean }>`
  width: 30px;
  height: 25px;
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;

  span {
    display: block;
    height: 3px;
    background: white;
    margin: 5px 0;
    border-radius: 2px;
    transition: all 0.3s ease;
    position: relative;
  }

  /* Animate hamburger to X when collapsed */
  ${(props) =>
    props.collapsed &&
    `
    span:nth-of-type(1) {
      transform: rotate(45deg);
      top: 8px;
      position: absolute;
      width: 30px;
    }
    span:nth-of-type(2) {
      opacity: 0;
    }
    span:nth-of-type(3) {
      transform: rotate(-45deg);
      top: 8px;
      position: absolute;
      width: 30px;
    }
  `}
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    font-size: 18px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  all: unset;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  font: inherit;

  svg {
    margin-right: 10px;
    font-size: 18px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px 30px;
  border-radius: 8px;
  width: 320px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);

  p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    color: #333;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button<{ cancel?: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  min-width: 100px;
  background-color: ${(props) => (props.cancel ? "#ddd" : "#2c3e50")};
  color: ${(props) => (props.cancel ? "#333" : "white")};

  &:hover {
    background-color: ${(props) => (props.cancel ? "#bbb" : "#2c3e50")};
  }
`;

