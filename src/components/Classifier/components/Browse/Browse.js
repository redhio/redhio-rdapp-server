import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BrowseIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import './styles/browse.scss';

export default class Browse extends Component {

  selectFile(file) {
    this.props.onSelectFile(file);
  }

  render () {
    return (
      <div id="browse" className="browse">
        <input type="file" name="file" id="file"
          accept="image/*" className="browse__input"
          onChange={(e) => this.selectFile(e.target.files)} />
        <label className="browse__input-label" htmlFor="file">
          <BrowseIcon style={{ height: 100, width: 100, color: '#ffffff' }} />
          <div className="browse__input-label__text">Browse</div>
        </label>
      </div>
    );
  }
}

Browse.propTypes = {
  onSelectFile: PropTypes.func
};
