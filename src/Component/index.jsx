import React, { Component, PropTypes } from "react";
import pureRender from "pure-render-decorator";
import { History, Link } from "react-router";
import { connect } from "react-redux";
import { is, fromJS } from "immutable";
import { Tool } from "../Config/Tool";
import { Header, List, template, Footer } from "./common/mixin";

class Main extends Component {
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

  //下一次传入的参数跟现在不同，或者下一个状态跟现在不同，就返回true，就需要更新哦。
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }

  render() {
    return (
      <div className="component_container index_module">
        <Header />
        <div className="index_left_menu">
          {this.state.menuData.length > 0 ? (
            <List list={this.state.menuData} />
          ) : null}
        </div>
        <br />
        <div className="index_logo1" />
        <div className="index_logo2" />
        <div className="index_logo3" />

        <div id="boxWrap">
          <div id="box">
            <div className="one" />
            <div className="two" />
            <div className="three" />
            <div className="four" />
            <div className="five" />
            <div className="six" />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default template({
  id: "index", //应用关联使用的redux
  component: Main, //接收数据的组件入口
  url: "/getIndexData",
  data: {}
});
