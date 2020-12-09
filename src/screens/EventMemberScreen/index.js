import { connect } from 'react-redux';
import EventMember from './view';
import { validEventMemberAction } from '~/actions/eventActions';

const mapStateToProps = ({ auth }) => ({
  authUserId: auth.get('id')
});

const mapDispatchToProps = dispatch => ({
  handleValidEventMember: payload => {
    dispatch(validEventMemberAction(payload));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventMember);
