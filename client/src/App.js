import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Home from './Home';
import Login from './Login';
import Listings from './Listings';
import Profile from './Profile';
import axios from 'axios';

export default class App extends React.Component {

state={

  userType:"requester",

  //combine donationListings and RequestListings, call it generaListings in state, keep in mind that type is an attribute

  listings: [],

  donationListings: [],

  // donationListings: [{name: "Latex Gloves", description: "protects your hands from the coronavirus", quantity: "2", unit: "box(es)", address: "1311 Maple St.", city: "New York", state: "New York", postal: "11104", image: "./Images/latex_gloves.jpg"}, 
  // {name: "Acetaminophen", description: "brings the fever down", quantity: "1", unit: "bottle(s)", address: "43-18 40th St.", city: "Chicago", state: "Illinois", postal: "11104", image: "./Images/acetaminophen.jpg"},
  // {name: "Mask", description: "cover your face!", quantity: "4", unit: "box(es)", address: "1415 Birdie Dr.", city: "San Francisco", state: "California", postal: "90007", image: "./Images/mask.jpg"},
  // {name: "Band-aids", description: "keep the germs out of any cuts you have", quantity: "5", unit: "box(es)", address: "5674 Desert Flower Dr.", city: "Tuscon", state: "Arizona", postal: "90236", image: "./Images/bandaid_box.jpg"},
  // {name: "Alcohol pads", description: "clean open wounds or anything the Coronavirus might have touched", quantity: "4", unit: "container(s)", address: "4890 W. Lake St.", city: "Detroit", state: "Michigan", postal: "78654", image: "./Images/alcohol_pads.jpg"}],

  requestListings: [],

  //requestListings: [{name: "Band-aids", description: "keep the germs out of any cuts you have", quantity: "5", unit: "box(es)", address: "5674 Desert Flower Dr.", city: "Tuscon", state: "Arizona", postal: "90236", image: "./Images/bandaid_box.jpg"}, 
  //{name: "Alcohol pads", description: "clean open wounds or anything the Coronavirus might have touched", quantity: "4", unit: "container(s)", address: "4890 W. Lake St.", city: "Detroit", state: "Michigan", postal: "78654", image: "./Images/alcohol_pads.jpg"}],
 
  //requestorDirectDonationRequestsReceived: [{name: "Band-aids", description: "keep the germs out of any cuts you have", quantity: "5", unit: "box(es)", address: "5674 Desert Flower Dr.", city: "Tuscon", state: "Arizona", postal: "90236", image: "./Images/bandaid_box.jpg"}], 
  
  requestorDirectDonationRequestsReceived: [],

  requestorListings: [],

  //requestorListings: [{name: "Mask", description: "cover your face!", quantity: "4", unit: "box(es)", address: "1415 Birdie Dr.", city: "San Francisco", state: "California", postal: "90007", image: "./Images/mask.jpg"}], 
  
  requestorAcceptedDonations: [],

  //requestorAcceptedDonations: [{name: "Mask", description: "cover your face!", quantity: "4", unit: "box(es)", address: "1415 Birdie Dr.", city: "San Francisco", state: "California", postal: "90007", image: "./Images/mask.jpg"}],

  //donorApprovedRequests: [{name: "Latex Gloves", description: "protects your hands from the coronavirus", quantity: "2", unit: "box(es)", address: "1311 Maple St.", city: "New York", state: "New York", postal: "11104", image: "./Images/latex_gloves.jpg"}],
  
  donorApprovedRequests: [],

  donorDirectRequestsReceived: [],

  //donorDirectRequestsReceived: [{name: "Acetaminophen", description: "brings the fever down", quantity: "1", unit: "bottle(s)", address: "43-18 40th St.", city: "Chicago", state: "Illinois", postal: "11104", image: "./Images/acetaminophen.jpg"},
  //{item: "Mask", description: "cover your face!", quantity: "4", unit: "box(es)", address: "1415 Birdie Dr.", city: "San Francisco", state: "California", postal: "90007", image: "./Images/mask.jpg"}], 
  
  //donorListings: [{name: "Acetaminophen", description: "brings the fever down", quantity: "1", unit: "bottle(s)", address: "43-18 40th St.", city: "Chicago", state: "Illinois", postal: "11104", image: "./Images/acetaminophen.jpg"}],

  donorListing: [],

  donationListingShowPageExpanded: false,
  requestListingShowPageExpanded: false,
  aShowPageIsExpanded: false,
  currentlyExpandedListing: [],
  profileListingExpanded: false,
  createdANewListing: false,
  typeOfListingExpanded: "",
  newDirectRequestForItem: false,
  newDirectRequestToDonateItem: false,
  showSubmissionPage: false,
  loggedIn: false
}

getJWT() {
  const jwt = localStorage.getItem("jwt");
  if (jwt) return { token: JSON.parse(jwt).accessToken, id: JSON.parse(jwt).id };
  else return null;
}
fetchData() {
  const jwt = this.getJWT();
  if (jwt) {
    const token = jwt.token;
    const id = jwt.id;
    let isDonor;
    // get user data
    axios({
      method: 'get',
      url: "/profile",
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
    .then(res => {
      isDonor = res.data.type === "donor";
      this.setState({userType: res.data.type});
    })
    .catch(err => {
      console.log(err.response.data);
    });
    // get listings
    axios({
      method: 'get',
      url: "/listings?target=all",
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
    .then(res => {
      const listings = res.data;
      this.setState({donationListings: listings.filter(listing => listing.type === "donation")});
      this.setState({requestListings: listings.filter(listing => listing.type === "request")});
      if (isDonor) {
        this.setState({donorListings: listings.filter(listing => listing.owner === id)});
        let pending = [];
        let accepted = [];
        for (let i = 0; i < listings.length; i++) {
          if (listings[i].responses && listings[i].owner === id)
          for (let j = 0; j < listings[i].responses.length; j++) {
            if (listings[i].responses[j].status === "pending") {
              listings[i].responses[j].responseId = j;
              pending.push(listings[i].responses[j]);
            }
            else if (listings[i].responses[j].status === "accepted") {
              accepted.push(listings[i].responses[j]);
            }
          }
        }
        this.setState({donorDirectRequestsReceived: pending});
        this.setState({donorApprovedRequests: accepted});
      } else {
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
}
componentDidMount=()=>{
  this.fetchData();
}

goToDonationListingShowPage=(donation)=>{
  this.setState({
    donationListingShowPageExpanded: true,
    requestListingShowPageExpanded: false,
    aShowPageIsExpanded: true,
    currentlyExpandedListing: donation,
    createdANewListing: false,
    typeOfListingExpanded: "donation",
    profileListingExpanded: false
  })
}

goToRequestListingShowPage=(request)=>{
  this.setState({
    requestListingShowPageExpanded: true,
    donationListingShowPageExpanded: false,
    aShowPageIsExpanded: true,
    currentlyExpandedListing: request,  
    createdANewListing: false,
    typeOfListingExpanded: "request",
    profileListingExpanded: false
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
    showSubmissionPage: false,
  })
}

submitNewListing(listing) {
  const { token } = this.getJWT();

  axios({
    method: 'post',
    url: "/listings/new",
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    data: {
      name: listing.name,
      quantity: listing.quantity,
      unit: listing.unit,
      description: listing.description,
      image: listing.image,
      type: listing.type
    }
  })
  .then(res => {
    console.log(res.data);
    this.fetchData();
  })
  .catch(err => {
    console.log(err.response.data);
  });
}

requestListing(listing) {
  const { token } = this.getJWT();
  axios({
    method: 'put',
    url: "/listing/" + listing._id,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    data: {
      name: listing.name,
      quantity: listing.quantity,
      unit: listing.unit,
      description: listing.description,
      image: listing.image
    }
  })
  .then(res => {
    console.log(res.data);
    this.fetchData();
  })
  .catch(err => {
    console.log(err.response.data);
  });
}

deleteListing(listing) {
  const { token } = this.getJWT();
  axios({
    method: 'delete',
    url: "/listing/" + listing._id,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  })
  .then(res => {
    console.log(res.data);
    this.fetchData();
  })
  .catch(err => {
    console.log(err.response.data);
  });

//reset state here

  // this.setState({

  // })
}

deleteItem=(item)=> {
  this.deleteListing(item);
  this.returnToListingsIndex();
}

acceptRequest(listing) {

  console.log(listing);

  const { token } = this.getJWT();
  axios({
    method: 'put',
    url: "/listing/accept/" + listing._id,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    data: {
      responseId: listing.responseId
    }
  })
  .then(res => {
    console.log(res.data);
    this.fetchData();
  })
  .catch(err => {
    console.log(err.response.data);
  });
}

declineRequest(listing) {
  console.log(listing);
}

createANewListing=(listing)=>{

  console.log("clicked")
  console.log(listing.image)

  if(listing.type==="donation"){
    this.submitNewListing(listing);

    this.setState({
        aShowPageIsExpanded: false,
        donationListings: [...this.state.donationListings, listing],
        showSubmissionPage: true,
        createdANewListing: true
    })
  }
  else if(listing.type==="request"){
    this.submitNewListing(listing);
    
    this.setState({
      aShowPageIsExpanded: false,
      requestListings: [...this.state.requestListings, listing],
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
    showSubmissionPage: false,
    typeOfListingExpanded: "donation listing"
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
    showSubmissionPage: false,
    typeOfListingExpanded: "request listing"
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
    showSubmissionPage: false,
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
    showSubmissionPage: false,
    typeOfListingExpanded: "direct donation"
  })
}

goToApprovedRequestsFromProfile=(request)=>{
this.setState({
  requestListingShowPageExpanded: true,
  donationListingShowPageExpanded: false,
  aShowPageIsExpanded: true,
  currentlyExpandedListing: request,
  profileListingExpanded: true,
  createdANewListing: false,
  showSubmissionPage: false,
  typeOfListingExpanded: "approved requests"
})

}

goToAcceptedDonationsFromProfile=(donation)=>{
  this.setState({
    requestListingShowPageExpanded: true,
    donationListingShowPageExpanded: false,
    aShowPageIsExpanded: true,
    currentlyExpandedListing: donation,
    profileListingExpanded: true,
    createdANewListing: false,
    showSubmissionPage: false,
    typeOfListingExpanded: "accepted donations"
  })

}

initiateNewRequestForItem=(item)=>{

  this.requestListing(item);

  this.setState({
    aShowPageIsExpanded: false,
    newDirectRequestForItem: true,
    donorDirectRequestsReceived: [...this.state.donorDirectRequestsReceived, item],
    showSubmissionPage: true,
  })
}

initiateNewRequestToDonate=(item)=>{

  this.requestListing(item);

  this.setState({
    aShowPageIsExpanded: false,
    newDirectRequestToDonateItem: true,
    requestorDirectDonationRequestsReceived: [...this.state.requestorDirectDonationRequestsReceived, item],
    showSubmissionPage: true
  })
}

logOut=()=>{
  localStorage.clear()

  this.setState({
    loggedIn: false
  })
}

logIn=(token)=>{

  if (JSON.parse(localStorage.getItem("jwt")).accessToken){


    const token = JSON.parse(localStorage.getItem("jwt")).accessToken;
    const id = JSON.parse(localStorage.getItem("jwt")).id;
  
    this.setState({
          loggedIn: true
        })
  
  
    let isDonor;
  
    // get user data
    axios({
      method: 'get',
      url: "/profile",
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
    .then(res => {
      isDonor = res.data.type === "donor";
      this.setState({userType: res.data.type});
    })
    .catch(err => {
      console.log(err.response.data);
    });
  
    // get listings
    axios({
      method: 'get',
      url: "/listings?target=all",
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
    .then(res => {
  
      console.log(res.data)
      const listings = res.data;
      this.setState({donationListings: listings.filter(listing => listing.type === "donation")});
      this.setState({requestListings: listings.filter(listing => listing.type === "request")});
      if (isDonor) {
        this.setState({donorListings: listings.filter(listing => listing.owner === id)});
  
        const pending = [];
        const accepted = [];
  
        for (let i = 0; i < listings.length; i++) {
  
          if(listings[i].responses){
          for (let j = 0; j < listings[i].responses.length; j++) {
            if (listings[i].responses[j].status === "pending") {
              pending.push(listings[i].responses[j]);
            }
            else if (listings[i].responses[j].status === "accepted") {
              accepted.push(listings[i].responses[j]);
            }
          }
  
        this.setState({donorDirectRequestsReceived: pending});
        this.setState({donorApprovedRequests: accepted});
      }
    }
  }
  
    })
  
    .catch(err => {
      console.log(err)
      // console.log(err.response.data);
    });
  }

  this.setState({
    loggedIn: true
  })

}

  render(){

  return (

    <div>
    <Router>
      
      <NavigationBar returnToListingsIndex={this.returnToListingsIndex} loggedIn={this.state.loggedIn} logOut={this.logOut}/>
  
     <Switch>

      <Route exact path= '/' render={(renderProps)=> <Home {...renderProps}/>}/>

      <Route exact path= '/login' render={(renderProps)=> <Login {...renderProps} logIn={this.logIn}/>}></Route>

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
      showSubmissionPage={this.state.showSubmissionPage}
      typeOfListingExpanded={this.state.typeOfListingExpanded}/>}></Route>

      <Route exact path= '/profile' render={(renderProps)=> <Profile {...renderProps}
      goToRequestListingShowPageFromProfile={this.goToRequestListingShowPageFromProfile}
      goToDonationListingShowPageFromProfile={this.goToDonationListingShowPageFromProfile}
      goToDirectRequestFromProfile={this.goToDirectRequestFromProfile}
      goToDirectDonationFromProfile={this.goToDirectDonationFromProfile}
      goToApprovedRequestsFromProfile={this.goToApprovedRequestsFromProfile}
      goToAcceptedDonationsFromProfile={this.goToAcceptedDonationsFromProfile}
      aShowPageIsExpanded={this.state.aShowPageIsExpanded}
      requestListingShowPageExpanded={this.state.requestListingShowPageExpanded}
      donationListingShowPageExpanded={this.state.donationListingShowPageExpanded}
      currentlyExpandedListing={this.state.currentlyExpandedListing}
      returnToListingsIndex={this.returnToListingsIndex}
      profileListingExpanded={this.state.profileListingExpanded}
      acceptRequest={this.acceptRequest} 
      declineRequest={this.declineRequest} 
      deleteItem={this.deleteItem} 
      userType={this.state.userType}
      requestorDirectDonationRequestsReceived={this.state.requestorDirectDonationRequestsReceived}
      requestorListings={this.state.requestorListings}
      requestorAcceptedDonations={this.state.requestorAcceptedDonations}
      donorApprovedRequests={this.state.donorApprovedRequests}
      donorDirectRequestsReceived={this.state.donorDirectRequestsReceived}
      donorListings={this.state.donorListings}
      typeOfListingExpanded={this.state.typeOfListingExpanded}
      />}></Route>

     </Switch>

     </Router>
     </div>
  
  );
}
}
