import {connect} from 'react-redux';
import {
  inviteFriendAction,
  getUserByAccountAction,
  rejectInviteFriendAction,
  approveInviteFriendAction,
  clearFriendSearchResultAction,
} from '~/actions/friendActions';
import SearchScreen from './view';

const mapStateToProps = ({auth, search}) => ({
  authUserId: auth.get('id'),
  user: search.get('user'),
});

const mapDispatchToProps = (dispatch) => ({
  handleGetUserByAccount: (payload) => {
    dispatch(getUserByAccountAction(payload));
  },
  handleInviteFriend: (payload) => {
    dispatch(inviteFriendAction(payload));
  },
  handleRejectInviteFriend: (payload) => {
    dispatch(rejectInviteFriendAction(payload));
  },
  handleApproveInviteFriend: (payload) => {
    dispatch(approveInviteFriendAction(payload));
  },
  handleClearSearchResult: () => {
    dispatch(clearFriendSearchResultAction());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
