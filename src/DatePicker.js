/**
 * @prettier
 * @flow
 * */

import React from 'react'
import { View, StyleSheet } from 'react-native'
import WheelPicker from './wheel-picker'
import {
	hourTo24Format,
	hourTo12Format,
	pickerDateArray,
	getHoursArray,
	increaseDateByDays,
	getFiveMinutesArray,
	getAmArray,
} from './Utils'

const millisecondsPerDay = 1000 * 60 * 60 * 24
const HOUR = 60
const Jalali = [ 
	'فروردین', 'اردیبهشت', 'خرداد',
	'تیر', 'مرداد', 'شهریور',
	'مهر', 'آبان', 'آذر', 
	'دی', 'بهمن', 'اسفند'
];
const Gregorian = [ 
	'January', 'February', 'March',
	'April', 'May', 'June',
	'July', 'August', 'September', 
	'October', 'November', 'December'
];

type Props = {
	initDate: string,
	hours: Array<number>,
	minutes: Array<string>,
	onDateSelected: Date => void,
	startDate: string,
	daysCount: number,
	days: Array<number>,
	monthType: 'Number' | 'Jalali' | 'Gregorian',
	mode: 'Time' | 'DateTime' | 'Date'
}

type State = {
	selectedDate: Date,
	daysAfterSelectedDate: number,
	initDayIndex: number,
	initHourIndex: number,
	initMinuteIndex: number,
}

export default class DatePicker extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		const { startDate, minutes } = props
		const selectedDate = this.props.initDate
			? new Date(this.props.initDate)
			: new Date()
		const time24format = selectedDate.getHours()
		const millisBetween = selectedDate.getTime() - new Date().getTime()
		let millisBetweenStartDate
		let daysStartDate = 0
		if (startDate) {
			millisBetweenStartDate =
				new Date(startDate).getTime() - new Date().getTime()
			daysStartDate = millisBetweenStartDate / millisecondsPerDay
		}
		const days = millisBetween / millisecondsPerDay
		const daysAfterSelectedDate = Math.round(daysStartDate)
		const initDayIndex = startDate
			? Math.round(days) - Math.round(daysStartDate)
			: Math.round(days)
		const initHourIndex = time24format
		const minutesCount = minutes ? minutes.length : 12
		const initMinuteIndex = Math.round(
			selectedDate.getMinutes() / (HOUR / minutesCount)
		)

		// const initAmInex = time12format[1] === 'AM' ? 0 : 1

		this.state = {
			daysAfterSelectedDate,
			initDayIndex,
			selectedDate,
			initHourIndex,
			initMinuteIndex,
		}
	}

	render() {
		const {
			startDate,
			days,
			daysCount,
			hours,
			minutes,
			backgroundColor,
			mode,
		} = this.props;
		
		const { initHourIndex, initDayIndex, initMinuteIndex } = this.state
		return (
			<View style={[styles.container, { backgroundColor }]}>
				{
					(mode == "Date" || mode == "DateTime") &&
					<>
						<WheelPicker
							style={styles.dateWheelPicker}
							{...this.props}
							data={days || pickerDateArray(startDate, daysCount)}
							onItemSelected={this.onDaySelected}
							initPosition={initDayIndex}
						/>
					</>
				}
				{
					(mode == "Time" || mode === "DateTime") &&
					<>
						<WheelPicker
							style={styles.wheelPicker}
							{...this.props}
							isCyclic
							data={hours || getHoursArray()}
							onItemSelected={this.onHourSelected}
							initPosition={initHourIndex}
						/>
						<WheelPicker
							style={styles.wheelPicker}
							{...this.props}
							isCyclic
							data={minutes || getFiveMinutesArray()}
							onItemSelected={this.onMinuteSelected}
							initPosition={initMinuteIndex}
						/>
					</>
				}
			</View>
		)
	}

	onDaySelected = (position: number) => {
		let selectedDate = this.state.selectedDate
		const daysAfterSelectedDate = this.state.daysAfterSelectedDate
		const hours = selectedDate.getHours()
		const minutes = selectedDate.getMinutes()

		const {
			startDate,
			days,
			daysCount
		} = this.props
		const data = days || pickerDateArray(startDate, daysCount)
		if (data[position] === 'Today') {
			selectedDate = new Date()
		} else {
			selectedDate = increaseDateByDays(
				new Date(),
				this.props.startDate
					? daysAfterSelectedDate + position
					: position
			)
		}
		selectedDate.setHours(hours)
		selectedDate.setMinutes(minutes)
		this.onDateSelected(selectedDate)
	}

	onHourSelected = (position: number) => {
		const selectedDate = this.state.selectedDate
		const { hours } = this.props
		const data = hours || getHoursArray()
		selectedDate.setHours(Number(data[position]))
		this.onDateSelected(selectedDate)
	}

	onMinuteSelected = (position: number) => {
		const selectedDate = this.state.selectedDate
		const { minutes } = this.props
		const data = minutes || getFiveMinutesArray()
		selectedDate.setMinutes(Number(data[position]))
		this.onDateSelected(selectedDate)
	}

	onDateSelected(selectedDate: Date) {
		this.setState({ selectedDate })
		if (this.props.onDateSelected) {
			this.props.onDateSelected(selectedDate)
		}
	}
}

let styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	wheelPicker: {
		height: 150,
		width: null,
		flex: 1,
	},
	dateWheelPicker: {
		height: 150,
		width: null,
		flex: 3,
	},
})
