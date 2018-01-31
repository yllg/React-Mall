import React, { Component, PropTypes } from "react";
import { Link, IndexLink } from "react-router";
import pureRender from "pure-render-decorator";
import { is, fromJS } from "immutable";
import { Tool } from "../../Config/Tool";
import template from "./template";

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  DatePicker
} from "antd";

export { template };

/**
 * 公共头部
 *
 * @export
 * @class Header
 * @extends {Component}
 */

//导出头部菜单栏 组件
export class Header extends Component {
  constructor(props, context) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }

  render() {
    return (
      <header className="head-nav">
        <ul className="head_list  head_list1">
          <li className="head_listli">
            <IndexLink to="/">
              <span>首页</span>
            </IndexLink>
          </li>
          <li className="head_listli">
            <Link to="/About">
              <span>关于当代</span>
            </Link>
          </li>
          <li className="head_listli">
            <Link to="/News">
              <span>新闻活动</span>
            </Link>
          </li>
        </ul>
        <ul className="head_list head_list2">
          <li className="head_listli">
            <span>商城导航</span>
          </li>
          <li className="head_listli">
            <span>尊贵会员</span>
          </li>
          <li className="head_listli">
            <Link to="/Service">
              <span>服务导航</span>
            </Link>
          </li>
        </ul>
        <div className="head_logo">
          <div className="head_logoBg" />
          <div className="head_lang">
            <span>中文</span>
            <span>英文</span>
          </div>
        </div>
      </header>
    );
  }
}

//导出左侧菜单栏组件 接收传入的数据，再传给下面的listitem组件
export class List extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }
  render() {
    return (
      <div className="left_menu_wrap">
        <ul className="left_menu_list">
          {this.props.list.map((item, index) => {
            return <ListItem key={index} {...item} index={index} />;
          })}
        </ul>
        <div className="online-serve" />
        <div className="blog" />
        <p>官方微博</p>
        <p>@北京当代商城</p>
        <div className="wx" />
        <p>官方微信</p>
      </div>
    );
  }
}
class ListItem extends Component {
  static contextTypes = {};
  constructor(props, context) {
    super(props, context);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }
  render() {
    let { menu } = this.props;
    return (
      <li className="order_li">
        {menu.map((item, index) => {
          return (
            <span key={index}>
              {item.menu_router.length > 0 ? (
                <Link to={item.menu_router} key={index}>
                  <span key={index}>{item.menu_name}</span>
                </Link>
              ) : (
                <span key={index}>{item.menu_name}</span>
              )}
            </span>
          );
        })}
      </li>
    );
  }
}

//导出底部footer
export class Footer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }

  render() {
    return (
      <footer className="footer-nav">
        <ul className="footer_list ">
          <li className="footer_listli">
            <span>联系我们</span>
          </li>
          <li className="footer_listli">
            <span>商城位置</span>
          </li>
          <li className="footer_listli">
            <span>人才招聘</span>
          </li>
          <li className="footer_listli">
            <span>网站地图</span>
          </li>
          <li className="footer_listli">
            <span>友情链接</span>
          </li>
          <li className="footer_listli">
            <span>供应商服务</span>
          </li>
        </ul>
        <div className="footer_content">
          @2009-2016 modern-plaza.com.cn All rights reserved 京ICP备：052311
          京公网安备11010230150112号
        </div>
      </footer>
    );
  }
}

//申请表单
const FormItem = Form.Item;
//电话号码前缀选择
const Option = Select.Option;
//网址自动补后缀
const AutoCompleteOption = AutoComplete.Option;
//现居地
const residences = [
  {
    value: "北京",
    label: "北京",
    children: [
      {
        value: "五道口",
        label: "五道口"
      }
    ]
  },
  {
    value: "广东",
    label: "广东",
    children: [
      {
        value: "深圳",
        label: "深圳",
        children: [
          {
            value: "南山区",
            label: "南山区"
          }
        ]
      }
    ]
  },
  {
    value: "其他",
    label: "其他",
    children: [
      {
        value: "地市",
        label: "地市",
        children: [
          {
            value: "json数据",
            label: "json数据"
          }
        ]
      }
    ]
  }
];
//动态表单列的索引
let uuid = 0;

class RegistrationForm extends React.Component {
  state = {
    //记录自从上次保存之后是否修改过
    confirmDirty: false,
    //自动补全提示的提示数组
    autoCompleteResult: []
  };

