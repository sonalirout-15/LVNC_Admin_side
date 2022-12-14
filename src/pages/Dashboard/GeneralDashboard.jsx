import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Header } from "../../components/admin";
import SideBar from "../../components/admin/sidebar";
import { loadAdminStart } from "../../Redux/Actions/AdminActions";
import { loadCampaningStart } from "../../Redux/Actions/CampaningActions";
import { loadCategoryStart } from "../../Redux/Actions/CategoryAction";
import { loadMettersStart } from "../../Redux/Actions/MettersActions";
import { loadPostStart } from "../../Redux/Actions/PostActions";
import { loadSubcategoryStart } from "../../Redux/Actions/SubcategoryActions";

const GeneralDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdminStart());
  }, []);

  useEffect(() => {
    dispatch(loadCategoryStart());
  }, []);

  useEffect(() => {
    dispatch(loadSubcategoryStart());
  }, []);

  useEffect(() => {
    dispatch(loadMettersStart());
  }, []);

  useEffect(() => {
    dispatch(loadPostStart());
  }, []);

  useEffect(() => {
    dispatch(loadCampaningStart());
  }, []);


  const AdminData = useSelector((state) => state?.admin?.admin?.count);
  const categoriesData = useSelector((state) => state?.categoryData?.categories?.categoryData?.count);
  const subcategoriesData = useSelector((state) => state?.subcategory?.subcategories?.categoryData?.count);
  const mettersData = useSelector((state) => state?.metters?.metters?.mettersData?.count);
  const postsData = useSelector((state) => state?.post?.post?.count);
  const campaningsData = useSelector((state) => state?.campaning?.campaning?.CampaningData?.count);
  const usersData = useSelector((state) => state?.admin?.admin?.count);
  const [data, setData] = useState(AdminData);
  const [categoryData, setCategoryData] = useState(categoriesData);
  const [subcategoryData, setSubcategoryData] = useState(subcategoriesData);
  const [metterData, setMetterData] = useState(mettersData);
  const [postData, setPostData] = useState(postsData);
  const [campaningData, setCampaningData] = useState(campaningsData);

  useEffect(() => {
    setData(AdminData);
  }, [AdminData]);

  useEffect(() => {
    setCategoryData(categoriesData);
  }, [categoriesData]);

  useEffect(() => {
    setSubcategoryData(subcategoriesData);
  }, [subcategoriesData]);

  useEffect(() => {
    setMetterData(mettersData);
  }, [mettersData]);

  useEffect(() => {
    setPostData(postsData);
  }, [postsData]);

  useEffect(() => {
    setCampaningData(campaningsData);
  }, [campaningsData]);

  return (
    <>
      <Header />
      <SideBar />
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Dashboard</h1>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-primary">
                  <i className="far fa-user"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Total Admin</h4>
                  </div>
                  <div className="card-body">{AdminData}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-danger">
                  <i className="fas fa-th-large"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Categories</h4>
                  </div>
                  <div className="card-body">{categoriesData}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-warning">
                  <i className="fa fa-list-alt"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Subcategories</h4>
                  </div>
                  <div className="card-body">{subcategoriesData}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-success">
                  <i className="fas fa-newspaper"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Metters</h4>
                  </div>
                  <div className="card-body">{mettersData}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-success">
                  <i className="fas fa-print"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Post</h4>
                  </div>
                  <div className="card-body">{postsData}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-success">
                  <i className="fas fa-poll"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Campaning</h4>
                  </div>
                  <div className="card-body">{campaningsData}</div>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-success">
                  <i className="fas fa-user"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Online Users</h4>
                  </div>
                  <div className="card-body">47</div>
                </div>
              </div>
            </div> */}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default GeneralDashboard;
