import { connect } from 'react-redux';
import LoginScreen from './view';
import { loginAction, getConfirmationCodeAction } from '~/actions/authActions';

const mapStateToProps = ({ auth }) => ({
  isAuth: auth.get('isAuth'),
  
});

const mapDispatchToProps = dispatch => ({
  handleGetConfirmationCode: payload => {
    dispatch(getConfirmationCodeAction(payload));
  },
  handleLogin: payload => {
    dispatch(loginAction(payload));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
