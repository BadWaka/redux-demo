> GitHub：https://github.com/BadWaka/redux-demo

> 参考文章：[Redux中文文档](https://github.com/camsong/redux-in-chinese)

# 1. Redux是什么？

是一种状态管理容器，用来管理状态。

> Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

> 可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。不仅于此，它还提供 超爽的开发体验，比如有一个[时间旅行调试器可以编辑后实时预览](https://github.com/gaearon/redux-devtools)。

> Redux 除了和 [React](https://facebook.github.io/react/) 一起用外，还支持其它界面库。它体小精悍（只有2kB，包括依赖）。

不明白？继续看下面

# 2. 为什么用Redux?

React中，数据的流向是单向的

props只能从父组件向下传递到子组件
而state只能在组件内部使用

##### 抛出一个问题，如果子组件想把数据传递给父组件，咋办？
这简单啊，可以让父组件通过props给子组件传递一个函数；子组件想传数据的时候，只要调用父组件传进来的函数，把数据当参数传进去并调用该函数，这样父组件就能收到了

##### 那如果要传递给父组件的父组件的父组件呢？把函数一层一层传进来么？
0.0 
可以是可以，就是太麻烦了。。。

##### 那如果一个组件不想和父组件通讯，想和其他的组件通讯，咋办？
0.0 
。。。。。。。

所以这就是问题所在了，完整版请看下方链接

引用知乎上的一段答案
> [理解React,但不理解 *Redux*,该如何通俗易懂的理解 *Redux*? - 编程 -...](https://www.baidu.com/link?url=mjHjK4TLhKNMniNxXuT_Kp9nx3Hi2JsPv3OXsSiCQMEDVH_Mhxo-OXueAIiSAxXVzd9Yf63hs2mXeQnsoMMJyq&wd=&eqid=b18027cb000029440000000358c8b541)

> 作者：Wang Namelos
链接：https://www.zhihu.com/question/41312576/answer/90782136
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

> 解答这个问题并不困难：唯一的要求是你熟悉React。不要光听别人描述名词，理解起来是很困难的。从需求出发，看看使用React需要什么：
1. React有props和state: props意味着父级分发下来的属性，state意味着组件内部可以自行管理的状态，并且整个React没有数据向上回溯的能力，也就是说数据只能单向向下分发，或者自行内部消化。理解这个是理解React和Redux的前提。
2. 一般构建的React组件内部可能是一个完整的应用，它自己工作良好，你可以通过属性作为API控制它。但是更多的时候发现React根本无法让两个组件互相交流，使用对方的数据。然后这时候不通过DOM沟通（也就是React体制内）解决的唯一办法就是提升state，将state放到共有的父组件中来管理，再作为props分发回子组件。
3. 子组件改变父组件state的办法只能是通过onClick触发父组件声明好的回调，也就是父组件提前声明好函数或方法作为契约描述自己的state将如何变化，再将它同样作为属性交给子组件使用。这样就出现了一个模式：数据总是单向从顶层向下分发的，但是只有子组件回调在概念上可以回到state顶层影响数据。这样state一定程度上是响应式的。
4. 为了面临所有可能的扩展问题，最容易想到的办法就是把所有state集中放到所有组件顶层，然后分发给所有组件。
5. 为了有更好的state管理，就需要一个库来作为更专业的顶层state分发给所有React应用，这就是Redux。

# 3. Redux怎么用?

用之前首先要明白Redux的思想，使用方法倒是次要的

重要的是这种把所有数据的状态，都拿出来放到最顶层的思想
做个不恰到的比喻就相当于计划经济。。。

简单描述一下，具体还是要看官方文档：

- 首先把一个应用里所有的数据都拿出来，放到最顶层的一个叫store的容器里，这个里面的state变量存储了整个App的数据状态

- Redux规定了一些规则，store里的数据不能随便改，要改的话要发送一个action，这个action包含了一些操作信息和数据信息，比如有一个添加用户的action，它的操作信息就是添加用户，附带了一些用户的基本信息

- 发送了信息总得有人收到吧 这个接受的人就叫reducer，它会收到action，然后做处理，返回新的数据

- React拿到了新的数据state就会变化，React检测到了state变化就自动更新UI，这就是基本流程了

其实Redux单另拿出来用还是挺简单的，使用教程戳这里https://github.com/react-guide/redux-tutorial-cn#redux-tutorial

主要是和React一起用，需要使用到`react-redux`这个模块
这个模块封装了几个方法，在React项目里要按他这个套路来
，然而这个套路要写的东西有点繁杂，就被绕进去了

官网的Demo就大概讲了这么一个套路，然而他又直接使用了一种高级的设计思想 [容器组件和展示组件相分离](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) ，分成很多个组件，所以看的云里雾里的

下面我们就不用他官方的Demo，自己按正常的逻辑顺序把Redux接入React项目

可以下载我的Demo
GitHub：https://github.com/BadWaka/redux-demo
```
npm install 
npm start
```

# 4. 代码简述

我要做一个习惯应用，用户可以添加习惯，点击习惯可以改变习惯的完成状态，就是这么简单的一个功能

我建立了一个文件夹`redux`用来存放状态管理的相关文件，`redux/custom`和`component/custom`相对应，代表是custom模块的组件部分和状态部分，方便管理
![](http://upload-images.jianshu.io/upload_images/1828354-66cadafbb7dadfb3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### action
在`redux/custom/`下建立一个`actions.js`文件，用来存放custom习惯模块的所有action

![](http://upload-images.jianshu.io/upload_images/1828354-d721283b88bcb954.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
/**
 * Action的集合
 * Created by BadWaka on 2017/3/15.
 */

/**
 * 修改习惯项完成状态Action
 * @param customItemId  习惯项的id
 * @return {{type: string, id: *}}
 */
export const changeCustomItemCompletionStatusAction = (customItemId) => {
    return {
        type: 'CHANGE_CUSTOM_ITEM_COMPLETION_STATUS_ACTION',
        id: customItemId
    };
};

/**
 * 添加习惯项Action
 * @param customItemText    要添加的习惯项的文本
 * @return {{type: string, text: *}}
 */
let nextId = 0;
export const addCustomItemAction = (customItemText) => {
    return {
        type: 'ADD_CUSTOM_ITEM_ACTION',
        text: customItemText,
        id: nextId++
    };
};
```
该文件暴露出两个函数，这两个函数用来生成对应的action
这里的id是自己维护的一个id，讲道理这都应该去服务器获得的，但是那有涉及到异步了。。更复杂，先了解Redux同步使用再说

### reducer

可以看到有3个reducer
![](http://upload-images.jianshu.io/upload_images/1828354-20c4137dacdf5796.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

`indexReducer`是总的reducer，因为一个store只能由一个reducer创建，而React中，我们只需要一个最上层的store就够了；所以这时候就需要reducer的合并，`indexReducer`就是干这个事情的

- `indexReducer.js:`

```
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
```

- `customListReducer.js`

```
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
```

- `customItemReducer.js`

```
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
```

##### 为什么有`customListReducer`又有`customItemReducer`？
因为设计的时候想着是充分解耦，能在内部处理的，就不要麻烦外部的父组件；

比如点击习惯项的时候切换习惯完成状态，它不需要父组件，所以就让customItemReducer来处理；

而添加习惯项的时候，就需要父组件来处理，让customListReducer来处理；

然而，理想是美好的，现实是残酷的

在`indexReducer.js`中合并reducer的时候，需要为每个reducer指定对应的数据，like this：
![](http://upload-images.jianshu.io/upload_images/1828354-c1cbe05b4baeded4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这时候就犯愁了。。整个数组可以这样绑定，单个数据咋办？

于是只能曲线救国，通过customListReducer继续向下分发，于是就有了在`customListReducer`中继续调用`customItemReducer`进行处理
![](http://upload-images.jianshu.io/upload_images/1828354-d6667c28e9a88619.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

所以这就是为啥有`customListReducer`又有`customItemReducer`的原因

好了，既然`action`和`reducer`都有了，那么该有`store`了

### store

`index.js`是React的入口文件，在这个文件里，初始化全局的store
![](http://upload-images.jianshu.io/upload_images/1828354-b58824007709b040.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- `index.js`

```
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

```

这时候，运行程序`npm start`，就应该可以在控制台看到日志了

![](http://upload-images.jianshu.io/upload_images/1828354-547974b22895202e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

INIT是redux初始化自动发的action，PROBE_UNKNOWN_ACTION是测试的action，不用管它们

好了，下面就来触发一个action，看一下状态变化吧

### 触发action，观察现象

- `components/custom/Custom.js`

![](http://upload-images.jianshu.io/upload_images/1828354-8a89dc0fa7d1cfd5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
/**
 * 习惯页
 * Created by BadWaka on 2017/3/11.
 */
import React, {Component} from 'react';
// 引入组件
import AppBar from '../common/app-bar/AppBar';
import CustomItem from './custom-item/CustomItem';
// 引入用到的action
import {addCustomItemAction} from '../../redux/custom/actions';
// 引入connect函数用来生成Redux组件
import {connect} from 'react-redux';

class CustomList extends Component {

    constructor(props) {
        super(props);
        // 这个state是本地state，它存在的意义是为了获得用户的输入文本
        this.state = {
            text: ''
        };
    }

    render() {
        return (
            <section className="custom">
                {/*引入AppBar 自己造的一个React Component 轮子*/}
                <AppBar title="习惯"/>
                <ul>
                    {this.props.customList.map(customItem => // 遍历customList渲染customItem
                        <CustomItem
                            key={customItem.id}
                            id={customItem.id}
                            completed={customItem.completed}
                            text={customItem.text}/>
                    )}
                </ul>
                <div>
                    <input
                        type="text"
                        value={this.state.text}
                        onChange={(e) => {  // 监听用户输入
                            this.setState({
                                text: e.target.value
                            });
                        }}/>
                    <button
                        onClick={() => {
                            console.log('添加 click');
                            // 发送添加习惯项Action
                            this.props.dispatch(addCustomItemAction(this.state.text));
                            // 把输入置为空
                            this.setState({
                                text: ''
                            });
                        }}>
                        添加
                    </button>
                </div>
            </section>
        );
    }
}

// 关联习惯列表的props与state，不关联的话全局的state.customList就没法作为props属性传进来
const mapStateToProps = (state) => {
    return {
        customList: state.customList
    };
};

// 这个方法是用来绑定dispatch的，这里直接在组件里调用dispatch了，所以就没有用到这个方法
// const mapDispatchToProps = {};

// 使用connect函数包裹组件，从而获得store上下文，可以在组件里使用this.props.dispatch访问到dispatch方法
CustomList = connect(mapStateToProps)(CustomList);

export default CustomList;
```

- `components/custom/custom-item/CustomItem.js`

```
/**
 * 习惯Item页
 * Created by BadWaka on 2017/3/11.
 */
import React, {Component} from 'react';
import './custom-item.css';

// 引入另一个CheckBox轮子
import CheckBox from '../../common/check-box/CheckBox';

// 引入用到的action
import {changeCustomItemCompletionStatusAction} from '../../../redux/custom/actions';
// 引入connect函数用来生成Redux组件
import {connect} from 'react-redux';

class CustomItem extends Component {

    render() {
        return (
            <li className="custom-item"
                style={{
                    textDecoration: this.props.completed ? 'line-through' : 'none'
                }}
                onClick={() => {
                    console.log('习惯项点击 customItem click id', this.props.id, 'completed', this.props.completed);
                    // 发送改变习惯项完成状态Action
                    this.props.dispatch(changeCustomItemCompletionStatusAction(this.props.id));
                }}>
                <span>{this.props.text} {'' + this.props.completed}</span>
                <CheckBox checked={this.props.completed}/>
            </li>
        );
    }
}

// 不需要绑定state.customList作为props，也没法绑。。因为不知道具体是哪个；所以让父组件去绑就好了
// 也不需要dispatch，因为组件内部已处理了
// 所以直接调用connect()方法把CustomItem组件变成Redux组件就好了
CustomItem = connect()(CustomItem);

export default CustomItem;
```

注释都写在代码里了。。运行一下可以就看到现象了

![](http://upload-images.jianshu.io/upload_images/1828354-6092b556c08c066c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)