import { connect } from 'react-redux';
import SettingScreen from './view';
import { logoutAction } from '~/actions/authActions';

const mapStateToProps = ({ auth }) => ({
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => {
    dispatch(logoutAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);