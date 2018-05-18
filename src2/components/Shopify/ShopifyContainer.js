import { connect } from 'react-redux';
import Shopify from './Shopify';

const mapDispatchToProps = {
};

const mapStateToProps = (state) => ({
  account: state.account
});

export default connect(mapStateToProps, mapDispatchToProps)(Shopify);
