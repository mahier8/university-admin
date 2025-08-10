import { useState } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";

// icons
import { FaTachometerAlt, FaBook, FaCog, FaSignOutAlt } from "react-icons/fa";


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed(!collapsed);

  // Handle logout click
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear auth context/localStorage)
    // Then navigate to login page
    navigate("/login");
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <Hamburger onClick={toggleSidebar} collapsed={collapsed}>
        <span />
        <span />
        <span />
      </Hamburger>

      {!collapsed && (
        <>
<h2>Menu</h2>
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
              <StyledLink to="/settings">
                <FaCog />
                Settings
              </StyledLink>
            </li>
            <li>
              <LogoutButton onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </LogoutButton>
            </li>
          </ul>
        </>
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
      margin-bottom: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;

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

