import styled from "@emotion/styled";

export default function Footer() {
  return <FooterContainer>© {new Date().getFullYear()} University Admin</FooterContainer>;
}

const FooterContainer = styled.footer`
  padding: 10px 20px;
  background-color: white;
  border-top: 1px solid #ddd;
  text-align: center;
`;
