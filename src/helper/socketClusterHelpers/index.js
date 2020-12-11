import socketClusterClient from 'socketcluster-client';
import isNull from 'lodash/isNull';
import Config from 'react-native-config';
import { parseEventItems, parseFriendItems } from '~/utils/utils';
import { inviteFriendAction, rejectFriendByWebsocketAction, approveFriendByWebsocketAction } from './actions/friendActions';
import { createEventByWebsocketAction } from './actions/eventActions';

const DEFAULT_AUTO_RECONNECT_OPTIONS = {
  initialDelay: 10000, //milliseconds
  randomness: 10000, //milliseconds
  multiplier: 1.5, //decimal
  maxDelay: 60000, //milliseconds
};

const DEFAULT_AUTH_ENGINE = {
  // _internalStorage: {
  //   "socketcluster.authToken": loginUser.token
  // },
  isLocalStorageEnabled: true,
  saveToken: (name, token, options) => {
    this._internalStorage[name] = token;
    return Promise.resolve(token);
  },
  removeToken: function (name) {
    const loadPromise = this.loadToken(name);
    delete this._internalStorage[name];
    return loadPromise;
  },
  loadToken: function (name) {
    const token = this._internalStorage[name] || null;
    return Promise.resolve(token);
  },
};

async function lissenEvent(socket, eventName, cb) {
  const listener = socket.listener(eventName);
  let asyncIterator = listener.createConsumer();

  while (true) {
    let packet = await asyncIterator.next();
    if (packet.done) break;
    cb(packet.value);
  }
}

class socketClusterHelperClass {
  constructor(options) {
    const {
      port,
      hostname,
      authEngine,
      isLocalStorageEnabled = true,
      autoReconnectOptions = {},
      authTokenName = 'socketcluster.authToken',
    } = options;

    this._socketClient = null;
    this._emit = null;
    this._subscribes = {};
    this.hostname = hostname;
    this.port = port;
    this.authTokenName = authTokenName;
    this.isLocalStorageEnabled = isLocalStorageEnabled;
    this.autoReconnectOptions = {
      ...DEFAULT_AUTO_RECONNECT_OPTIONS,
      ...autoReconnectOptions,
    };
    this.authEngine = {
      ...DEFAULT_AUTH_ENGINE,
      ...authEngine,
    };
  }

  setEmit = (emit = null) => {
    this._emit = emit;
  }

  subscribe = (channelName, actionFunction) => {
    const channel = this._socketClient.subscribe(channelName);
    this._subscribes[channelName] = channel;
    this.subscribeWatcher(channel, actionFunction);
  };

  basicSubscribe = (userId) => {
    this.subscribe(`friend.approveFriend.${userId}`, (payload) => this._emit(approveFriendByWebsocketAction(payload)));
    this.subscribe(`friend.inviteFriend.${userId}`, (payload) => this._emit(inviteFriendAction(payload)));
    this.subscribe(`friend.rejectFriend.${userId}`, (payload) => this._emit(rejectFriendByWebsocketAction(payload)));
    this.subscribe(`event.created`, (payload) => {
    console.log("socketClusterHelperClass -> payload", payload)
      this._emit(createEventByWebsocketAction(payload));
    });
  }

  basicUnsubscribe = (userId) => {
    ['event.created', `friend.approveFriend.${userId}`, `friend.inviteFriend.${userId}`, `friend.rejectFriend.${userId}`].map(key => {
      const channel = this._subscribes[key];
      if(channel) channel.kill();
      this._subscribes[key] = undefined;
    })
  }

  subscribeWatcher = async (channel, actionFunction) => {
    let asyncIterator = channel.createConsumer();
    while (true) {
      let packet = await asyncIterator.next();
      if (packet.done) break;
      actionFunction(packet.value);
    }
  }

  close = () => {
    if (this._socketClient) {
      this._socketClient.disconnect();
      this._socketClient.closeAllChannelListeners();
      this._socketClient.closeAllChannelOutputs();
      this._socketClient.closeAllChannels();
      this._socketClient.closeAllListeners();
      this._socketClient.closeAllProcedures();
      this._socketClient.closeAllReceivers();
      this._socketClient.channelCloseAllListeners();
      this._socketClient = null;
    }
  };

  initialClient(token, database) {
    try {
      if (!isNull(this._socketClient)) {
        this.close();
      }

      const authEngine = {
        _internalStorage: {
          [this.authTokenName]: token,
        },
      };

      this._socketClient = socketClusterClient.create({
        secure: false,
        hostname: Config.HOST_NAME,
        port: Config.PORT,
        authTokenName: this.authTokenName,
        autoReconnectOptions: {
          initialDelay: 10000, //milliseconds
          randomness: 10000, //milliseconds
          multiplier: 1.5, //decimal
          maxDelay: 60000, //milliseconds
        },
        authEngine: {
          ...authEngine,
          isLocalStorageEnabled: true,
          saveToken: (name, token, options) => {
            this._internalStorage[name] = token;
            return Promise.resolve(token);
          },
          removeToken: function (name) {
            const loadPromise = this.loadToken(name);
            delete this._internalStorage[name];
            return loadPromise;
          },
          loadToken: function (name) {
            const token = this._internalStorage[name] || null;
            return Promise.resolve(token);
          },
        },
      });

      const getSyncDateQuery = async (database) => {
        const [maxCreataAtEvent = null] = await database.events
          .find()
          .sort({ createAt: -1 })
          .limit(1)
          .exec();
        const [maxUpdateAtEvent = null] = await database.events
          .find()
          .sort({ updateAt: -1 })
          .limit(1)
          .exec();
        const [maxCreateAtFriend = null] = await database.friends
          .find()
          .sort({ createAt: -1 })
          .limit(1)
          .exec();
        const [maxUpdateAtFriend = null] = await database.friends
          .find()
          .sort({ updateAt: -1 })
          .limit(1)
          .exec();

        const syncData = {};
        if (maxCreataAtEvent)
          syncData.eventMaxCreateAt = maxCreataAtEvent.createAt;
        if (maxUpdateAtEvent)
          syncData.eventMaxUpdateAt = maxUpdateAtEvent.updateAt;
        if (maxCreateAtFriend)
          syncData.friendMaxCreateAt = maxCreateAtFriend.createAt;
        if (maxUpdateAtFriend)
          syncData.friendMaxUpdateAt = maxUpdateAtFriend.updateAt;
        return syncData;
      };

      lissenEvent(this._socketClient, 'connect', async () => {
        const query = await getSyncDateQuery(database);
        const { friends, events } = await this._socketClient.invoke(
          'syncData',
          query
          );
          console.log("socketClusterHelperClass -> initialClient -> events", events)

        if (friends.length !== 0) {
          const friendItems = parseFriendItems(friends);
          await database.friends.bulkInsert(friendItems);
        }

        if (events.length !== 0) {
          const eventItems = parseEventItems(events);
          await database.events.bulkInsert(eventItems);
        }
      });

      return this._socketClient;
    } catch (error) {
      console.log('socketClusterHelperClass -> initialClient -> error', error);
    }
  }
}

const socketClusterHelper = new socketClusterHelperClass({
  hostname: Config.hostname,
  port: Config.port,
});

export default socketClusterHelper;
