import * as React from "react";
import { hot } from "react-hot-loader/root";
import { MyType } from "shared/types/restypes";
import axios from 'axios';

interface Props {}

interface State {
  isLoaded: boolean;
  value: MyType | null;
}

class App extends React.Component<Props, State> {
  // @ts-ignore TODO figure this out
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      value: null
    };
  }

  componentDidMount() {
    let data: any;
    axios.post('/api/', data).then( res => {
      console.log(res)
    })
  }

  render() {
    const apiResponseElement = this.state.isLoaded ? (
      <p>{this.state.value.successMessage || this.state.value.errorMessage}</p>
    ) : (
      <p>Loading...</p>
    );

    return (
      <div className="myclass">
        <h1>My App</h1>
        {apiResponseElement}
      </div>
    );
  }
}

export default hot(App);
