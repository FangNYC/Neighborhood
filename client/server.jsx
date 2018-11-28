import React from 'react';
import Neighborhood from './components/Index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: this.props
    }
  }

  render () {
    return (
      <div>
        <Neighborhood />
      </div>
    )
  }
}

export default App;