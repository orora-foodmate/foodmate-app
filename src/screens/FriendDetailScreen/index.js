import { connect } from 'react-redux';
import FriendDetailScreen from './view';


const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.get('isAuth'),
  };
};

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendDetailScreen);