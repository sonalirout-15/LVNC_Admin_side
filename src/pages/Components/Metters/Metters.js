import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Footer, Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { deleteMettersStart, loadMettersStart } from "../../../Redux/Actions/MettersActions";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

const Metters = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMettersStart())
  }, [])
  const mettersData = useSelector((state) => state?.metters?.metters?.mettersData?.rows)
  const [data, setData] = useState(mettersData)

  useEffect(() => {
    setData(mettersData)
  }, [mettersData])

  const columns = [
    {
      text: 'No', formatter: (cell, row, rowIndex, formateExtraData) => {
        return rowIndex + 1;
      },
      sort: true
    },
    { dataField: 'title', text: 'Title', sort: true },
    { dataField: 'description', text: 'Description', sort: true },
    {
      dataField: 'image', text: 'Image', formatter: (cell, row) => {
        return (
          <img src={row.image} style={{ height: "50px" }} />
        )
      }
    },
    {
      dataField: 'audio', text: 'Audio', formatter: (cell, row) => {
        return (
          <audio controls style={{ height: '40px', width: '120px' }}><source src={row.audio} type='audio/mp3' /></audio>
        )
      }
    },
    {
      dataField: 'audio', text: 'Audio', formatter: (cell, row) => {
        return (
          <video controls style={{ height: '70px' }}><source src={row.video} type="video/mp4" /></video>
        )
      }
    },
    { dataField: 'status', text: 'Status', sort: true },
    {
      text: 'Action', formatter: (cell, row) => {
        return (
          <>
            <Link style={{ color: 'blue' }} className="fas fa-edit" to={`/editMetters/${row.id}`} />{" "}
            <Link style={{ color: 'red' }} className='fas fa-trash' onClick={() => handleDelete(row.id)} />{" "}
            <Link style={{ color: 'green' }} className="fas fa-eye" to={`/viewMetters/${row.id}`} />
          </>
        )
      }
    },
  ]

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that metters?")) {
      dispatch(deleteMettersStart(id))
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
      console.log()
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage)
    }
  });

  return (
    <>
      <Header />
      <SideBar />
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Metters</h1>
          </div>
          <div className="row">
            <div className="col-lg-10 col-md-12 col-12 col-sm-14">
              <div className="card">
                <div className="card-header">
                  <h4>Metters Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addMetters'} className="btn btn-primary">+ New</Link>
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

export default Metters;