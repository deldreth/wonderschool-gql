import { SyntheticEvent } from 'react';
import styled from 'styled-components';

export const ListContainer = styled.div`
  width: 370px;
  margin: 16px;
`;

interface ListItemProps {
  variant?: string;
  onClick?: ( event: SyntheticEvent<MouseEvent> ) => void;
  hover?: boolean;
}
export const ListItem = styled<ListItemProps, 'div'>( 'div' )`
  display: flex;
  align-items: center;
  justify-content: ${ props => {
    switch ( props.variant ) {
      case 'header':
        return 'space-between';
      default:
        return 'flex-start';
    }
  } }

  cursor: ${ props => props.hover ? 'pointer' : 'default' };

  height: 70px;
  border-bottom: thin solid lightgrey;

  font-size: ${ props => {
    switch ( props.variant ) {
      case 'header':
        return '24px';
      default:
        return '16px';
    }
  } }

  input {
    padding: 8px;
    width: 100%;
  }

  .icon {
    margin-left: 16px;
  }
`;

export const Icon = styled.div`
  margin-right: 16px;
  width: 30px;
  text-align: center;
`;

export const Loading = styled.div`
`;
