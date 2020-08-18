import React from "react";

export interface WheelPickerProps {
    onItemSelected: Function,
    data: Array<any>,
    isCurved?: boolean,
    isCyclic?: boolean,
    isAtmospheric?: boolean,
    selectedItemTextColor?: string,
    itemSpace?: number,
    visibleItemCount?: number,
    renderIndicator?: boolean,
    indicatorColor?: string,
    indicatorSize?: number,
    isCurtain?: boolean,
    curtainColor?: string,
    itemTextColor?: string,
    itemTextSize?: number,
    itemTextFontFamily?: string,
    itemTextAlign?: 'left' | 'center' | 'right',
    selectedItemPosition?: number,
    backgroundColor?: string,
    allowFontScaling?: boolean,
    PersianNumber?: boolean
}

export class WheelPicker extends React.Component<WheelPickerProps> {}

export interface DatePickerProps{
    mode: 'date' | 'time' | 'datetime',
    date: Date,
    // TODO: initialDate
    onDateChange: Function,
    minimumDate?: Date,
    maximumDate?: Date,
    minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30,
    styles?: object,
    locale?: string,
    todayTitle?: string
}

export class DatePicker extends React.Component<WheelPickerProps> {}