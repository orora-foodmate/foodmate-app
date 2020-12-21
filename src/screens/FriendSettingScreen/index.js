import { connect } from 'react-redux';
import { deleteFriendAction } from '~/actions/friendActions';
import FriendSettingScreen from './view';


const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.get('isAuth'),
  };
};

const mapDispatchToProps = dispatch => ({
  handleDeleteFriend: payload => {
    dispatch(deleteFriendAction(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendSettingScreen);