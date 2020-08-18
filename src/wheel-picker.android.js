import React from 'react';
import { requireNativeComponent, PixelRatio } from 'react-native';

const WheelPickerView = requireNativeComponent( "WheelPicker", WheelPicker );

export default class WheelPicker extends React.Component{
    state = {
        selectedItemPosition: this.props.selectedItemPosition || 0,
        data: this.props.PersianNumber ?
            this.props.data.map((value) => value.toPersianDigits()) :
            this.props.data
    }

    static defaultProps = {
        style: {
            width: 200,
            height: 150
        }
    }

    onItemSelected = ( event ) => {
        if ( this.props.onItemSelected ) {
            this.props.onItemSelected( event.nativeEvent )
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.selectedItemPosition !== this.props.selectedItemPosition){
            this.setState( { selectedItemPosition: nextProps.selectedItemPosition } )
        }
    }

    getItemTextSize = ()=>{
        let {allowFontScaling,itemTextSize} = this.props
        if(itemTextSize && allowFontScaling ){
            itemTextSize =  PixelRatio.getFontScale() * PixelRatio.get() * itemTextSize
        }
        return itemTextSize
    }

    render() {
        const properties = {
            ...this.props,
            itemTextSize: this.getItemTextSize()
        }
        return (
            <WheelPickerView
                { ...properties }
                data = {this.state.data}
                onChange={ this.onItemSelected }
                selectedItemPosition={ this.state.selectedItemPosition }
            />
        )
    }
}
