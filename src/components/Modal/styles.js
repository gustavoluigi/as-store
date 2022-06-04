import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: ${({ openModal }) => (openModal ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: ${fadeIn} 0.7s forwards ease;
`;

export const Container = styled.div`
  max-width: 90%;
  width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  position: relative;

  h2 {
    margin-top: 1rem;
    margin-bottom: 2rem;

    + small {
      margin-top: -1rem;
      margin-bottom: 2rem;
      display: block;
    }
  }
`;

export const CloseModal = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;
