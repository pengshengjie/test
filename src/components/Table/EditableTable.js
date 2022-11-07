import React, { Component } from "react";
import TableContent from "@components/Table/TableContent";
import { connect } from "react-redux";

class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.tableRef = React.createRef();
        this.state = {
            searchString: null,
            permissions: props.permissions,
            type: props.type,
        };
    }

    handleFresh = (e) => {
        this.tableRef.current.handleFresh();
    };

    createRecords = (e) => {
        return this.props.createRecords(e);
    };

    deleteRecord = (body) => {
        return this.props.deleteRecord(body);
    };

    bulkInsert = (rows) => {
        return this.props.bulkInsert(rows);
    };

    bulkDelete = (body) => {
        return this.props.bulkDelete(body);
    };

    editRecords = (key, row) => {
        this.props.editRecords(key, row);
    };

    handOnlineSave = async (key, row) => {
        return this.props.handOnlineSave(key, row);
    };

    handleFilter = (query, auth, needRequest = true) => {
        return this.props.handleFilter(query, auth, needRequest);
    };

    handleSelect = (e) => {
        this.setState({
            searchString: e,
        });
    };

    getRecord = (data) => {
        this.props.getRecord(data);
    };

    handleFormValuesChange = (changedValues, allValue, form) => {
        return this.props.handleFormValuesChange(changedValues, allValue, form);
    };
    refresh = (needRequest = true) => {
        this.tableRef.current.refresh(needRequest);
    };
    render() {
        return (
            <TableContent
                ref={this.tableRef}
                scroll={this.props.scroll}
                data={this.props.data}
                columns={this.props.columns}
                formFields={this.props.formFields}
                filterSource={this.props.filterSource}
                getRecord={this.getRecord}
                createRecords={this.createRecords}
                deleteRecord={this.deleteRecord}
                bulkInsert={this.bulkInsert}
                bulkDelete={this.bulkDelete}
                handOnlineSave={this.handOnlineSave}
                onClose={this.props.onClose}
                handleFresh={this.handleFresh}
                handleFilter={this.handleFilter}
                searchString={this.state.searchString}
                handleGlobalSearch={this.handleSelect}
                isRelated={this.props.isRelated}
                formRelated={this.props.formRelated}
                selectedId={this.props.selectedId}
                formValues={this.props.formValues}
                drawerVisible={this.props.drawerVisible}
                parent_name={this.props.parent_name}
                detailButtons={this.props.detailButtons}
                permissions={this.props.permissions}
                changeType={this.props.changeType}
                type={this.props.type}
                handleFormValuesChange={this.handleFormValuesChange}

            >
                {this.props.children}
            </TableContent>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.EditableTable.load,
    };
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(EditableTable);
