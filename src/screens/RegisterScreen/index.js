import { connect } from 'react-redux';
import RegisteUserScreen from './view';
import { registeUserAction } from '~/actions/authActions';

const mapStateToProps = ({ auth }) => ({
});

const mapDispatchToProps = dispatch => ({
  handleRegisteUser: payload => {
    dispatch(registeUserAction(payload));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisteUserScreen);
