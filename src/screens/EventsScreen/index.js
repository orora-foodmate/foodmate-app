import { connect } from 'react-redux';
import { registerWebsocketAction } from '~/actions/settingActions';
import EventsScreen from './view';

const mapStateToProps = ({ auth, search }) => ({
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
