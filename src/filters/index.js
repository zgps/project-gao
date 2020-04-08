import Vue from 'vue';
import numeral from 'numeral';
import moment from 'moment';

// 数字格式化
Vue.filter('number', function(value, format = '0.00') {
	return numeral(value).format(format);
});

// 日期格式化 2017-12-28 15:02:50 => 2017.12.28
Vue.filter('date', function(value, format) {
	if (!value) {
		return '';
	} else {
		return value.split(' ')[0].replace(/-/g, format || '.');
	}
});

// 日期格式化 2017-12-28 15:02:50 => 2017.12.28 15:02:50
Vue.filter('dateTime', function(value, format) {
	if (!value) {
		return '';
	} else {
		return value.split(' ')[0].replace(/-/g, format || '.') + ' ' + value.split(' ')[1];
	}
});

// 日期格式化 2017-12-28 15:02:50 => 2017.12.28
Vue.filter('dateTime1', function(value, format) {
	if (!value) {
		return '';
	} else {
		return value.split(' ')[0].replace(/-/g, format || '.');
	}
});

Vue.filter('timeUnixFormat', function(value, format) {
	return value ? moment.unix(value).format(format || 'YYYY-MM-DD HH:mm:ss') : '';
});

// [timeFormat 时间格式化：2017-6-18 22:24:53 --> YYYY.MM.DD]
Vue.filter('timeFormat', function(value, format) {
	return value ? moment(value).format(format || 'YYYY-MM-DD') : '';
});