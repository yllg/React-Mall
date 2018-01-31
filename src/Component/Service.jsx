import React, { Component, PropTypes } from "react";
import { Link, IndexLink } from "react-router";
import pureRender from "pure-render-decorator";
import { connect } from "react-redux";
import { is, fromJS } from "immutable";
import { Tool } from "../Config/Tool";
import { Header, List, template, Footer } from "./common/mixin";
import { Row, Col } from "antd";

class Main extends Component {
  static propTypes = {};
  static childContextTypes = {
    getData: React.PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      menuData: [], //本页的菜单数据
      contentData: [] //本页的主体内容数据
    };
  }
  componentWillReceiveProps(nextProps) {
    //取到fetch获取到本页的数据,分为菜单数据和主体数据
    let { data } = nextProps.state;
    if (data) {
      this.state.menuData = data.data.menuData || [];
      this.state.contentData = data.data.contentData || [];
    }
  }
  render() {
    return (
      <div ref="Container" className="component_container Service_module">
        <Header />
        <h1>
          服务导航
          <p>Service Navigation</p>
        </h1>
        {this.state.menuData.length > 0 ? (
          <List list={this.state.menuData} />
        ) : null}
        <div className="contentWrap">
          <Row>
            <Col span={3} offset={12}>
              <span className="menu active" />
            </Col>
            <Col span={3}>
              <span className="menu">车场停车服务</span>
            </Col>
          </Row>

          <Row>
            <Col span={3}>
                <span className="menu"></span>
            </Col>
            <Col span={3}>
              <Link to="/Corporation">
                <span className="menu">社团服务</span>
              </Link>
            </Col>
            <Col span={3}>
              <span className="menu">一站式服务</span>
            </Col>
            <Col span={3}>
              <span className="menu active"></span>
            </Col>
            <Col span={3}>
              <span className="menu">24小时客服热线</span>
            </Col>
            <Col span={3}>
              <span className="menu">VIP会员俱乐部</span>
            </Col>
            <Col span={3}>
              <span className="menu active"></span>
            </Col>
            <Col span={3}>
              <span className="menu">会员中心</span>
            </Col>
          </Row>

          <Row>
            <Col span={3} offset={3}>
              <span className="menu active"></span>
            </Col>
            <Col span={3}>
              <span className="menu active"></span>
            </Col>
            <Col span={3}>
              <span className="menu">无障碍服务</span>
            </Col>
          </Row>

          <Row>
            <Col span={3} offset={3}>
              <span className="menu">顾客休息区</span>
            </Col>
            <Col span={3}>
              <span className="menu active"></span>
            </Col>
            <Col span={3}>
              <span className="menu">国际代购</span>
            </Col>
            <Col span={3}>
              <span className="menu">VIP服务</span>
            </Col>
            <Col span={3}>
              <span className="menu">双语接待</span>
            </Col>
          </Row>

          <Row>
            <Col span={3} offset={9}>
              <span className="menu">在线购物</span>
            </Col>
            <Col span={3}>
              <span className="menu">在线客服</span>
            </Col>
            <Col span={3}>
              <span className="menu active"></span>
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default template({
  id: "Service", //应用关联使用的redux
  component: Main, //接收数据的组件入口
  url: "/getServiceData",
  data: {}
});
