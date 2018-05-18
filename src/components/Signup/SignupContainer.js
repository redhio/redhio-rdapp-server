import { connect } from 'react-redux';
import Signup from './Signup';
import { signup } from 'reducers/account';

const mapDispatchToProps = {
  signup
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
