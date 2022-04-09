import React from 'react';
import { Link } from 'react-router-dom';
/// Scroll
import PerfectScrollbar from 'react-perfect-scrollbar';

/// Image
import profile from '../../../images/profile/12.png';
import avatar from '../../../images/avatar/1.jpg';
import { useHistory } from 'react-router-dom';
const Header = ({ onNote, toggle, onProfile, onActivity, onNotification }) => {
  const history = useHistory();
  var path = window.location.pathname.split('/');
  var name = path[path.length - 1].split('-');
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  var finalName = filterName.includes('app')
    ? filterName.filter(f => f !== 'app')
    : filterName.includes('ui')
    ? filterName.filter(f => f !== 'ui')
    : filterName.includes('uc')
    ? filterName.filter(f => f !== 'uc')
    : filterName.includes('basic')
    ? filterName.filter(f => f !== 'basic')
    : filterName.includes('form')
    ? filterName.filter(f => f !== 'form')
    : filterName.includes('table')
    ? filterName.filter(f => f !== 'table')
    : filterName.includes('page')
    ? filterName.filter(f => f !== 'page')
    : filterName.includes('email')
    ? filterName.filter(f => f !== 'email')
    : filterName.includes('ecom')
    ? filterName.filter(f => f !== 'ecom')
    : filterName.includes('chart')
    ? filterName.filter(f => f !== 'chart')
    : filterName.includes('editor')
    ? filterName.filter(f => f !== 'editor')
    : filterName;

  var page_name =
    finalName.join(' ') === '' ? 'Kullanıcılar' : finalName.join(' ');

  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div
                className="dashboard_bar"
                style={{ textTransform: 'capitalize' }}>
                {page_name}
              </div>
            </div>

            <ul className="navbar-nav header-right">
              <li
                className={`nav-item dropdown header-profile ${
                  toggle === 'profile' ? 'show' : ''
                }`}
                onClick={() => onProfile()}>
                <div
                  to={'/'}
                  className="nav-link"
                  role="button"
                  data-toggle="dropdown">
                  <img src={profile} width="20" alt="" />
                </div>
                <div
                  className={`dropdown-menu dropdown-menu-right ${
                    toggle === 'profile' ? 'show' : ''
                  }`}>
                  <Link
                    to="/page-login"
                    className="dropdown-item ai-icon"
                    onClick={() => {
                      localStorage.removeItem('auth-token');
                      history.push('/page-login');
                      history.go();
                    }}>
                    <svg
                      id="icon-logout"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-danger"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span className="ml-2">Logout </span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
