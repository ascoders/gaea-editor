import * as _ from 'lodash'

const UNCHANGED = '__UNCHANGED__'

/**
 * 返回 object，是把 obj2 在 obj1 中相同位置且值相同的key删除
 */
const deepDiff = (obj1: any, obj2: any)=> {
    if (isFunction(obj1) || isFunction(obj2)) {
        throw 'Invalid argument. Function given, object expected.'
    }
    if (isValue(obj1) || isValue(obj2)) {
        if (obj1 !== obj2) {
            return obj1
        } else {
            return UNCHANGED
        }
    }

    let diff: any = {}
    for (let key in obj1) {
        if (isFunction(obj1[key])) {
            continue
        }

        let value2: any
        if ('undefined' != typeof(obj2[key])) {
            value2 = obj2[key]
        }

        const diffResult = deepDiff(obj1[key], value2)
        if (diffResult !== UNCHANGED) {
            diff[key] = diffResult
        }
    }

    return diff
}

export default deepDiff

function isFunction(obj: any) {
    return {}.toString.apply(obj) === '[object Function]'
}
function isArray(obj: any) {
    return {}.toString.apply(obj) === '[object Array]'
}
function isObject(obj: any) {
    return {}.toString.apply(obj) === '[object Object]'
}
function isValue(obj: any) {
    return !isObject(obj) && !isArray(obj)
}