import { Table } from 'app/entities/table';
import { IActionData } from 'app/interfaces/i-action-data';
import { environment } from 'environments/environment';

export function getActionData(list: any, description: string = ''): IActionData {
  return {
    description: environment.production ? '' : description,
    payload: new Table<string>({
      ids: Object.keys(list),
      list: list
    })
  };
}