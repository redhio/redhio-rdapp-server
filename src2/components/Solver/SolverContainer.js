import { connect } from 'react-redux';
import Solver from './Solver';

const mapDispatchToProps = {
};

const mapStateToProps = (state) => ({
  account: state.account
});

export default connect(mapStateToProps, mapDispatchToProps)(Solver);
