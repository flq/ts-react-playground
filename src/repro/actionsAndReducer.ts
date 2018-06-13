import { StringType, ActionCreator, ActionType } from "typesafe-actions/dist/types";
import { createAction, getType } from "typesafe-actions";

export type FetchErrorState = string | null;
export type FetchResultState<R> = R | null;

export function createFetchStore<P extends string, R>(partitionKey: P, initialResult: R | null) {
  const fetchActionCreators = {
    fetchRejected: createMetaActionWithError("FETCH_REJECTED", partitionKey),
    fetchFulfilled: createMetaActionWithPayload<R, "FETCH_FULFILLED", P>("FETCH_FULFILLED", partitionKey)
  };

  type FetchAction = ActionType<typeof fetchActionCreators>;

  function rejectedReducer(state: FetchErrorState = null, action: FetchAction): FetchErrorState {
    if (action.meta !== partitionKey) {
      return state;
    }
    switch (action.type) {
      case getType(fetchActionCreators.fetchRejected):
        return action.payload.message;
      default:
        return state;
    }
  }

  function resultsReducer(state: FetchResultState<R> = initialResult || null, action: FetchAction): FetchResultState<R> {
    if (action.meta !== partitionKey) {
      return state;
    }
    switch (action.type) {
      case getType(fetchActionCreators.fetchFulfilled):
        return action.payload;
      default:
        return state;
    }
  }

  // ...
}

export const createMetaActionWithPayload = <P, T extends string,M>(typeString: T, meta: M) =>
  withType(typeString, type => createAction(type, resolve => (payload: P) => resolve(payload, meta)));

export const createMetaActionWithError = <T extends string, M>(typeString: T, meta: M) =>
  withType(typeString, type => createAction(type, resolve => (cause: Error) => resolve(cause, meta)));

/**
 * See typesafe-actions/utils
 */
export function withType<T extends StringType, AC extends ActionCreator<T>>(
  type: T,
  constructorFunction?: (type: T) => AC
): AC {
  const actionCreator: AC =
    constructorFunction != null
      ? constructorFunction(type)
      : ((() => ({ type })) as AC);
  return Object.assign(actionCreator, { getType: () => type });
}
