import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Home from './Home';
import Login from './Login';
import Listings from './Listings';
import Profile from './Profile';

export default class App extends React.Component {

state={

  userType:"requester",

  donationListings: [{item: "Latex Gloves", description: "protects your hands from the coronavirus", quantity: "2 boxes", location: "New York", image: "./Images/latex_gloves.jpg"}, 
  {item: "Acetaminophen", description: "brings the fever down", quantity: "1 bottle", location: "Chicago", image: "./Images/acetaminophen.jpg"},
  {item: "Mask", description: "cover your face!", quantity: "4 boxes", location: "San Francisco", image: "./Images/mask.jpg"},
  {item: "Band-aids", description: "keep the germs out of any cuts you have", quantity: "5 boxes", location: "Arizona", image: "./Images/bandaid_box.jpg"},
  {item: "Alcohol pads", description: "clean open wounds or anything the Coronavirus might have touched", quantity: "4 boxes", location: "Michigan", image: "./Images/alcohol_pads.jpg"}
],
  requestListings: [{item: "Band-aids", description: "keep the germs out of any cuts you have", quantity: "5 boxes", location: "Arizona", image: "./Images/bandaid_box.jpg"}, 
  {item: "Alcohol pads", description: "clean open wounds or anything the Coronavirus might have touched", quantity: "4 boxes", location: "Michigan", image: "./Images/alcohol_pads.jpg"}],
 
  requestorDirectDonationRequestsReceived: [{item: "Band-aids", description: "keep the germs out of any cuts you have", quantity: "5 boxes", location: "Arizona", image: "./Images/bandaid_box.jpg"}], 
  
  requestorListings: [{item: "Mask", description: "cover your face!", quantity: "4 boxes", location: "San Francisco", image: "./Images/mask.jpg"}], 
  
  requestorAcceptedDonations: [{item: "Mask", description: "cover your face!", quantity: "4 boxes", location: "San Francisco", image: "./Images/mask.jpg"}],

  donorApprovedRequests: [{item: "Latex Gloves", description: "protects your hands from the coronavirus", quantity: "2 boxes", location: "New York", image: "./Images/latex_gloves.jpg"}],
  
  donorDirectRequestsReceived: [{item: "Acetaminophen", description: "brings the fever down", quantity: "1 bottle", location: "Chicago", image: "./Images/acetaminophen.jpg"},
  {item: "Mask", description: "cover your face!", quantity: "4 boxes", location: "San Francisco", image: "./Images/mask.jpg"}], 
  
  donorListings: [{item: "Acetaminophen", description: "brings the fever down", quantity: "1 bottle", location: "Chicago", image: "./Images/acetaminophen.jpg"}],

  donationListingShowPageExpanded: false,
  requestListingShowPageExpanded: false,
  aShowPageIsExpanded: false,
  currentlyExpandedListing: [],
  profileListingExpanded: false,
  createdANewListing: false,
  typeOfListingExpanded: "",
  newDirectRequestForItem: false,
  newDirectRequestToDonateItem: false,
  showSubmissionPage: false
}

// componentDidMount=()=>{

//   
//   })


// }

goToDonationListingShowPage=(donation)=>{
  this.setState({
    donationListingShowPageExpanded: true,
    requestListingShowPageExpanded: false,
    aShowPageIsExpanded: true,
    currentlyExpandedListing: donation,
    createdANewListing: false,
    typeOfListingExpanded: "donation"
  })
}

goToRequestListingShowPage=(request)=>{
  this.setState({
    requestListingShowPageExpanded: true,
    donationListingShowPageExpanded: false,
    aShowPageIsExpanded: true,
    currentlyExpandedListing: request,  
    createdANewListing: false,
    typeOfListingExpanded: "request"
  })
}

returnToListingsIndex=()=>{
  this.setState({
    currentlyExpandedListing: [],
    aShowPageIsExpanded: false,
    requestListingShowPageExpanded: false,
    donationListingShowPageExpanded: false,
    profileListingExpanded: false,
    createdANewListing: false,
    typeOfListingExpanded: "",
    newDirectRequestForItem: false,
    newDirectRequestToDonate: false,
    showSubmissionPage: false

  })
}

createANewListing=(listing)=>{

  if(listing.type==="Donation"){
    this.setState({
      aShowPageIsExpanded: false,
      donationListings: [...this.state.donationListings, listing],
      showSubmissionPage: true,
      createdANewListing: true
  })

  }
  else if(listing.type==="Request"){
    this.setState({
      aShowPageIsExpanded: false,
      requestListings: [...this.state.donationListings, listing],
      showSubmissionPage: true,
      createdANewListing: true
    })
  }
}

goToDonationListingShowPageFromProfile=(donation)=>{
  this.setState({
    donationListingShowPageExpanded: true,
    requestListingShowPageExpanded: false,
    aShowPageIsExpanded: true,
    currentlyExpandedListing: donation,
    profileListingExpanded: true,
    createdANewListing: false,
    typeOfListingExpanded: "user's donation listing"
  })
}

goToRequestListingShowPageFromProfile=(request)=>{
  this.setState({
    requestListingShowPageExpanded: true,
    donationListingShowPageExpanded: false,
    aShowPageIsExpanded: true,
    currentlyExpandedListing: request   ,
    profileListingExpanded: true,
    createdANewListing: false,
    typeOfListingExpanded: "user's request listing expanded"
  })
}

goToDirectRequestFromProfile=(request)=>{
  this.setState({
    requestListingShowPageExpanded: true,
    donationListingShowPageExpanded: false,
    aShowPageIsExpanded: true,
    currentlyExpandedListing: request   ,
    profileListingExpanded: true,
    createdANewListing: false,
    typeOfListingExpanded: "direct request"
  })
}

goToDirectDonationFromProfile=(request)=>{
  this.setState({
    requestListingShowPageExpanded: true,
    donationListingShowPageExpanded: false,
    aShowPageIsExpanded: true,
    currentlyExpandedListing: request   ,
    profileListingExpanded: true,
    createdANewListing: false,
    typeOfListingExpanded: "direct donation"
  })
}

initiateNewRequestForItem=(item)=>{
  console.log("clicked")
this.setState({
  aShowPageIsExpanded: false,
  newDirectRequestForItem: true,
  donorDirectRequestsReceived: [...this.state.donorDirectRequestsReceived, item],
  showSubmissionPage: true,
})
}

initiateNewRequestToDonate=(item)=>{
  console.log("clicked")
  this.setState({
    aShowPageIsExpanded: false,
    newDirectRequestToDonateItem: true,
    requestorDirectDonationRequestsReceived: [...this.state.requestorDirectDonationRequestsReceived, item],
    showSubmissionPage: true
  })
}

// createNewDirectRequestForItem=()=>{
  
//   //this will trigger the rendering of a form to submit a request for an item that is listed

// }

// createNewDirectRequestToDonate=()=>{
//   //this will trigger the rendering of a form to submit a request to donate to someone who posted a request

// }

// submitNewDirectRequestToDonate=()=>{

// }

// submitNewDirectRequestForItem=()=>{
  
// }


