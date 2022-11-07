import React, { Component } from "react";
import LayoutContent from "@components/utility/layoutContent";
import actions from "@redux/EditableTable/actions";
import { connect } from "react-redux";

import _ from "lodash";
import {
    Button,
    ConfigProvider,
    DatePicker,
    Drawer,
    Modal,
    Select, Space,
} from "antd";
import ProTable from "@ant-design/pro-table";

import enUSIntl from "antd/lib/locale/en_US";
import moment from "moment";
import Detail from "@components/Table/Detail";
import {SearchOutlined} from "@ant-design/icons";
import Input from "antd/es/input";

class TableContent extends Component {
    actionRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            isNewModalOpen: false,
            selectedId: null,
            status_options: [
                { label: "Reviewing", value: "Reviewing" },
                { label: "Cancelled", value: "Cancelled" },
                { label: "Processing", value: "Processing" },
                { label: "Completed", value: "Completed" },
                { label: "Failed", value: "Failed" },
                { label: "All", value: "All" },
            ],
            status_value: "",
            date_options: [
                { label: "Today", value: "Today" },
                { label: "This Week", value: "This Week" },
                { label: "This Month", value: "This Month" },
                { label: "This Year", value: "This Year" },
                { label: "Custom", value: "Custom" },
            ],
            date_value_start: moment().startOf("year").format("yyyy-MM-DD"),
            date_value_end: moment().endOf("year").format("yyyy-MM-DD"),
            date_start: null,
            data_end: null,
            is_custom: false,
            smaSfid: "",
            is_download_done: false,
            drawerVisible: props.drawerVisible,
            permissions: props.permissions,
            type: props.type,
            needRequest: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.Auth !== nextProps.Auth) {
            this.setState(
                {
                    Auth: nextProps.Auth,
                },
                function () {
                    this.actionRef.current.reload();
                }
            );
        }


        if (this.props.userReload !== nextProps.userReload) {
            this.actionRef.current.reload();
        }
        if (this.props.drawerVisible !== nextProps.drawerVisible) {
            this.setState({
                drawerVisible: nextProps.drawerVisible,
            }, this.actionRef.current.reload);
        }
        // if (this.props.filterSource !== nextProps.filterSource) {
        //   this.actionRef.current.reload()
        // }
    }
    componentDidUpdate(prevProps, prevState) {}

    deleteRecord = async (e) => {
        let result = await this.props.deleteRecord(e);
        this.actionRef.current.reload();
    };

    handOnlineSave = async (key, row) => {
        // let result = await this.props.handOnlineSave(key, row);
        this.actionRef.current.reload();
        return this.props.handOnlineSave(key, row);
    };



    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState(
            {
                ["Search_" + dataIndex]: selectedKeys[0],
            },
            this.Query
        );
    };

    Query = () => {
        this.props.handleGlobalSearch("");
        let state = Object.keys(this.state).filter((e) => e.startsWith("Search"));
        let query = [];
        for (let i = 0; i < state.length; i++) {
            query += state[i].split("_")[1] + "=" + this.state[state[i]] + "&";
        }
        this.props.handleFilter(query);
        this.actionRef.current.reload();
    };

    handleReset = (clearFilters) => {
        clearFilters();
        let state = Object.keys(this.state).filter((e) => e.startsWith("Search"));
        for (let i = 0; i < state.length; i++) {
            this.setState({
                [state[i]]: "",
            });
        }
        this.Query();
    };

    handleFresh = (e) => {
        this.props.handleGlobalSearch("");
        this.setState({
            searchString: null,
        });
    };

    onClose = () => {
        this.props.onClose();
        this.actionRef.current.reload();
    };

    renderDrawer = (id) => {
        let children;
        if(this.props.children && !Array.isArray(this.props.children)) {
            children = this.props.children;
        }
        if(this.props.children && Array.isArray(this.props.children)) {
            this.props.children.map(item => {
                if(item.props.type === 'form') {
                    children = item;
                }
            })
        }
        return (
            <>
                <Drawer
                    className={"drawer-width"}
                    width="50%"
                    placement="right"
                    closable={false}
                    destroyOnClose={true}
                    onClose={() => this.onClose()}
                    onCancel={this.onCancel}
                    visible={this.props.drawerVisible}
                >
                    {children ? children : 
                    <Detail
                        formFields={this.props.formFields}
                        formRelated={this.props.formRelated}
                        formValues={this.props.formValues}
                        handOnlineSave={this.handOnlineSave}
                        handleDelete={this.deleteRecord}
                        parent_name={this.props.parent_name}
                        detailButtons={this.props.detailButtons}
                        handleRefresh={this.refresh}
                        changeType={this.props.changeType}
                        id={id}
                        permissions={this.props.permissions}
                        type={this.props.type}
                        handleFormValuesChange={this.props.handleFormValuesChange}
                    />
                    }
                </Drawer>
            </>
        );
    };

    // renderModal = () => {
    //   return (
    //     <>
    //       <Modal width={800} visible={true}>
    //         <StepDetail />
    //       </Modal>
    //     </>
    //   );
    // };

    refresh = (needRequest = true) => {
        this.setState({
            needRequest,
        }, this.actionRef.current.reload)
    };

    handleCreateNew = (e) => {
        this.props.OpenDrawer(true);
    };

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters
                         }) => (
            <div style={{padding: 8}}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0] ? selectedKeys[0] : this.state['Search_' + dataIndex]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{marginBottom: 8, display: "block"}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{color: filtered ? "#1890ff" : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible) => {
            // console.log('visible', visible)
        }
    });

    render() {
        let oldcolumns = this.props.columns;
        let columns = [];
        for (let i = 0; i < oldcolumns.length; i++) {
            if (!_.get(oldcolumns[i], "hide")) {
                if (this.props.relatedList) {
                    oldcolumns = oldcolumns.filter((e) => e.title !== "Operation");
                }
                let col = [];
                if (_.get(oldcolumns[i], "search")) {
                    col = {
                        ...oldcolumns[i],
                        ...this.getColumnSearchProps(oldcolumns[i].dataIndex),
                    };
                } else {
                    col = {
                        ...oldcolumns[i],
                    };
                }
                columns.push(col);
            }
        }

        let params = [this.state.searchString];
        return (
            <LayoutContent>
                <ConfigProvider locale={enUSIntl}>
                    <div className="px-4">
                        <ProTable
                            showSorterTooltip={false}
                            recordCreatorProps={false}
                            className={" table-auto common-table scroll-border"}
                            scroll={this.props.scroll}
                            rowClassName={(record) =>
                                this.props.selected_row === record.id ? "selected_row" : ""
                            }
                            columns={columns}
                            actionRef={this.actionRef}
                            // scroll={{ x: 1300 }}
                            params={params}
                            request={async (params = {}, sort, filter) => {
                                // if (!this.state.Auth) {
                                //     return null
                                // }
                                let query;
                                if (this.state.status_value) {
                                    query =
                                        "page=" +
                                        params.current +
                                        "&page_size=" +
                                        params.pageSize +
                                        "&startDate=" +
                                        this.state.date_value_start +
                                        "&endDate=" +
                                        this.state.date_value_end +
                                        "&smaSfid=" +
                                        this.state.smaSfid +
                                        "&status=" +
                                        this.state.status_value;
                                } else {
                                    query =
                                        "page=" +
                                        params.current +
                                        "&page_size=" +
                                        params.pageSize +
                                        "&startDate=" +
                                        this.state.date_value_start +
                                        "&endDate=" +
                                        this.state.date_value_end +
                                        "&smaSfid=" +
                                        this.state.smaSfid;
                                }
                                let result = await this.props.handleFilter(
                                    query,
                                    this.state.Auth,
                                    this.state.needRequest
                                );

                                let result_data = _.get(result, "data", []);
                                this.setState({
                                    data: result_data,
                                });
                                this.props.getRecord(result_data);

                                result.data = result_data;
                                return result;
                            }}
                            editable={{
                                type: "multiple",
                                onDelete: this.deleteRecord,
                                deletePopconfirmMessage: "delete this row",
                                onSave: (keys, row) => this.handOnlineSave(keys, row),
                                editableKeys: this.state.editableKeys,
                                onChange: (e) => this.setEditableRowKeys(e),
                                onlyAddOneLineAlertMessage: "only add one line",
                            }}
                            rowKey="Id"
                            search={false}
                            toolBarRender={false}
                            // pagination={{
                            //   pageSizeOptions: [10, 20, 50, 100, 1000],
                            //   showQuickJumper: true,
                            //   pageSize: 20,
                            //   showTotal: (total, range) => (
                            //     <div>{`Showing ${range[0]}-${range[1]} of ${total} total items`}</div>
                            //   ),
                            // }}
                            pagination={false}
                        />
                        { this.renderDrawer(this.props.formValues)
                            }
                        {/* {this.renderModal()} */}
                    </div>
                </ConfigProvider>
            </LayoutContent>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isNewModalClosed: state.EditableTable.isNewModalClosed,
        loading: state.EditableTable.load,
        id: state.EditableTable.id,
        Auth: _.get(state.Auth, "meta"),
        start_date: state.EditableTable.start_date,
        end_date: state.EditableTable.end_date,
        smaSfid: state.EditableTable.smaSfid,
        status: state.EditableTable.status,
        userReload: state.EditableTable.userReload,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
})(TableContent);
