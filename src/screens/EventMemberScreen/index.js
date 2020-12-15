import { connect } from 'react-redux';
import EventMember from './view';
import { rejectEventMemberByAdminAction, validEventMemberAction } from '~/actions/eventActions';

const mapStateToProps = ({ auth, setting }) => ({
  authUserId: auth.get('id'),
  database: setting.get('database')
});

const mapDispatchToProps = dispatch => ({
  handleValidEventMember: payload => {
    dispatch(validEventMemberAction(payload));
  },
  handleRejectEventMember: payload => {
    dispatch(rejectEventMemberByAdminAction(payload));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventMember);
