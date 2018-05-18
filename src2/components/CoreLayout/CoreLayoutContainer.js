import { connect } from 'react-redux';
import CoreLayout from './CoreLayout';
import { logout } from 'reducers/account';

const mapDispatchToProps = {
  logout
};

const mapStateToProps = (state) => ({
  account: state.account
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
