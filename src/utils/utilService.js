import { validator } from './constant'

export const utilService = {
    /**
     * form表单校验
     * utilService.validate(['username','key'], {username: foo, password: foo})
     * return Promise
     */
    validate: function (ruleArr, obj) {
        return new Promise((resolve, reject) => {
            for (var i = 0; i < ruleArr.length; i++) {
                var key = ruleArr[i];
                var value = obj[key];
                // 有输入
                if (value && value !== '') {
                    // 正则不匹配
                    if (validator[key] && !validator[key].test(value)) {
                        reject({
                            status: false,
                            msg: TEXT.ERROR[key],
                            name: key
                        });
                    }
                } else {
                    // 未输入
                    const errorMsg = TEXT.ERROR[key];
                    reject({
                        status: false,
                        msg: !errorMsg ? TEXT.SERVER_ERROR : errorMsg,
                        name: key
                    });
                }
            }
            resolve({
                status: true
            });
        })
    },
}