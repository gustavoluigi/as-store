/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import tw from 'twin.macro';
import PropTypes from 'prop-types';

export const Label = styled.label`
  ${tw`absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white`}
`;

export const InputStyled = styled.input`
  /* ${tw`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md h-12 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} */
  ${tw`block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black`}
`;

function Input({ label, ...props }) {
  return (
    <div className="relative mb-4">
      <Label>{label}</Label>
      <InputStyled {...props} />
    </div>
  );
}

export default Input;

Input.propTypes = {
  label: PropTypes.string.isRequired,
  props: PropTypes.object.isRequired,
};
