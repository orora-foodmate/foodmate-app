import { connect } from 'react-redux';
import { initialAppAction } from '~/actions/settingActions';
import InitialScreen from './view';

const mapStateToProps = ({auth}) => ({
  isAuth: auth.get('isAuth'),
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
