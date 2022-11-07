import React, { Component } from "react";
import { Button, Form, Popconfirm, Tabs } from "antd";
import _ from "lodash";
import styled from "styled-components";
import moment from "moment";

const { TabPane } = Tabs;

export const DetailWrapper = styled.div`
  padding: 1rem;

  .ant-form-item {
    margin-bottom: 5px !important;
  }

  .ant-form-vertical .ant-form-item {
    flex-direction: row !important;
    align-items: center;
    //padding: 1rem 0;
    // border-bottom: 1px solid black;
  }

  form.ant-form.ant-form-vertical {
    column-gap: 32px;
    display: flex;
    flex-wrap: wrap;
  }

  .ant-btn-primary {
    border-radius: 0.2rem !important;
  }

  .slds-text-body--small {
    font-size: 12px;
  }

  .slds-text-title--caps,
  .slds-text-body--small,
  .slds-align-middle {
    display: grid;
    justify-content: center;
  }

  .disabled-input {
    color: black !important;
  }

  .slds-input {
    border: 1px solid #dddbda !important;
  }

  .ant-input[disabled] {
    color: black !important;
    background-color: rgb(247 247 247 / 55%);
  }

  .ant-form-item-control-input-content {
    text-align: right !important;
  }

  .ant-form-item-control-input {
    background-color: transparent !important;
    border-radius: 2pt;
    min-height: 28px !important;
  }

  .ant-form-item-label {
    // text-transform: uppercase;
    padding: 0.5rem !important;
    padding-left: 0.4rem;
    //color: black;
    font-size: 12px;
    //font-weight: 700;
    line-height: 1.14286em;
    color: #333;
    clear: left;
    position: relative;
  }

  .AddAndDelete {
    .main {
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      padding: 5px;
      width: 100%;
    }

    .tag {
      position: relative;
      margin: 3px;
      font-size: 12px;
      border: 1px dashed #3b9de9;
      border-radius: 4px;
      padding: 0 8px;
      line-height: 30px;
      color: #666666;
      background: rgba(255, 255, 255, 0.7);
    }

    .delete {
      position: absolute;
      top: -1px;
      right: -1px;
      width: 16px;
      height: 16px;
      cursor: pointer;
      user-drag: none;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-drag: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }

    .inputs {
      margin-top: 10px;
    }

    input {
      position: relative;
      top: -1px;
      width: 10rem !important;
      box-sizing: border-box;
      margin: 0;
      padding: 5px !important;
      font-variant: tabular-nums;
      list-style: none;
      font-feature-settings: "tnum", "tnum";
      position: relative;
      display: inline-block;
      min-width: 0;
      color: rgba(0, 0, 0, 0.85);
      font-size: 12px;
      line-height: 1.5715;
      background-color: #fff;
      background-image: none;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      transition: all 0.3s;
    }

    button {
      margin-left: 10px;
      background-color: #3789c7;
      border: none;
      color: white;
      padding: 5px 15px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 2px;
    }
  }

  @media (min-width: 1024px) {
    .lg\\:w-1\\/3 {
      width: 30% !important;
    }

    .lg\\:w-1\\/4 {
      width: 22% !important;
    }
  }

  @media (min-width: 768px) {
    .md\\:w-1\\/2 {
      width: 45%;
    }

    .md\\:w-1\\/4 {
      width: 22%;
    }
  }

  @media (max-width: 568px) {
    .sm\\:w-full {
      width: 100%;
    }
  }
`;

class StepDetail extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            disabled: true,
            visible: false,
            permissions: props.permissions,
            type: props.type,
        };
    }
    componentDidMount() {}

    handleSave = () => {
        this.props.type === 'ADD' && this.props.changeType('EDIT')
        return this.formRef?.current?.submit();
    };

    handleEdit = (e) => {
        this.setState({
            disabled: false,
        });
    };

    handleClose = (e) => {
        this.setState({
            disabled: true,
        });
    };

    handleSubmit = (e) => {
        !e.id && (e.id = _.get(this.props.formValues, "id"))
        this.props.handOnlineSave(e.id, e);
        this.setState({
            disabled: true,
        });
    };

    handleDelete = (e) => {
        let id = _.get(this.props.formValues, "id");
        if (id) {
            this.props.handleDelete(id);
        }
    };

    onFormValuesChange = (changedValues, allValue) => {
        this.props.handleFormValuesChange(changedValues, allValue, this.formRef);
    };

    showPopconfirm = (e) => {
        this.setState({
            visible: true,
        });
    };
    handleConfirmCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    render() {
        let data = this.props.formValues;
        let fields = [];
        if (this.props.formFields) {
            if (data) {
                this.props.formFields.map((e) => {
                    let field = e;
                    if (e.type === "Date") {
                        field["value"] = moment(data[e.name]).format("YYYY-MM-DD");
                    } else if (e.type === "Object" && _.get(data, e.name)) {
                        field["value"] = data[e.name][_.get(e, "relation_field")];
                    } else {
                        field["value"] = data[e.name];
                    }

                    fields.push(field);
                    return fields;
                });
            } else {
                this.props.formFields.map((e) => {
                    let field = e;
                    field["value"] = null;
                    fields.push(field);
                    return fields;
                });
            }
        }

        return (
            <DetailWrapper>
                <Popconfirm
                    title="Do you want to delete this record"
                    visible={this.state.visible}
                    onConfirm={this.handleDelete}
                    onCancel={this.handleConfirmCancel}
                ></Popconfirm>
                {!this.props.parent_name ? (
                    <div className={"slds-m-around_x-small flex"}>
                        {[
                            this.props.type === "ADD" && (
                                <Button
                                    type="primary"
                                    className={"slds-button slds-m-right_x-small"}
                                    key="0"
                                    onClick={this.handleSave}
                                >
                                    Add
                                </Button>
                            ),
                             this.props.type === "EDIT" && (
                                <Button
                                    type="primary"
                                    className={"slds-button slds-m-right_x-small"}
                                    key="0"
                                    onClick={this.handleSave}
                                >
                                    Save
                                </Button>
                            ),

                             this.props.type === "EDIT" && (
                                <Button
                                    type="primary"
                                    className={"slds-button slds-m-right_x-small"}
                                    key="2"
                                    onClick={this.showPopconfirm}
                                >
                                    Delete
                                </Button>
                            ),
                        ]}
                    </div>
                ) : (
                    <div className={"flex"}>
                        { this.props.detailButtons(data, this.props) }
                    </div>
                )}

                <div className={"slds-m-around_x-small mt-4"}>
                    <Form
                        onFinish={this.handleSubmit}
                        layout="vertical"
                        fields={fields}
                        ref={this.formRef}
                        autocomplete="off"
                        id="permissionForm"
                        onValuesChange={this.onFormValuesChange}
                    >
                        {fields.map((e, index) => {
                            return e.title === "Separator" ? (
                                {
                                    /* <Divider /> */
                                }
                            ) : (
                                <Form.Item
                                    label={e.title}
                                    name={e.name}
                                    className={e.length}
                                    hidden={!e.visible}
                                    rules={e.rules}
                                    dependencies={e.dependencies}
                                >
                                    {e.type === "Lookup_text" || e.type === "Lookup"
                                        ? e.render(e.value, this.props.formValues)
                                        : e.dependent
                                            ? e.render(fields)
                                            : e.render}
                                </Form.Item>
                            );
                        })}
                    </Form>
                </div>
                <div className={"slds-m-around_x-small"}>
                    {this.props.formRelated ? this.props.formRelated(data) : ""}
                </div>
            </DetailWrapper>
        );
    }
}

export default StepDetail;
