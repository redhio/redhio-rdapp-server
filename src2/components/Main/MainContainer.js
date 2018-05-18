import { connect } from 'react-redux';
import Main from './Main';

const mapDispatchToProps = {
};

const mapStateToProps = (state) => ({
  account: state.account
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
