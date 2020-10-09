import { connect } from 'react-redux';
import { getFriendsAction } from '~/actions/friendActions';
import Home from './view';

const mapStateToProps = ({ auth }) => ({
  isAuth: auth.get('isAuth'),

});

const mapDispatchToProps = dispatch => ({
  handleGetFriends: payload => {
    dispatch(getFriendsAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);