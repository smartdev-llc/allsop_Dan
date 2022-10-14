import { Table } from "app/entities/table";
import * as _ from "lodash";

export const removeState = (state: Table<string>, action: any) => {
  const result = {
    ids: _.difference(state.ids, action.payload.ids),
    list: _.omit(state.list, action.payload.ids)
  };
  return result;
};

export const addOrUpdateState = (state: Table<string>, action: any) => {
  const addings = _.difference(action.payload.ids, state.ids);
  const updatings = _.intersection(action.payload.ids, state.ids);
  let addingResult: Table<string> = state;
  if (addings.length) {
    addingResult = {
      ids: [...state.ids, ...addings].sort(),
      list: {
        ...state.list,
        ..._.pick(action.payload.list, addings)
      }
    };
  }

  let updatingResult = addingResult;
  if (updatings.length) {
    updatingResult = {
      ...addingResult,
      list: {
        ...addingResult.list,
        ..._.mergeWith({}, _.pick(addingResult.list, updatings), _.pick(action.payload.list, updatings), (objValue: any, srcValue: any) => {
          if (_.isArray(objValue) && _.isArray(srcValue)) {
            return srcValue;
          } else {
            return undefined;
          }
        })
      }
    };
  }
  return state === updatingResult || _.isEqual(state, updatingResult) === true ? state : updatingResult;
};