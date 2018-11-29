import React from 'react';
import Neighborhood from './components/Index.jsx';

console.log(process.env.NODE_ENV)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: this.props
    }
  }

  render (props) {
    return (
      <div>
        <Neighborhood listing={this.state.listing}/>
      </div>
    )
  }
}

export default App;