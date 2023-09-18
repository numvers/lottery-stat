import styled from "styled-components";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Centering>
      <FixedWidth>{children}</FixedWidth>
    </Centering>
  );
}

const Centering = styled.div`
  display: flex;
  justify-content: center;
`;
const FixedWidth = styled.div`
  width: 500px;
  @media (max-width: 500px) {
    /* 화면 너비가 500px 이하가 되면 요소 너비를 100%로 고정*/
    width: 100%;
  }
`;
