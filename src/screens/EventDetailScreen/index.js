import { connect } from 'react-redux';
import { joinEventAction } from '~/actions/eventActions';
import EventDetail from './view';

const mapStateToProps = ({ auth, setting }) => ({
  authUserId: auth.get('id'),
  database: setting.get('database')
});

const mapDispatchToProps = dispatch => ({
  handleJoinEvent: payload => {
    dispatch(joinEventAction(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetail);
