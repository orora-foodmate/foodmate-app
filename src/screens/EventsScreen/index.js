import { connect } from 'react-redux';
import { approveInviteFriendAction, getUserByIdAction, inviteFriendAction, rejectInviteFriendAction } from '~/actions/friendActions';
import SearchScreen from './view';

const mapStateToProps = ({ auth, search }) => ({
  authUserId: auth.get('id'),
  user: search.get('user'),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
