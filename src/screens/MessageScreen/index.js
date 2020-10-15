import { connect } from 'react-redux';
import { getRoomsAction } from '~/actions/roomActions';
import MessageScreen from './view';


const mapStateToProps = ({ auth, setting }) => {
  const database = setting.get('database');
  const roomQuery = database.rooms.find();
  const userId = auth.get('_id');
  return {
    userId,
    isAuth: auth.get('isAuth'),
    roomQuery,
  };
};

const mapDispatchToProps = dispatch => ({
  handleGetRooms: payload => {
    dispatch(getRoomsAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);