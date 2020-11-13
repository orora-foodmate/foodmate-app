import { connect } from 'react-redux';
import RegisterUserScreen from './view';
import { registerUserAction } from '~/actions/authActions';

const mapStateToProps = ({ auth }) => ({
});

const mapDispatchToProps = dispatch => ({
  handleRegisterUser: payload => {
    dispatch(registerUserAction(payload));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterUserScreen);
