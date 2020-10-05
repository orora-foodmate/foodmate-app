import { connect } from 'react-redux';
import { initialAppAction } from '~/actions/settingActions';
import InitialScreen from './view';

const mapStateToProps = ({setting, auth}) => ({
  isAuth: auth.get('isAuth'),
  isInitialed: setting.get('isInitialed'),
});

const mapDispatchToProps = dispatch => ({
  handleInitialApp: payload => {
    dispatch(initialAppAction(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitialScreen);
