/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import tw from 'twin.macro';
import PropTypes from 'prop-types';
import Label from './Label';

export const SelectStyled = styled.select`
  ${tw`block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black`}
`;

function Select({ label, options, ...props }) {
  return (
    <div className="relative mb-6">
      <Label>{label}</Label>
      <SelectStyled {...props}>
        <option>Selecione uma opção</option>
        {options
          && options.map((item) => (
            <option key={item.key} value={item.value}>
              {item.label}
            </option>
          ))}
      </SelectStyled>
    </div>
  );
}

export default Select;

Select.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      value: PropTypes.number,
      label: PropTypes.string,
    }),
  ).isRequired,
  props: PropTypes.object,
};

Select.defaultProps = {
  props: {},
};
