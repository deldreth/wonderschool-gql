export const mockQuery = ( query: string, data: any, variables?: any ) => ( {
  request: { query, variables },
  result: { data },
} );

export const mockMatch = {
  params: {
    group: '1',
  },
  isExact: false,
  path: '',
  url: '',
};
