// 引入React
import React from 'react';
import ReactDOM from 'react-dom';

// 引入全局css
import './stylesheets/app.css';

// 引入组件
import App from './components/App';

// 引入Redux
import {createStore} from 'redux';  // 需要使用redux的createStore方法创建store
import {Provider} from 'react-redux';   // 需要使用react-redux封装好的控件Provider包裹App组件
import indexReducer from './redux/indexReducer';    // 导入合并好的全局reducer

// 创建一个全局store用来保存全局状态
const store = createStore(indexReducer);
// 循环显示总的state，这个主要是为了方便在控制台看store中的state
setInterval(() => {
    console.log('total state', store.getState());
}, 3000);

ReactDOM.render(
    // 使用Provider组件包裹App组件，把store作为props传入
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
