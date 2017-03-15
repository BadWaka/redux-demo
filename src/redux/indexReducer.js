/**
 * 最终的Reducer
 * Created by BadWaka on 2017/3/15.
 */
import {combineReducers} from 'redux';  // 需要调用redux中的combineReducers这个合并reducer的方法
import customListReducer from './custom/customListReducer'; // 引入习惯列表Reducer

// 合并Reducer
const appReducer = combineReducers({
    customList: customListReducer   // 这里把state中的customList字段与customListReducer对应起来，相当于customListReducer就只在乎customList这个字段就行了
});

// 导出一个最终的appReducer
export default appReducer;