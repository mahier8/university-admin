import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// icons
import { FaTachometerAlt, FaBook, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 768);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Toggle sidebar
  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  // Keep sidebar responsive on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileOpen]);


  const handleLogoutClick = () => setShowLogoutModal(true);

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate("/login");
  };

  const cancelLogout = () => setShowLogoutModal(false);

  return (
    <>
      <SidebarContainer collapsed={collapsed} mobileOpen={mobileOpen}>
        <Hamburger onClick={toggleSidebar} collapsed={collapsed}>
          <span />
          <span />
          <span />
        </Hamburger>

        {(!collapsed || mobileOpen) && (
          <ul>
            <li>
              <StyledLink to="/dashboard"> <FaTachometerAlt /> Dashboard </StyledLink>
            </li>
            <li>
              <StyledLink to="/courses"> <FaBook /> Courses </StyledLink>
            </li>
            <li>
              <StyledLink to="/profile"> <FaUser /> Profile </StyledLink>
            </li>
            <li>
              <StyledLink to="/settings"> <FaCog /> Settings </StyledLink>
            </li>
            <li>
              <LogoutButton onClick={handleLogoutClick}> <FaSignOutAlt /> Logout </LogoutButton>
            </li>
          </ul>
        )}
      </SidebarContainer>

      {showLogoutModal && (
        <ModalOverlay>
          <ModalContent>
            <p>Are you sure you want to logout?</p>
            <Buttons>
              <Button onClick={cancelLogout} cancel>Cancel</Button>
              <Button onClick={confirmLogout}>Logout</Button>
            </Buttons>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

const SidebarContainer = styled.aside<{ collapsed: boolean; mobileOpen: boolean }>`
  width: ${(props) => (props.collapsed ? "120px" : "160px")};
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  transition: width 0.3s ease;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${(props) => (props.mobileOpen ? "0" : "-160px")};
    height: 100%;
    z-index: 1009;
    transition: left 0.3s ease;
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

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${(props) => (props.mobileOpen ? "0" : "-160px")};
    height: 100%;
    z-index: 1000;
    transition: left 0.3s ease;
  }
`;

const Hamburger = styled.div<{ collapsed: boolean }>`
  width: 30px;
  height: 25px;
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;
  z-index: 1001; /* make sure it's above mobile sidebar */

  span {
    display: block;
    height: 3px;
    background: white;
    margin: 5px 0;
    border-radius: 2px;
    transition: all 0.3s ease;
    position: relative;
  }

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
