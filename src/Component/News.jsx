import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import pureRender from 'pure-render-decorator';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { Tool } from '../Config/Tool';
import { Header, List, template,Footer } from './common/mixin';
import { Carousel } from 'antd';

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
        };
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //取到fetch获取到本页的数据,分为菜单数据和主体数据
        let { data } = nextProps.state;
        if (data) {
            this.state.menuData = data.data.menuData || [];
            this.state.contentData = data.data.contentData || [];
        }
    }

    previous() {
        this.carousel.slick.innerSlider.slickPrev();
    }

    next() {
        this.carousel.slick.innerSlider.slickNext()
    }

    render() {
        return (
            <div ref='Container' className="component_container News_module">
                <Header />
                <h1>
                    新闻活动
                    <p>News Events</p>
                </h1>
                {
                    this.state.menuData.length > 0 ? <List list={this.state.menuData} /> : null
                }
                <div className="content_title">社团服务</div>

                <div className="contentWrap" id="contentWrap">
                    <Carousel autoplay ref={c => this.carousel = c }>
                        <div><div className="Carousel focus focus1"><h3>优享家居，乐享端午</h3></div></div>
                        <div><div className="Carousel focus focus2"><h3>图片2</h3></div></div>
                        <div><div className="Carousel focus focus3"><h3>图片3</h3></div></div>
                        <div><div className="Carousel focus focus4"><h3>图片4</h3></div></div>
                    </Carousel>
                    <span className="prev" onClick={this.previous}>＜</span>
                    <span className="next" onClick={this.next}>＞</span>
                </div>

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
    id: 'News',  //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/getNewsData',
    data: {}
});
