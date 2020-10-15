import { connect } from 'react-redux';
import { addMessageAction, getMessagesAction } from '~/actions/messageActions';
import ChatScreen from './view';

const mapStateToProps = ({ auth }) => ({
  userId: auth.get('_id'),
});

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
