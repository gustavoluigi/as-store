import styled from "styled-components";
import tw from "twin.macro";
function App() {
  return (
    <div>
      <Styled>teste</Styled>
      <TailwindStyled>teste</TailwindStyled>
    </div>
  );
}

export default App;

const TailwindStyled = tw.button`
  background: bg-red-500
  hover:bg-red-700
  text-white
  font-bold
  py-2
  px-4
  border
  border-black
  rounded
`;

// const Styled = styled.h1`
//   color: blue;
//   tw`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-black rounded`;
// `;
// const Styled = styled.h1(() => [
//   tw`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-black rounded`
// ]);
const Styled = styled.button`
  color: blue;
  ${tw`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-black rounded`}
`;
