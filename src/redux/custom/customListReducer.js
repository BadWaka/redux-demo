// 引入customItemReducer
import customItemReducer from './customItemReducer';

/**
 * 习惯列表的Reducer
 * @param state 这里收到的state是一个习惯项的数组
 * @param action
 * @return {*}
 */
const customListReducer = (state = [], action) => { // 这里使用ES6的语法，如果state是undefined的话，给state设置一个默认值；为什么要这样？因为reducer和store创建的时候会默认的发送初始化的action和用于检测的action；如果state是undefined，而reducer里又没有处理，直接返回了，就会在控制台里报错
    console.log('customListReducer state = ', state, ' action = ', action);
    switch (action.type) {
        /**
         * 添加customItem
         */
        case 'ADD_CUSTOM_ITEM_ACTION':
            // 返回一个新对象
            let newCustomItem = {
                id: action.id,  // id
                text: action.text,  // 文本内容
                completed: false    // 是否完成
            };
            // 复制一份state的副本，永远不要修改state，而是返回state的一份副本
            let newState = [...state];
            // console.log('newState', newState);
            newState.push(newCustomItem);   // 把新的习惯项添加到副本中
            return newState;    // 返回
        /**
         * 修改习惯项完成状态Action
         */
        case 'CHANGE_CUSTOM_ITEM_COMPLETION_STATUS_ACTION':
            // 遍历state(这里得到的state是customList，是一个数组)，返回一个新数组
            return state.map((customItem) => {
                // 对每一项再调用customItemReducer
                return customItemReducer(customItem, action);
            });
        default:
            return state;
    }
};

export default customListReducer;