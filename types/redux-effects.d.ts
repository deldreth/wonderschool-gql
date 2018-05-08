declare module 'redux-effex' {
  import { Middleware } from 'redux';

  export interface EffectErrorHandlerParams {
    action: object;
    dispatch: ( action: any ) => void;
    getState: () => any;
    nextDispatchAsync: ( actionType: string ) => Promise<object>;
    error: object;
  }

  export interface EffectParams<Action> {
    action?: Action;
    dispatch?: ( action: any ) => void;
    getState?: () => any;
    nextDispatchAsync?: ( actionType: string ) => Promise<object>;
  }

  export type EffectFunction = ( params: EffectParams<any> ) => Promise<any>;

  export interface Effect {
    action: string;
    effect: EffectFunction;
    error?: ( params: EffectErrorHandlerParams ) => void;
  }

  export function effectsMiddleware( effects: Effect[] ): Middleware;
}