import React from 'react';
import ListingShowPage from './ListingShowPage';
import SubmissionSuccess from './SubmissionSuccess';


export default class Listings extends React.Component{

    state={
        item: "",
        location: "",
        quantity: "",
        description: "",
        image: "./Images/mask.jpg",
        type: ""
    }

displayTheDonationListings=()=>{
    return this.props.donationListings.map(donation=>{
        return <div>
<p onClick={()=>this.props.goToDonationListingShowPage(donation)} className="background-for-general-listings"><img className='general-listing' src= {require(`${donation.image}`)} alt= {donation.item}/></p>
        </div>
    })
}

displayTheRequestListings=()=>{
    return this.props.requestListings.map(request=>{
        return <div>
<p onClick= {()=>this.props.goToRequestListingShowPage(request)} className="background-for-general-listings"><img className='general-listing' src= {require(`${request.image}`)} alt= {request.item}/></p>
        </div>
    })
}

formSubmitted=(event)=>{
    event.preventDefault();
    this.props.createANewListing({
        item: this.state.item,
        location: this.state.location,
        quantity: this.state.quantity,
        description: this.state.description,
        image: this.state.image,
        type: this.state.type
    })

    this.setState({
        item: "",
        location: "",
        quantity: "",
        description: "",
        image: "./Images/mask.jpg",
        type: ""
    })
}

formCompleted=(event)=>{
    this.setState({
        [event.target.name]: event.target.value
    })
}

    render(){

        return(

            !this.props.aShowPageIsExpanded ?

            this.props.showSubmissionPage ?

            <SubmissionSuccess returnToListingsIndex={this.props.returnToListingsIndex} 
            newDirectRequestForItem={this.props.newDirectRequestForItem} 
            newDirectRequestToDonateItem={this.props.newDirectRequestToDonateItem}
            createdANewListing={this.props.createdANewListing}/>

            :

            <div>
                    <h2>Submit a New Listing</h2>
                    <div className="container-for-new-listing-form">
                    <form onSubmit={this.formSubmitted} className="form-for-new-listings">
                    <input className="input-field-for-new-listing-form" type="text" name="item" value={this.state.item} placeholder="item to be listed" onChange={this.formCompleted}/>
                    <br></br>
                    <input className="input-field-for-new-listing-form" type="text" name="location" value={this.state.location} placeholder="your location" onChange={this.formCompleted}/>
                    <br></br>
                    <input className="input-field-for-new-listing-form" type="text" name="quantity" value={this.state.quantity} placeholder="quantity" onChange={this.formCompleted}/>
                    <br></br>
                    <input className="input-field-for-new-listing-form" type="text" name="description" value={this.state.description} placeholder="description" onChange={this.formCompleted}/>
                    <br></br>
                    <input className="input-field-for-new-listing-form" type="text" name="image" readOnly value={this.state.image} placeholder="image"/>
                    <br></br>
                    <input className="radio-button-for-new-listing-form" type="radio" id="donation" name="type" value="Donation" onChange={this.formCompleted}/>
                    <label htmlFor="donation">Donation</label>
                    <br></br>
                    <input className="radio-button-for-new-listing-form" type="radio" id="request" name="type" value="Request" onChange={this.formCompleted}/>
                    <label htmlFor="request">Request</label>
                    <br></br>
                    <input className="submit-button-for-new-listing" type="submit" value="Submit" />
                    </form>
                    </div>

                    <h2 >Donation Listings</h2>
                    {this.displayTheDonationListings()}
                    <h2>Request Listings</h2>
                    {this.displayTheRequestListings()}

             </div>

            :

                <ListingShowPage currentlyExpandedListing={this.props.currentlyExpandedListing}
                returnToListingsIndex={this.props.returnToListingsIndex}
                donationListingShowPageExpanded={this.props.donationListingShowPageExpanded}
                profileListingExpanded={this.props.profileListingExpanded}
                userType={this.props.userType}
                initiateNewRequestForItem={this.props.initiateNewRequestForItem}
                initiateNewRequestToDonate={this.props.initiateNewRequestToDonate}/> 
        )
    }
}