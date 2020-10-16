import { connect } from 'react-redux';
import { getUserByIdAction } from '~/actions/friendActions';
import SearchScreen from './view';

const mapStateToProps = ({ search }) => ({
  user: search.get('user'),
});

const mapDispatchToProps = dispatch => ({
  handleGetUserById: payload => {
    dispatch(getUserByIdAction(payload));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
