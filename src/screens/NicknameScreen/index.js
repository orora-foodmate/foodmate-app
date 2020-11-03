import { connect } from 'react-redux';
import NickNameScreen from './view';
import { registerUserAction } from '~/actions/authActions';

const mapStateToProps = ({ auth }) => ({
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NickNameScreen);
