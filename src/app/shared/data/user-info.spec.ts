import {inject,async,} from '@angular/core/testing';
import { UserInfo, UserInfoJSON } from './user-info';
describe('UserInfo Class', () => {

  function createEntry() {
      return new UserInfo();
  }

  it('should be createable by constructor', () => {

      let usergEntry = createEntry();
      expect(usergEntry.result).toBe(undefined);
      
  });
  it('can be transformed from json', () => {

      let usergEntry: any = createEntry();
      let userEntryJsonData: UserInfoJSON = { 'result': 'success', 'usercol': 'patient', 'userid': '1'};
      usergEntry = UserInfo.fromJSON(userEntryJsonData),
      expect(usergEntry.result).toBe(userEntryJsonData.result);

  });
})
