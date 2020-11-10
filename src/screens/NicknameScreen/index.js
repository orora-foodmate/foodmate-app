import { connect } from 'react-redux';
import NickNameScreen from './view';
import { updateUserAction } from '~/actions/authActions';

const mapStateToProps = ({ auth }) => ({
  userId: auth.get('_id')
});

const mapDispatchToProps = dispatch => ({
  handleUpdateUser: payload => {
    dispatch(updateUserAction(payload));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NickNameScreen);
