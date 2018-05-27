import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { DateTime } from 'luxon';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter } from 'react-router-dom';

import TaskGroup from 'app/containers/TaskGroup';
import { allGroups } from 'app/containers/TaskGroup/__mocks';
import { allTasks } from 'app/containers/TaskList/__mocks';
import { ALL_GROUPS_QUERY, ALL_TASKS_QUERY } from 'app/graph/queries';

// const stories = storiesOf( 'Group', module );
// stories.addDecorator( story => (
//   <MemoryRouter>
//     { story() }
//   </MemoryRouter>
// ) );

// stories.add( 'No groups', () => {
//   const mocks: any = [ {
//     request: {
//       query: ALL_GROUPS_QUERY,
//     },
//     result: {
//       data: {
//         allGroups: [], 
//       },
//     },
//   }, {
//     request: {
//       query: ALL_TASKS_QUERY,
//     },
//     result: {
//       data: {
//         allTasks: [], 
//       },
//     },
//   } ];

//   return (
//     <MockedProvider mocks={ mocks }>
//       <TaskGroup />
//     </MockedProvider>
//   );
// } );

// stories.add( 'New group', () => {
//   const mocks: any = [ {
//     request: {
//       query: ALL_GROUPS_QUERY,
//     },
//     result: {
//       data: {
//         allGroups, 
//       },
//     },
//   }, {
//     request: {
//       query: ALL_TASKS_QUERY,
//     },
//     result: {
//       data: {
//         allTasks: [], 
//       },
//     },
//   } ];

//   return (
//     <MockedProvider mocks={ mocks }>
//       <TaskGroup />
//     </MockedProvider>
//   );
// } );

// stories.add( 'With aggregates', () => {
//   const mocks: any = [ {
//     request: {
//       query: ALL_GROUPS_QUERY,
//     },
//     result: {
//       data: {
//         allGroups, 
//       },
//     },
//   }, {
//     request: {
//       query: ALL_TASKS_QUERY,
//     },
//     result: {
//       data: {
//         allTasks, 
//       },
//     },
//   } ];

//   return (
//     <MockedProvider mocks={ mocks }>
//       <TaskGroup />
//     </MockedProvider>
//   );
// } );

// stories.add( 'Multiple groups, one new', () => {
//   const mocks: any = [ {
//     request: {
//       query: ALL_GROUPS_QUERY,
//     },
//     result: {
//       data: {
//         allGroups: [
//           ...allGroups,
//           {
//             __typename: 'Group',
//             id: '2',
//             name: 'Some Other Group',
//           },
//         ], 
//       },
//     },
//   }, {
//     request: {
//       query: ALL_TASKS_QUERY,
//     },
//     result: {
//       data: {
//         allTasks, 
//       },
//     },
//   } ];

//   return (
//     <MockedProvider mocks={ mocks }>
//       <TaskGroup />
//     </MockedProvider>
//   );
// } );