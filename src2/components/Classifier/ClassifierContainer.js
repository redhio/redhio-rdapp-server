import { connect } from 'react-redux';
import Classifier from './Classifier';

const mapDispatchToProps = {
};

const mapStateToProps = (state) => ({
  account: state.account
});

export default connect(mapStateToProps, mapDispatchToProps)(Classifier);
