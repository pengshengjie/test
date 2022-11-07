import React, {Component} from 'react';
import Select from "antd/es/select";


const NEW_ITEM = "NEW_ITEM";
const Option = Select.Option;

// sample
const listOptions = ["option-1", "option-2", "option-3"];

class SelectAddOption extends Component {

    state = {
        title: "",
        style: '',
        listValue: "",
        showList: false,
        listOptions: listOptions
    };

    onChangeList = (value) => {

        if (value !== NEW_ITEM) {
            this.setState({listValue: value});
        } else {
            this.setState({showList: true});
        }
    };

    render() {
        const {listValue, title} = this.state;
        const listSelectOptions = this.state.listOptions.map(o => (
            <Option key={o}>{o}</Option>
        ));
        return (
            <div>
                {title ? <h3>{title}</h3> : ''}
                <Select
                    value={listValue}
                    style={{width: 150}}
                    onChange={this.onChangeList}
                >
                    {listSelectOptions}
                    <Option value={NEW_ITEM}>+ New Item</Option>
                </Select>

                {this.state.showList ? this.props.children : ''}

            </div>


        );
    }
}

export default SelectAddOption;