  render(){

  return (
    <div>
    <Router>
      
      <NavigationBar returnToListingsIndex={this.returnToListingsIndex}/>
  
     <Switch>

      <Route exact path= '/' render={(renderProps)=> <Home {...renderProps}/>}/>

      <Route exact path= '/login' render={(renderProps)=> <Login {...renderProps}/>}></Route>

      <Route exact path= '/listings' render={(renderProps)=> <Listings {...renderProps} donationListings= {this.state.donationListings} 
      requestListings= {this.state.requestListings}
      goToRequestListingShowPage={this.goToRequestListingShowPage}
      goToDonationListingShowPage={this.goToDonationListingShowPage}
      aShowPageIsExpanded={this.state.aShowPageIsExpanded}
      currentlyExpandedListing={this.state.currentlyExpandedListing}
      returnToListingsIndex={this.returnToListingsIndex}
      donationListingShowPageExpanded={this.state.donationListingShowPageExpanded}
      requestListingShowPageExpanded={this.state.requestListingShowPageExpanded}
      createANewListing={this.createANewListing}
      profileListingExpanded={this.state.profileListingExpanded}
      createdANewListing={this.state.createdANewListing}
      userType={this.state.userType}
      initiateNewRequestForItem={this.initiateNewRequestForItem}
      initiateNewRequestToDonate={this.initiateNewRequestToDonate}
      createNewDirectRequestForItem={this.createNewDirectRequestForItem}
      createNewDirectRequestToDonate={this.createNewDirectRequestToDonate}
      newDirectRequestForItem={this.state.newDirectRequestForItem}
      newDirectRequestToDonate={this.state.newDirectRequestToDonateItem}
      showSubmissionPage={this.state.showSubmissionPage}/>}></Route>

      <Route exact path= '/profile' render={(renderProps)=> <Profile {...renderProps}
      goToRequestListingShowPageFromProfile={this.goToRequestListingShowPageFromProfile}
      goToDonationListingShowPageFromProfile={this.goToDonationListingShowPageFromProfile}
      aShowPageIsExpanded={this.state.aShowPageIsExpanded}
      requestListingShowPageExpanded={this.state.requestListingShowPageExpanded}
      donationListingShowPageExpanded={this.state.donationListingShowPageExpanded}
      currentlyExpandedListing={this.state.currentlyExpandedListing}
      returnToListingsIndex={this.returnToListingsIndex}
      profileListingExpanded={this.state.profileListingExpanded}
      userType={this.state.userType}
      requestorDirectDonationRequestsReceived={this.state.requestorDirectDonationRequestsReceived}
      requestorListings={this.state.requestorListings}
      requestorAcceptedDonations={this.state.requestorAcceptedDonations}
      donorApprovedRequests={this.state.donorApprovedRequests}
      donorDirectRequestsReceived={this.state.donorDirectRequestsReceived}
      donorListings={this.state.donorListings}/>}></Route>

     </Switch>

     </Router>
     </div>
  
  );
}
}
