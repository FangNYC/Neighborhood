import React from 'react';
import DescriptionSections from './DescriptionSection.jsx';
import Landmarks from './Landmarks.jsx'
import Map from './Map.jsx'
import axios from 'axios';

export default class Neighborhood extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoaded: props.listing.dataLoaded || false,
      listingId: props.listing.listingId || null,
      hostFirstName: props.listing.hostFirstName || null, 
      hostNeighbDesc: props.listing.neighbDesc || null,
      hostGettingAroundDesc: props.listing.gettingAroundDesc || null,
      listingLocation: null,
      neighborhoodId: props.listing.neighbId || null,
      neighbName: props.listing.neighbName || null,
      neighbDescriptors: props.listing.neighbDescriptors || null,
      city: props.listing.cityString || null, 
      region: props.listing.regionString || null,
      country: props.listing.country || null,
      nearbyLandmarks: props.listing.nearbyLandmarks || [],
      listingLat: props.listing.listingLat || null,
      listingLong: props.listing.listingLong || null
    }
  }

  // componentDidMount() {
  //   console.log('COMPONSNET MOUNTING')
  //   let queryString = window.location.search;
    
  //   let splits = queryString.split('=');
  //   let listingId = parseInt(splits[splits.length -1])

  //   console.log('Listing Id from client query', listingId);

  //   this.setState({listingId: listingId})
  //   // Get listing data
  //   axios.get(`api/listingdata`, { params: 
  //     {id: listingId}
  //   })

  //   .then(({data}) => {
  //     console.log('DATA /listingdata GET req', data)
  //     this.setState({
  //       listingId,
  //       hostFirstName: data[0].hostFirstName,
  //       hostNeighbDesc: data[0].neighbDesc,
  //       hostGettingAroundDesc: data[0].gettingAroundDesc,
  //       listingLat: data[0].listingLat,
  //       listingLong: data[0].listingLong,
  //       neighborhoodId: data[0].neighbId
  //     })
  //   })
  //   .catch((err) => {console.error(err)})
    
  //   // Get neighborhood data
  //   .then(() => {
  //     let neighbId = this.state.neighborhoodId;
  //     axios.get('api/neighborhooddata', {params: {
  //       id: neighbId
  //     }})
  //     .then(({data}) => {
  //       let neighborhood = data[0];
  //       this.setState({
  //         neighbName: neighborhood.neighbName,
  //         neighbDescriptors: [neighborhood.feature1, neighborhood.feature2, neighborhood.feature3, 
  //         neighborhood.feature4, neighborhood.feature5, neighborhood.feature6, neighborhood.feature7],
  //         city: neighborhood.cityString,
  //         region: neighborhood.regionString,
  //         country: neighborhood.country
  //       })
  //     })
  //   })

  //   // Get landmark data for five nearest landmarks to this location
  //   .then(() => {
  //     console.log('LANDMARK DATA to get')
  //     axios.get('api/landmarkdata', {params: {
  //       // listingLocation: this.state.listingLocation
  //       listingLat: this.state.listingLat, 
  //       listingLong: this.state.listingLong
  //     }})
  //     .then(({data}) => {
  //       console.log('got landmark data')
  //       this.setState({
  //         nearbyLandmarks: data,
  //         dataLoaded: true
  //       })
  //     })
  //   })
  //   .catch((err) => {console.error(err)})
  // }

  render(props) {
    // if (!this.props.dataLoaded) {
    //   return (
    //     <p>Loading...</p>
    //   )
    // } else {
      return(
        <div className="app">
          <h2>The neighborhood</h2>

          <DescriptionSections 
            hostname={this.state.hostFirstName} 
            neighbName={this.state.neighbName}              
            neighbDescriptors={this.state.neighbDescriptors}
            city={this.state.city}                          
            region={this.state.region}                      
            country={this.state.country}                      
            neighbDesc={this.state.hostNeighbDesc} 
            gettingAround={this.state.hostGettingAroundDesc} 
          />
          
          <hr/>
          <Landmarks nearbyLandmarks={this.state.nearbyLandmarks}/>
          <Map lat={this.state.listingLat} long={this.state.listingLong}/>
          <hr/>
        </div>
      )
    // }
  }
}
