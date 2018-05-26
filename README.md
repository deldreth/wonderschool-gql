# wonderschool-gql

GraphQL based task management list. Data and a rudimentary generated schema for this application is loaded through `json-graphql-server` and is specifically loaded from `db.js`.

### Potential Improvement
- [ ] Component specs
- [x] resolveParentLocks' dependency graph generation be drastically improved with a better algorithm
- [ ] Performance considerations for parent tree resolution for batch updates
- [ ] Batch update mutations
- [x] Composed HOCs to avoid arrow functions in renders (TaskList)
- [ ] Structured graph dir as more types are added?
- [ ] More informative loading states
- [ ] Optimize production build

# Get up and running
```
yarn
yarn start
```
Navigate to `http://localhost:8000`

### Alternatively, if python is accessible...
Start the server:
```
yarn server
```

Start the application:
```
cd dist
python -m SimpleHTTPServer 8000
```
Navigate to `http://localhost:8000`
