import { connect } from 'react-redux';
import { updateUserAction } from '~/actions/authActions';
import EditProfileScreen from './view';

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = dispatch => ({
  handleUpdateProfile: payload => {
    dispatch(updateUserAction(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);