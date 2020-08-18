import React from 'react';
import { Picker, StyleSheet } from 'react-native';

export default class WheelPicker extends React.Component {
	state = {
		selectedItemPosition: this.props.selectedItemPosition || 0,
	}

	static defaultProps = {
		style: {
			width: 200,
			height: 150,
		},
	}

	onItemSelected = (value, index) => {
		if (this.props.onItemSelected) {
			this.props.onItemSelected({position: index)
		}
		this.setState({selectedItemPosition: index})
	}

	getItemTextSize = () => {
		let {allowFontScaling,itemTextSize} = this.props
		if(itemTextSize && allowFontScaling ){
			itemTextSize =  PixelRatio.getFontScale() * PixelRatio.get() * itemTextSize
		}
		return itemTextSize
	}

	ItemStyle = {
		height: '100%',
		width: '100%',
		fontSize: this.props.itemTextSize || 12,
		fontFamily: this.props.itemTextAlign || null,
		color: this.props.itemTextColor || 'black',
		textAlign: this.props.itemTextAlign || null,
	}

	render() {
		const data = this.props.data
		if (!data || !data.length < 0) return null
		return (
			<Picker
				selectedValue={data[this.state.selectedItemPosition]}
				onValueChange={this.onItemSelected}
				// itemStyle = {this.ItemStyle}
				itemStyle = {this.ItemStyle}
				{...this.props}>
					{
						this.props.PersianNumber ?
						this.props.data.map((i, index) => <Picker.Item key={index} label={i} value={i} />) :
						this.props.data.map((i, index) => <Picker.Item key={index} label={i} value={i} />)
					}
			</Picker>
		)
	}
} 
