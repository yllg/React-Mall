import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import pureRender from 'pure-render-decorator';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { Tool } from '../Config/Tool';
import { Header, List, template,Footer } from './common/mixin';

class Main extends Component {
    static propTypes = {
    }
    static childContextTypes = {
        getData: React.PropTypes.any,
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            menuData: [],  //本页的菜单数据
            contentData: [] //本页的主体内容数据
        }
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
        const contentHtml = this.state.contentData;
        return (
            <div ref='Container' className="component_container About_module">
                <Header />
                <h1>
                    当代商城
                    <p>About Modem-Plaza</p>
                </h1>
                {
                    this.state.menuData.length > 0 ? <List list={this.state.menuData} /> : null
                }
                <div className="content_title">文化理念</div>
                
                <div className="contentWrap" dangerouslySetInnerHTML={{__html: contentHtml}}></div>
         
                <div className="right_view">
                    <div className="right_view_img"></div>
                    <p>2018 第一期</p>
                    <p className="right_title">当代人 2018 第一期</p>
                    <p>查看往期</p>
                </div>
                <Footer />

            </div>
        );
    }
}

export default template({
    id: 'About',  //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/getAboutData',
    data: {}
});
