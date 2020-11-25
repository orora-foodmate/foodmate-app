import { connect } from 'react-redux';
import EventDetail from './view';

const mapStateToProps = ({ auth, search }) => ({
  authUserId: auth.get('id')
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetail);
