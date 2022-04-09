import React, { useState, useRef, useEffect } from 'react';
import {
  Table,
  Pagination,
  InputGroup,
  FormControl,
  Button,
  Modal,
} from 'react-bootstrap';
import axios from 'axios';
import data from './tableData.js';
import { BASE_URL } from '../../../constants/config.jsx';
import { useHistory } from 'react-router-dom';
const ActionDrop = ({ user, setUsers, users, setFin }) => {
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const statusAction = ({ status }) => {
    setLoading(true);
    const body = {
      _id: user._id,
      status: status,
    };
    axios
      .post(`${BASE_URL}/api/v1/admin/userStatusAction`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      })
      .then(v => {
        setLoading(false);
        setFin();
      })
      .catch(e => {
        history.push('/page-login');
        history.go();
      });
  };
  return (
    <div>
      <Modal show={popup} onHide={() => setPopup(false)}>
        <Modal.Header>
          <Modal.Title>Status Change</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>The part where the user is accepted or rejected</p>
        </Modal.Body>

        <Modal.Footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Button
            onClick={() => setPopup(false)}
            variant="outline-secondary"
            size="sm">
            Close
          </Button>
          <div>
            <Button
              variant="danger"
              style={{
                marginRight: '1rem',
              }}
              disabled={loading}
              onClick={() => statusAction({ status: 'Reject' })}>
              {loading ? '...' : 'Reject'}
            </Button>
            <Button
              disabled={loading}
              variant="primary"
              onClick={() => statusAction({ status: 'Approve' })}>
              {loading ? '...' : 'Approve'}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Button onClick={() => setPopup(!popup)}>Status</Button>
    </div>
  );
};
const BasicDatatable = () => {
  const [users, setUsers] = useState([]);
  const [fin, setFin] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const sort = 5;
  let jobPaggination = Array(Math.ceil(users.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = useRef(
    users.slice(activePag.current * sort, (activePag.current + 1) * sort)
  );
  const [demo, setdemo] = useState();
  const onClick = i => {
    activePag.current = i;

    jobData.current = data.jobsTable.data.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
    setdemo(
      data.jobsTable.data.slice(
        activePag.current * sort,
        (activePag.current + 1) * sort
      )
    );
  };
  useEffect(() => {
    fetchUser();
  }, [fin]);
  const fetchUser = async q => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/api/v1/admin/getUsers?q=${q}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
          },
        }
      )
      .then(v => {
        setUsers(v.data.users);
        setLoading(false);
      })
      .catch(e => {
        console.log('error', e.response);
        history.push('/page-login');
        history.go();
      });
  };

  const getDate = date => {
    const newDate = new Date(date);
    return (
      newDate.getDate() +
      '/' +
      (newDate.getMonth() + 1) +
      '/' +
      newDate.getFullYear()
    );
  };
  const setFilter = value => {
    const miss = users.filter(u => {
      const m2 = (u.name + u.surname + u.phone + u.email).toLowerCase();
      if (m2.includes(value.toLowerCase())) return u;
    });
    if (value.length < 1) fetchUser();
    else setUsers(miss);
  };
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={e => setFilter(e.target.value)}
            />
          </InputGroup>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center ">
              Loading..
            </div>
          ) : (
            <Table responsive className="w-100">
              <div id="example_wrapper" className="dataTables_wrapper">
                <table id="example" className="display w-100 dataTable">
                  <thead>
                    <tr role="row">
                      {data.jobsTable.columns.map((d, i) => (
                        <th key={i}>{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((d, i) => (
                      <>
                        <tr
                          style={{ cursor: 'pointer' }}
                          key={i}
                          onClick={
                            () => {}
                            //   statusAction({ _id: d._id, status: 'Approve' })
                          }>
                          <td>{d.name}</td>
                          <td>{d.surname}</td>
                          <td>{d.email}</td>
                          <td>{d.phone}</td>
                          <td>{d.status}</td>
                          <td>{getDate(d.createdAt)}</td>
                          <td>
                            <ActionDrop
                              setFin={() => setFin(fin + 1)}
                              user={d}
                              setUsers={setUsers}
                              users={users}
                            />
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
                {/* <div className="d-flex justify-content-center align-items-center mt-3">
                <div className="dataTables_paginate paging_simple_numbers">
                  <Pagination
                    className="pagination-primary pagination-circle"
                    size="lg">
                    <li
                      className="page-item page-indicator "
                      onClick={() =>
                        activePag.current > 1 && onClick(activePag.current - 1)
                      }>
                      <div className="page-link" to="#">
                        <i className="la la-angle-left" />
                      </div>
                    </li>
                    {jobPaggination.map((number, i) => (
                      <Pagination.Item
                        className={activePag.current === i ? 'active' : ''}
                        onClick={() => onClick(i)}>
                        {number}
                      </Pagination.Item>
                    ))}
                    <li
                      className="page-item page-indicator"
                      onClick={() =>
                        activePag.current + 1 < jobPaggination.length &&
                        onClick(activePag.current + 1)
                      }>
                      <div className="page-link" to="#">
                        <i className="la la-angle-right" />
                      </div>
                    </li>
                  </Pagination>
                </div>
              </div> */}
              </div>
            </Table>
          )}

          {!users.length && !loading && (
            <div className="d-flex justify-content-center align-items-center ">
              Not found user
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicDatatable;
