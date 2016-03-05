import React from 'react';

export default class Input extends React.Component {

    constructor() {
        super();

        //bind instance methods to instance here
        this.state = this.initialState();
    }

    initialState(){
        return {

        };
    }

    //componentWillMount(){}

    //componentDidMount(){}

    //componentWillUnmount(){}

    //shouldComponentUpdate(nextProps, nextState){}
    
    //componentWillUpdate(nextProps, nextState){}

    //componentDidUpdate(prevProps, prevState){}

    //componentWillReceiveProps(nextProps){}

    render(){
        const {type, name, className, placeholder, value, required, disabled, onChange, onKeyUp, onBlur, checked, text, id, label} = this.props;
        let inputElement;

        switch(type){
            case "textarea":
                inputElement = (<textarea type={type} name={name} value={value} defaultValue={value} placeholder={placeholder} className={className} onChange={onChange} onKeyUp={onKeyUp} onBlur={onBlur} disabled={disabled} required={required}>{text}</textarea>);
                break;
            case "checkbox":
                inputElement = (<div><input type={type} value={value} name={name} defaultChecked={checked} />{text}</div>);
                break;
            case "radio":
                inputElement = (<div><input type={type} name={name} defaultValue={value} value={value} id={id} />
                                <label for={id}>{label}</label></div>);
                break;
            case "submit":
                inputElement = (<input type={type} value={value} disabled={disabled} required={required} className="btn btn-primary" />);
                break;
            default:
                inputElement = (<input type={type} name={name} value={value} defaultValue={value} placeholder={placeholder} className={className} onChange={onChange} onKeyUp={onKeyUp} onBlur={onBlur} disabled={disabled} required={required} />);
                break;
        }

        return (
            <div>
                {inputElement}
            </div>
        );
    }

}

Input.propTypes = {
    type: React.PropTypes.string,
    name: React.PropTypes.string,
    className: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    required: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    text: React.PropTypes.string,
    id: React.PropTypes.string,
    label: React.PropTypes.string
};

Input.defaultProps = {
    type: "text",
    className: "form-control" //Implement defaultClassName for type function
};
