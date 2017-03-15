import React, {Component} from 'react';
import CustomList from './custom/CustomList';

export default class App extends Component {
    render() {
        return (
            <section className="App">
                <CustomList/>
            </section>
        );
    }
}
