import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

import index from '../Component/index'; //首页

//根据当前环境选择不同的 历史url记录
const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

//根路由
class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
} 

//关于当代>文化理念页
const About = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/About').default)
    },'About')
}

//招聘首页
const Employment = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/Employment').default)
    },'Employment')
}

//按需加载,招聘详情页
const EmploymentDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/EmploymentDetail').default)
    },'EmploymentDetail')
}

//招聘申请 组件
const application = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/application').default)
    },'application')
}

//新闻活动页
const News = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/News').default)
    },'News')
}

//服务导航页
const Service = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/Service').default)
    },'Service')
}

//社团服务页
const Corporation = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/Corporation').default)
    },'Corporation')
}


const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={index} />//首页
            <Route path="index" component={index} />
            <Route path="About" getComponent={About} />//关于当代>文化理念页
            <Route path="Employment" getComponent={Employment} />//人才招聘首页
            <Route path="EmploymentDetail" getComponent={EmploymentDetail} />//人才招聘详情页
            <Route path="application" getComponent={application} />//招聘申请
            <Route path="News" getComponent={News} />//新闻活动页
            <Route path="Service" getComponent={Service} />//服务导航页
            <Route path="Corporation" getComponent={Corporation} /> //社团服务页
            <Redirect from='*' to='/'  />
        </Route>
    </Router>
);

export default RouteConfig;