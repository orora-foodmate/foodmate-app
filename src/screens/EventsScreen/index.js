import { connect } from 'react-redux';
import { registerWebsocketAction } from '~/actions/settingActions';
import EventsScreen from './view';

const mapStateToProps = ({ auth }) => ({
  userId: auth.get('id'),
});

const mapDispatchToProps = dispatch => ({
  handleRegisterWebsocket: () => {
    dispatch(registerWebsocketAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsScreen);
