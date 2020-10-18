import { connect } from 'react-redux';
import { approveInviteFriendAction, getUserByIdAction, inviteFriendAction, rejectInviteFriendAction } from '~/actions/friendActions';
import SearchScreen from './view';

const mapStateToProps = ({ auth, search }) => ({
  authUserId: auth.get('_id'),
  user: search.get('user'),
});

const mapDispatchToProps = dispatch => ({
  handleGetUserById: payload => {
    dispatch(getUserByIdAction(payload));
  },
  handleInviteFriend: payload => {
    dispatch(inviteFriendAction(payload));
  },
  handleRejectInviteFriend: payload => {
    dispatch(rejectInviteFriendAction(payload));
  },
  handleApproveInviteFriend: payload => {
    dispatch(approveInviteFriendAction(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
