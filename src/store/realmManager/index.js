import Realm from 'realm';
import {
  friendSchema,
  groupSchema,
  messageSchema,
  userIdSchema
} from './schemas';

class realmHelperClass {
  constructor(options) {
    this.options = options;
    this.realm = null;
  }

  initialHelper = () => {
    return Realm.open(this.options).then(realm => {
      this.realm = realm;
      return realm;
    });
  };
}

const realmHelper = new realmHelperClass({
  schemas: [friendSchema, groupSchema, messageSchema, userIdSchema]
});

export default realmHelper;
