import React from 'react';
import Neighborhood from './components/Index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: this.props
    }
  }

  render (props) {
    console.log('LISTING IN SERVER JSX', this.state.listing)
    return (
      <div>
        <Neighborhood listing={this.state.listing}/>
      </div>
    )
  }
}

export default App;