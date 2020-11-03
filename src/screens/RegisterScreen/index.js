import { connect } from 'react-redux';
import RegisteUserScreen from './view';
import { registerUserAction } from '~/actions/authActions';

const mapStateToProps = ({ auth }) => ({
});

const mapDispatchToProps = dispatch => ({
  handleRegisteUser: payload => {
    dispatch(registerUserAction(payload));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisteUserScreen);
