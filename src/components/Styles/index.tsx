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
    padding: 16px 8px;
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    margin: 0px 0px 16px 0px;
  }

  .icon {
    margin-left: 16px;
  }
`;

export const Loading = styled.div`
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const Button = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  background-color: #000000;
  border-radius: 4px;
  height: 22px;
  color: #ffffff;
  padding: 8px;

  &:hover {
    cursor: pointer;
  }
`;
