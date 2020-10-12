import { connect } from 'react-redux';
import { getFriendsAction } from '~/actions/friendActions';
import FriendScreen from './view';


const mapStateToProps = ({ auth, setting }) => {
  const database = setting.get('database');
  const friendQuery = database.friends.find();
  const userId = auth.get('_id');
  return {
    userId,
    isAuth: auth.get('isAuth'),
    friendQuery,
  };
};

const mapDispatchToProps = dispatch => ({
  handleGetFriends: payload => {
    dispatch(getFriendsAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendScreen);