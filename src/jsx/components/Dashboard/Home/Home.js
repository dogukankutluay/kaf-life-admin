import React, { Fragment, useEffect } from 'react';
import BasicDatatable from '../../table/BasicDatatable';
import { checkLogin } from '../../../pages/helpers/login';
import { useHistory } from 'react-router-dom';
const Home = () => {
  const history = useHistory();

  useEffect(() => {
    if (!checkLogin()) {
      history.push('/page-login');
      history.go();
    }
    // checkLogin() ? setIsLogin(true) : setIsLogin(false);
  }, [history]);
  return (
    <Fragment>
      <BasicDatatable />
    </Fragment>
  );
};

export default Home;
