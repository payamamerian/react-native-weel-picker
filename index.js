import WheelPicker from "./src/wheel-picker";
import DatePicker from "./src/date-picker/date-picker";

String.prototype.toPersianDigits = function() {
	var id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
	return this.replace(/[0-9]/g, function(w) {
		return id[+w];
	});
};

export { WheelPicker, DatePicker };
