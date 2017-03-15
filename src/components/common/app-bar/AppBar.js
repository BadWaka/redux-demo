/**
 * AppBar
 * Created by BadWaka on 2017/3/13.
 */
import React, {Component} from 'react';
import './app-bar.css';

export default class AppBar extends Component {
    render() {
        return (
            <section className="app-bar">
                <div className="title">{this.props.title}</div>
            </section>
        );
    }
}
