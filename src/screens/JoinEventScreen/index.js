import { connect } from 'react-redux';
import { joinEventAction } from '~/actions/eventActions';
import JoinEventScreen from './view';

const mapStateToProps = ({ auth, search }) => ({
  authUserId: auth.get('id')
});

const mapDispatchToProps = dispatch => ({
  handleJoinEvent: payload => {
    dispatch(joinEventAction(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinEventScreen);