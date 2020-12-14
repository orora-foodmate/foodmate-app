import { connect } from 'react-redux';
import { updateProfileAction } from '~/actions/userActions';
import EditProfileScreen from './view';

const mapStateToProps = ({ auth }) => ({
  auth
});

const mapDispatchToProps = dispatch => ({
  handleUpdateProfile: payload => {
    dispatch(updateProfileAction(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);