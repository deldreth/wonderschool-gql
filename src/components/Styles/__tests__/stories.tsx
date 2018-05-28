import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { ListContainer, ListItem, Loading } from 'app/components/Styles';

const stories = storiesOf( 'Styles', module )
  .add( 'List container', () => <ListContainer>Content</ListContainer> )
  .add( 'List item', () => <ListItem>Item</ListItem> )
  .add( 'List item header variant', () => <ListItem variant="header">Header</ListItem> );
