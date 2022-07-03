/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import tw from 'twin.macro';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import Label from './Label';

export const Wrapper = styled.div`
  ${tw`relative mb-6 z-10 focus-within:z-50`}
`;

export const InputStyled = styled.input`
  ${tw`block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black`}
`;

export const LabelStyled = styled(Label)`
  ${tw`z-20`}
`;

export const SelectStyled = styled(CreatableSelect)`

  .react-select__value-container{
    ${tw`w-full mt-0 px-4 py-4 text-base placeholder-gray-400 bg-white rounded-md focus:outline-none focus:border-black`}
  }

  .react-select__control {
    ${tw`border border-gray-300 rounded`}
  }

  .react-select__control {
    ${tw`group-hover:z-10`}
  }

  .react-select__indicator-separator {
    ${tw`first:hidden`}
  }
`;

function Datalist({
  label, options, list, ...props
}) {
  return (
    <Wrapper className="group">
      <LabelStyled>{label}</LabelStyled>
      <SelectStyled
        options={options}
        classNamePrefix="react-select"
        isClearable
        {...props}
      />
    </Wrapper>
  );
}

export default Datalist;

Datalist.propTypes = {
  label: PropTypes.string.isRequired,
  list: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      label: PropTypes.string,
    }),
  ).isRequired,
  props: PropTypes.object,
};

Datalist.defaultProps = {
  props: {},
};
