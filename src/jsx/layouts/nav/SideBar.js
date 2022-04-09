import React, { Component } from 'react';

/// Link
import { Link } from 'react-router-dom';

/// Scroll
import PerfectScrollbar from 'react-perfect-scrollbar';

/// Menu
import MetisMenu from 'metismenujs';

//icons
import { DashBoardIcon } from '../../components/Icons';

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }

  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={el => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

class SideBar extends Component {
  /// Open menu
  componentDidMount() {
    // sidebar open/close
    var btn = document.querySelector('.nav-control');
    var aaa = document.querySelector('#main-wrapper');

    function toggleFunc() {
      return aaa.classList.toggle('menu-toggle');
    }

    btn.addEventListener('click', toggleFunc);
  }
  render() {
    /// Path
    const path = window.location.pathname;

    return (
      <div className="deznav">
        <PerfectScrollbar className="deznav-scroll">
          <MM className="metismenu" id="menu">
            <li className={`${path === '/' ? 'mm-active' : ''}`}>
              <Link className="ai-icon" to="/">
                <DashBoardIcon />
                <span className="nav-text">Kullanıcılar</span>
              </Link>
            </li>
          </MM>
        </PerfectScrollbar>
      </div>
    );
  }
}

export default SideBar;
