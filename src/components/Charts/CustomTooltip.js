/* eslint-disable react/prop-types */
import styled from 'styled-components';

import tw from 'twin.macro';
import { formatPrice } from '../../utils';

export const CustomTooltipStyled = styled.div`
  ${tw`py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm duration-300 dark:bg-gray-700`}
`;

export default function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipStyled className="custom-tooltip">
        <p className="label">{`${payload[0].name} : ${formatPrice(payload[0].value)}`}</p>
      </CustomTooltipStyled>
    );
  }

  return null;
}
