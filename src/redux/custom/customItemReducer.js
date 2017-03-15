/**
 * 习惯项Reducer
 * Created by BadWaka on 2017/3/15.
 * @param state 这里接收到的state只是单个的一个习惯项
 * @param action
 * @return {*}
 */
const customItemReducer = (state, action) => {
    console.log('customItemReducer state = ', state, ' action = ', action);
    switch (action.type) {
        // 修改习惯项完成状态Action
        case 'CHANGE_CUSTOM_ITEM_COMPLETION_STATUS_ACTION':
            // 因为上一层customReducer会传所有的customItem进来，所以要判断action里的id和传入的state的id是不是相同
            if (action.id !== state.id) {
                return state;   // 如果不相同，直接返回原state
            }
            
            // 注意，Redux官方文档中严格指出不要直接修改state，所以下面这一句是错误的
            // state.completed = !state.completed; // 将completed置反

            // 需要使用Object.assign()新建副本，或者使用对象展开运算符
            // 这里使用对象展开运算符，大概的意思就是将一个对象的可枚举属性拷贝至另一个对象，本例中是state中的可枚举属性给一个新对象，这个新对象就是state的副本；之后修改这个新对象的completed属性，然后将这个新对象作为返回值；
            return {
                ...state,
                completed: !state.completed
            };
        // 别忘了返回一个默认的state
        default:
            return state;
    }
};

export default customItemReducer;