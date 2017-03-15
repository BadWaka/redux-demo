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