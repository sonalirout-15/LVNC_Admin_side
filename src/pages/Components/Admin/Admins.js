import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Footer, Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { loadAdminStart, deleteAdminStart } from "../../../Redux/Actions/AdminActions";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar } = Search;

const Admins = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAdminStart())
  }, [])
  const tableData = useSelector((state) => state?.admin?.admin?.rows)
  const [data, setData] = useState(tableData);

  useEffect(() => {
    setData(tableData)
  }, [tableData])

  const columns = [
    {
      text: 'No', formatter: (cell, row, rowIndex, formateExtraData) => {
        return rowIndex + 1;
      }, sort: true
    },
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'email', text: 'Email', sort: true },
    { dataField: 'mobile', text: 'Mobile', sort: true },
    { dataField: 'gender', text: 'Gender', sort: true },
    { dataField: 'address', text: 'Address', sort: true },
    {
      dataField: 'image', text: 'Image', formatter: (cell, row) => {
        return (
          <img src={row.image} style={{ height: "50px" }} />
        )
      }
    },
    { dataField: 'status', text: 'Status', sort: true },
    {
      text: 'Action', formatter: (cell, row) => {
        return (
          <>
            <Link style={{ color: 'blue' }} className="fas fa-edit" to={`/editAdmin/${row.id}`} />{" "}
            <Link style={{ color: 'red' }} className='fas fa-trash' onClick={() => handleDelete(row.id)} />{" "}
            <Link style={{ color: 'green' }} className="fas fa-eye" to={`/viewAdmin/${row.id}`} />
          </>
        )
      }
    },
  ]


  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that admin?")) {
      dispatch(deleteAdminStart(id))
    }
  }


  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 4,
    lastPageText: '>>',
    firstPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage)

    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage)
    }
  })

  return (
    <>
      <Header />
      <SideBar />
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Admins</h1>
          </div>
          <div className="row">
            <div className="col-lg-10 col-md-12 col-12 col-sm-14">
              <div className="card">
                <div className="card-header">
                  <h4>Admin Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addAdmin'} className="btn btn-primary"> + New </Link>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <ToolkitProvider
                      keyField="id"
                      columns={columns}
                      data={data}
                      search
                    >
                      {
                        props => (
                          <>
                            <h3 style={{ marginLeft: '10px' }}>Input something at below input field:</h3>
                            <SearchBar {...props.searchProps} style={{ marginLeft: '10px' }} />
                            <BootstrapTable
                              {...props.baseProps}
                              pagination={pagination}
                            />
                          </>
                        )
                      }
                    </ToolkitProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}


export default Admins;