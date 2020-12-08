import { connect } from 'react-redux';
import EventMember from './view';

const mapStateToProps = ({ auth }) => ({
  authUserId: auth.get('userId'),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventMember);
