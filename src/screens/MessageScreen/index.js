import { connect } from 'react-redux';
import { addMessageByWebsocketAction } from '~/actions/messageActions';
import MessageScreen from './view';


const mapStateToProps = ({ auth, setting }) => {
  const userId = auth.get('id');
  const socket = auth.get('socket');
  return {
    userId,
    socket,
    isAuth: auth.get('isAuth'),
  };
};

const mapDispatchToProps = dispatch => ({
  handleAddMessageByWebsocket: payload => {
    dispatch(addMessageByWebsocketAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);