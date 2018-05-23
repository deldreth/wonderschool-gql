
import { Task as TaskType } from 'app/types';
import { Props } from './index';

/**
 * resolveParentLocks - Iterate over all tasks and determine
 * parent relationship. If a parent is being placed in a locked state
 * then the task needs to be updated to reflect that.
 * 
 * This probably isn't the most performant approach... maybe offload
 * batch writes to cache?
 */
export function resolveParentLocks ( id: string,
                                     allTasks: TaskType[],
                                     updateTask: Props['updateTask'] ) {
  const depends: string[] = [];
  // Recurse the dependency graph
  const parentIds = ( treeId: string ) => {
    allTasks.forEach( task => {
      if ( task.dependencyIds.includes( parseInt( treeId, 10 ) ) && !depends.includes( task.id ) && task.completedAt ) {
        depends.push( task.id );
        updateTask( { variables: { id: task.id, completedAt: null } } );
        return parentIds( task.id );
      }
    } );
  };
  
  parentIds( id );
}

export function resolveLocks ( dependencies: number[], allTasks: TaskType[] ): boolean {
  let locked = false;
  allTasks.forEach( depends => {
    if ( dependencies.includes( parseInt( depends.id, 10 ) ) && !depends.completedAt ) {
      locked = true;
    }
  } );

  return locked;
}
