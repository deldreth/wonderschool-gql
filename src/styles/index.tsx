import styled from 'styled-components';

export const ListContainer = styled.div`
  width: 370px;
  margin: 16px;
`;

interface ListItemProps {
  variant?: string;
}
export const ListItem = styled<ListItemProps, 'div'>( 'div' )`
  display: flex;
  align-items: center;

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
`;

export const Icon = styled.div`
  margin-right: 22px;
  width: 30px;
  text-align: center;
`;

export const Loading = styled.div`
`;
