module.exports = {
  groups : [
    {
      id: 1,
      name: 'Purchases'
    },
    {
      id: 2,
      name: 'Build Airplane'
    }
  ],
  tasks: [
    {
      id: 1,
      group_id: 1,
      task: 'Go to the bank',
      dependencyIds: [],
      completedAt: null,
    },
    {
      id: 2,
      group_id: 1,
      task: 'Buy hammer',
      dependencyIds: [1],
      completedAt: null,
    },
    {
      id: 3,
      group_id: 1,
      task: 'Buy wood',
      dependencyIds: [1],
      completedAt: null,
    },
    {
      id: 4,
      group_id: 1,
      task: 'Buy nails',
      dependencyIds: [1],
      completedAt: null,
    },
    {
      id: 5,
      group_id: 1,
      task: 'Buy paint',
      dependencyIds: [1],
      completedAt: null,
    },
    {
      id: 6,
      group_id: 2,
      task: 'Hammer nails into wood',
      dependencyIds: [2, 3, 4],
      completedAt: null,
    },
    {
      id: 7,
      group_id: 2,
      task: 'Paint wings',
      dependencyIds: [5, 6],
      completedAt: null,
    },
    {
      id: 8,
      group_id: 2,
      task: 'Have a snack',
      dependencyIds: [11],
      completedAt: null,
    },
  ]
};
