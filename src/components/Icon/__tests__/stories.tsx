import * as React from 'react';

import { faCompass } from '@fortawesome/free-solid-svg-icons/faCompass';
import { storiesOf } from '@storybook/react';

import Icon from 'app/components/Icon';

const stories = storiesOf( 'Icon', module )
  .add( 'Normal', () => <Icon icon={ faCompass }/> )
  .add( 'Right variant', () => <Icon icon={ faCompass } variant="right"/> );
