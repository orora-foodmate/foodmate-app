import socketClusterClient from 'socketcluster-client';
import isNull from 'lodash/isNull';
import Config from '~/constants/envConfig';

const DEFAULT_AUTO_RECONNECT_OPTIONS = {
  initialDelay: 10000, //milliseconds
  randomness: 10000, //milliseconds
  multiplier: 1.5, //decimal
  maxDelay: 60000 //milliseconds
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
  }
};

class socketClusterHelperClass {
  constructor(options) {
    const {
      port,
      hostname,
      authEngine,
      isLocalStorageEnabled = true,
      autoReconnectOptions = {},
      authTokenName = "socketcluster.authToken",
    } = options;

    this._socketClient = null;
    this.hostname = hostname;
    this.port = port;
    this.authTokenName = authTokenName;
    this.isLocalStorageEnabled = isLocalStorageEnabled;
    this.autoReconnectOptions = { ...DEFAULT_AUTO_RECONNECT_OPTIONS, ...autoReconnectOptions };
    this.authEngine = {
      ...DEFAULT_AUTH_ENGINE,
      ...authEngine
    };
  }

  close = () => {
    console.log('socketClusterHelperClass -> close -> this._socketClient', this._socketClient)
    if (this._socketClient) {
      this._socketClient.closeAllChannelListeners();
      this._socketClient.closeAllChannelOutputs();
      this._socketClient.closeAllChannels();
      this._socketClient.closeAllListeners();
      this._socketClient.closeAllProcedures();
      this._socketClient.closeAllReceivers();
      this._socketClient.channelCloseAllListeners();
      this._socketClient.disconnect();
      this._socketClient = null;
    }
  }

  initialClient(token) {
    try {
      if (!isNull(this._socketClient)) {
        this.close();
      }

      console.log('socketClusterHelperClass -> initialClient -> this.authTokenName', this.authTokenName)
      const authEngine = {
        _internalStorage: {
          [this.authTokenName]: token
        },
      };

      this._socketClient = socketClusterClient.create({
        secure: false,
        hostname: Config.hostname,
        port: Config.port,
        authTokenName: this.authTokenName,
        autoReconnectOptions: {
          initialDelay: 10000, //milliseconds
          randomness: 10000, //milliseconds
          multiplier: 1.5, //decimal
          maxDelay: 60000 //milliseconds
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
          }
        }
      });
      console.log('socketClusterHelperClass -> initialClient -> this._socketClient', this._socketClient)
      return this._socketClient;
    } catch (error) {
      console.log('socketClusterHelperClass -> initialClient -> error', error)

    }

  }

}

const socketClusterHelper = new socketClusterHelperClass({
  hostname: Config.hostname,
  port: Config.port,
});

export default socketClusterHelper;
