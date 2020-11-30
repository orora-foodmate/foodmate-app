import { connect } from 'react-redux';
import { getFriendsAction } from '~/actions/friendActions';
import FriendScreen from './view';


const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.get('isAuth'),
  };
};

const mapDispatchToProps = dispatch => ({
  handleGetFriends: payload => {
    dispatch(getFriendsAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendScreen);