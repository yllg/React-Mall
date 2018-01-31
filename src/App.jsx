import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import route from './Router/Route'; //路由配置
import store from './Redux/Store/Store';
import './Config/Config.js';//引入默认配置

import './Style/common.less';
import './Style/index.less';
import './Style/About.less';
import './Style/Employment.less';
import './Style/EmploymentDetail.less';
import './Style/application.less';
import './Style/News.less';
import './Style/Service.less';
import './Style/Corporation.less';
import './Style/antd.css';


store.subscribe(() => { //监听state变化
    console.log("监听state的内容, 如下:", store.getState())
});

render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);