  //表单提交事件
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("form表单接收到的值为: ", values);
      }
    });
  };
  //输入网站的change事件，实时提示补全
  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  //增加表单项
  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };
  //删除动态表单项
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { autoCompleteResult } = this.state;
    //响应式的24栅格布局
    const formItemLayout = {
      labelCol: {
        sm: { span: 8 }
      },
      wrapperCol: {
        sm: { span: 16 }
      }
    };
    const formItemLayout2 = {
      labelCol: {
        sm: { span: 10 }
      },
      wrapperCol: {
        sm: { span: 14 }
      }
    };
    const formItemLayout3 = {
      labelCol: {
        sm: { span: 12 }
      },
      wrapperCol: {
        sm: { span: 12 }
      }
    };
    const formItemLayout4 = {
      labelCol: {
        sm: { span: 9 }
      },
      wrapperCol: {
        sm: { span: 15 }
      }
    };
    const formItemLayout5 = {
      labelCol: {
        sm: { span: 6 }
      },
      wrapperCol: {
        sm: { span: 18 }
      }
    };
    const formItemLayout6 = {
      labelCol: {
        sm: { span: 7 }
      },
      wrapperCol: {
        sm: { span: 17 }
      }
    };
    const formItemLayout7 = {
      labelCol: {
        sm: { span: 1 }
      },
      wrapperCol: {
        sm: { span: 23 }
      }
    };
    const formItemLayout8 = {
      labelCol: {
        sm: { span: 3 }
      },
      wrapperCol: {
        sm: { span: 20 }
      }
    };
    const specialtyItemLayout = {
      wrapperCol: {
        sm: {
          span: 23,
          offset: 1
        }
      }
    };
    const specialtyItemLayout1 = {
      wrapperCol: {
        sm: {
          span: 24,
          offset: 1
        }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    //电话号码
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    //网站自动加后缀
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    //动态增减表单项
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout7 : specialtyItemLayout)}
          label={index === 0 ? "特长" : ""}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ["onChange", "onBlur"]
          })(
            <Input
              placeholder="您的特长秀出来~"
              style={{ width: "60%", marginRight: 8 }}
            />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });

    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Row>
          <Col span={13}>
            <FormItem {...formItemLayout} label="拟应聘职位">
              {getFieldDecorator("拟应聘职位", {
                rules: [{ required: true, message: "请输入要应聘的职位!" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="应聘的职位"
                />
              )}
            </FormItem>
          </Col>
          <Col span={11}>
            <FormItem {...formItemLayout} label="期望月薪">
              {getFieldDecorator("salary", {
                rules: [
                  {
                    required: true,
                    message: "请输入您期望的月薪 K/月!",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>个人信息</Col>
        </Row>

        <Row>
          <Col span={6}>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "请输入姓名!"
                  }
                ]
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="性别">
              <Select defaultValue="man" style={{ width: 70 }}>
                <Option value="man">男</Option>
                <Option value="woman">女</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="年龄">
              {getFieldDecorator("age", {
                rules: [
                  {
                    required: true,
                    message: "请输入年龄!"
                  }
                ]
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="身高">
              {getFieldDecorator("height", {
                rules: [
                  {
                    required: true,
                    message: "请输入身高!"
                  }
                ]
              })(<Input placeholder="净身高" />)}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <FormItem {...formItemLayout} label="体重">
              <Input />
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem {...formItemLayout} label="户籍">
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout2} label="政治面貌">
              <Input />
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem {...formItemLayout4} label="出生年月">
              {getFieldDecorator("date-picker", {
                rules: [{ type: "object" }]
              })(<DatePicker />)}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <FormItem {...formItemLayout3} label="婚姻状况">
              <Input />
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem {...formItemLayout3} label="子女状况">
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout2} label="文化程度">
              <Input placeholder="已取得学历" />
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem {...formItemLayout4} label="毕业时间">
              {getFieldDecorator("date-picker", {
                rules: [{ type: "object" }]
              })(<DatePicker />)}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout5} label="专业">
              {getFieldDecorator("major", {
                rules: [
                  {
                    required: true,
                    message: "请输入专业!"
                  }
                ]
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout6} label="毕业院校">
              <Input />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            {formItems}
            <FormItem {...specialtyItemLayout}>
              <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
                <Icon type="plus" /> 其他特长
              </Button>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout8} label="现居住地">
              {getFieldDecorator("residence", {
                initialValue: ["广东", "深圳", "南山区"],
                rules: [
                  {
                    type: "array",
                    required: true,
                    message: "请输入您的常住地址🏡"
                  }
                ]
              })(<Cascader options={residences} />)}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={2}>联系方式</Col>
          <Col span={11}>
            <FormItem {...formItemLayout} label="邮箱">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "不是正确的邮箱格式!"
                  },
                  {
                    required: true,
                    message: "请输入您的邮箱地址📮"
                  }
                ]
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={11}>
            <FormItem {...formItemLayout} label="移动电话">
              {getFieldDecorator("phone", {
                rules: [{ required: true, message: "请输入您的电话号码📱" }]
              })(
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={2}>间接联系人</Col>
          <Col span={11}>
            <FormItem {...formItemLayout} label="姓名">
              <Input />
            </FormItem>
          </Col>
          <Col span={11}>
            <FormItem {...formItemLayout} label="联系电话">
              {getFieldDecorator("midPhone", {
                rules: [{ required: true, message: "请输入间接联系人电话📱" }]
              })(
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row className="textarea">
          <Col span={2}>工作经验</Col>
          <Col span={22}>
            <textarea rows="8" cols="80" />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout8} label="个人网站">
              {getFieldDecorator("website", {
                rules: []
              })(
                <AutoComplete
                  dataSource={websiteOptions}
                  onChange={this.handleWebsiteChange}
                  placeholder="请输入您的个人网站~"
                >
                  <Input />
                </AutoComplete>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
            <FormItem {...specialtyItemLayout1}>
              {getFieldDecorator("agreement", {
                valuePropName: "checked"
              })(<Checkbox>我对以上资料的真实性负责</Checkbox>)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                提交申请
              </Button>
            </FormItem>
        </Row>
      </Form>
    );
  }
}

//const变量导出
export const WrappedRegistrationForm = Form.create()(RegistrationForm);
