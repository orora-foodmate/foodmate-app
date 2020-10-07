import { connect } from 'react-redux';
import Home from './view';

const mapStateToProps = ({ auth }) => ({
  isAuth: auth.get('isAuth'),

});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);