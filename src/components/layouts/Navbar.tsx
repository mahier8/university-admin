import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Hamburger icon

interface NavbarProps {
  onHamburgerClick: () => void;
}

export default function Navbar({ onHamburgerClick }: NavbarProps) {
  console.log("Navbar props:", { onHamburgerClick });

  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const avatarUrl = user?.avatar ?? null;
  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const goToProfile = () => {
    setMenuOpen(false);
    navigate("/profile");
  };

  return (
    <NavbarContainer>
      {/* Hamburger only visible on small screens */}
      <HamburgerButton onClick={() => { console.log("clicked"); onHamburgerClick(); }}>
        <FaBars size={20} />
      </HamburgerButton>

      <h2>University of Quick</h2>

      {user && (
        <ProfileWrapper ref={profileRef} onClick={() => setMenuOpen((prev) => !prev)}>
          <Avatar>
            {avatarUrl ? <img src={avatarUrl} alt={user.name} /> : initials}
          </Avatar>
          <ProfileInfo>
            <Name>{user.name}</Name>
            <Role>{user.role}</Role>
          </ProfileInfo>

          {menuOpen && (
            <Dropdown>
              <DropdownItem onClick={goToProfile}>Profile</DropdownItem>
              <DropdownItem onClick={() => alert("Change Image clicked!")}>Change Image</DropdownItem>
              <DropdownItem danger onClick={handleLogoutClick}>Logout</DropdownItem>
            </Dropdown>
          )}
        </ProfileWrapper>
      )}

      {showLogoutModal && (
        <ModalBackdrop>
          <Modal>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <ModalActions>
              <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button
                onClick={() => {
                  logout();
                  setShowLogoutModal(false);
                }}
              >
                Logout
              </button>
            </ModalActions>
          </Modal>
        </ModalBackdrop>
      )}
    </NavbarContainer>
  );
}

// ====== Styles ======
const NavbarContainer = styled.header`
  background-color: white;
  color: #2c3e50;
  padding: 0px 16px;
  border-bottom: 1px solid #ddd;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const HamburgerButton = styled.button`
  display: none; /* hidden on desktop */
  border: none;
  cursor: pointer;
  margin-right: 10px;
  background-color: #2c3e50;;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
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

// Dropdown
const Dropdown = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  width: 160px;
  z-index: 10;
`;

const DropdownItem = styled.div<{ danger?: boolean }>`
  padding: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  color: ${(p) => (p.danger ? "#e74c3c" : "#2c3e50")};
  transition: background 0.2s;

  &:hover {
    background: #f5f6fa;
  }
`;

// Modal
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;

  h3 {
    margin-top: 0;
  }
`;

const ModalActions = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:first-of-type {
    background: #ccc;
    color: black;
  }

  button:last-of-type {
    background: #e74c3c;
    color: white;
  }
`;
