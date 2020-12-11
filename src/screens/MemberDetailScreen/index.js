import { connect } from 'react-redux';
import MemberDetailScreen from './view';
import { getMemberDetailAction } from '~/actions/userActions';

const mapStateToProps = ({ auth, user }) => ({
  member: user.get('user'),
});

const mapDispatchToProps = dispatch => ({
  handleGetMemberDetail: payload => {
    dispatch(getMemberDetailAction(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetailScreen);