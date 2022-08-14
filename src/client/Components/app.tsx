import * as React from 'react';
import '../Less/app.less';
import {apiRoute} from '../utils';
import { Get } from "../Services";

export default class App extends React.Component {
 

    testGet = async (): Promise<void> => {
        try {
            const res: { username: string } = await Get(apiRoute.getRoute('test'))
            this.setState({username: res.username});
        } catch (e: any) {
            this.setState({username: e.message});
        }
    }

  
    render(): JSX.Element {
        return (
            <div>
                <div>
                    <div>
                        <div>
                            <button onClick={this.testGet}>{"Test Get"}</button>
                        </div>
                        <label>{"Test for Get: "}</label>
                    </div>
                </div>
            </div>
        );
    }
}
