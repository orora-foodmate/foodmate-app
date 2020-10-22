import { connect } from 'react-redux';
import { getFriendsAction, inviteFriendByWebsocketAction, rejectFriendByWebsocketAction } from '~/actions/friendActions';
import FriendScreen from './view';


const mapStateToProps = ({ auth }) => {
  const userId = auth.get('_id');
  const socket = auth.get('socket');

  return {
    userId,
    socket,
    isAuth: auth.get('isAuth'),
  };
};

const mapDispatchToProps = dispatch => ({
  handleInviteFriendByWebsocket: payload => {
    dispatch(inviteFriendByWebsocketAction(payload));
  },
  handleRejectFriendByWebsocket: payload => {
    dispatch(rejectFriendByWebsocketAction(payload));
  },
  handleGetFriends: payload => {
    dispatch(getFriendsAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendScreen);