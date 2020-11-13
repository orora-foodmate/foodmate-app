import { connect } from 'react-redux';
import CreateActivityScreen from './view';
import { updateUserAction } from '~/actions/authActions';
import { createEventAction } from '~/actions/eventActions';

const mapStateToProps = ({ auth }) => ({
  userId: auth.get('id')
});

const mapDispatchToProps = dispatch => ({
  handleCreateEvent: payload => {
  console.log("handleCreateEvent")
    dispatch(createEventAction(payload));
  },
  handleUpdateUser: payload => {
    dispatch(updateUserAction(payload));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateActivityScreen);
