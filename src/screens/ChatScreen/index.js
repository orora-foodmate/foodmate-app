import { connect } from 'react-redux';
import { addMessageAction, getMessagesAction } from '~/actions/messageActions';
import ChatScreen from './view';

const mapStateToProps = ({ auth, setting }) => {
  const database = setting.get('database');
  // const messageQuery = database.messages.find({}).sort( {createAt: -1});
  // console.log("mapStateToProps -> database", database)
  return {
    userId: auth.get('id'),
    // messageQuery,
  };
};

const mapDispatchToProps = dispatch => ({
  handleGetMessages: payload => {
    dispatch(getMessagesAction(payload));
  },
  handleAddMessage: payload => {
    dispatch(addMessageAction(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen);
