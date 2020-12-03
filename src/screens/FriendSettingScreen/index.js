import { connect } from 'react-redux';
import FriendSettingScreen from './view';


const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.get('isAuth'),
  };
};

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendSettingScreen);