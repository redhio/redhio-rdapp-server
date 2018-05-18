import { connect } from 'react-redux';
import Login from './Login';
import { login } from 'reducers/account';

const mapDispatchToProps = {
  login
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
