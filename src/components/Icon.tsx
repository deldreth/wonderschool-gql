import React from 'react';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export interface Props {
  variant ?: 'right';
  icon: IconDefinition;
  onClick?: ( event: React.MouseEvent<HTMLDivElement> ) => void;
}
const Icon = ( { icon, onClick, variant }: Props ) => (
  <IconContainer
    variant={ variant }
    onClick={ onClick }>
    <FontAwesomeIcon icon={ icon }/>
  </IconContainer>
);

export default Icon;

interface IconContainerProps {
  variant?: Props[ 'variant' ];
}
const IconContainer = styled<IconContainerProps, 'div'>( 'div' )`
  margin: ${ props => {
    switch ( props.variant ) {
      case 'right':
        return '0px 0px 0px 16px';
      default:
        return '0px 16px 0px 0px';
    }
  } };
`;
