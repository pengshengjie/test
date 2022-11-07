import React, {Component} from 'react';
import {connect} from "react-redux";
import AutoComplete from "antd/es/auto-complete";
import Input from "antd/es/input";
import {jsforceResponse} from "@/config/httpService";
import {CaretDownOutlined} from "@ant-design/icons";
import styled from "styled-components";

export const LookupWrapper = styled.div`
  .ant-input-affix-wrapper{
    border-radius: 1.5rem;
    border: 1.9px solid #1890ff !important;
    overflow: hidden;
  }

`

class Lookup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            record: null,
            value: null
        }
    }

    handleFocus = async (e) => {
        let options = [];
        const result = await this.props.LookupupRequest('');
        const res = jsforceResponse(result, '', false, true)
        options = res;
        this.setState({
            options
        })
    }

    handleSearch = async (e) => {
        let options = [];
        const result = await this.props.LookupupRequest(e);
        const res = jsforceResponse(result, '', false, true)
        options = res;
        this.setState({
            options
        })
    }

    handleSelect = (e, record) => {
        this.props.SelectedLookupRequest(record)
    }

    render() {
        console.log('lookup', this.props.options)
        return (
            <LookupWrapper>
                <AutoComplete
                    style={{width: '100%'}}
                    options={this.props.options}
                    onFocus={this.handleFocus}
                    onSelect={this.handleSelect}
                    onSearch={this.handleSearch}
                    value={this.props.value}
                    dropdownMatchSelectWidth={false}
                >
                    <Input size="medium" autoSize={true} style={{textAlign: 'center'}}
                           prefix={<div style={{color: 'orange'}}><i className="fas fa-star"></i></div>}
                           suffix={<CaretDownOutlined/>}/>
                </AutoComplete>
            </LookupWrapper>
        );
    }

}

const mapStateToProps = state => {
    return {}
};
const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lookup);
