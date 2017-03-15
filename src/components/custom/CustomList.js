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
