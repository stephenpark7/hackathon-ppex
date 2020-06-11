import React from 'react';

export default class SubmissionSuccess extends React.Component{

    //for a new direct request for item

    forNewDirectRequestsForItems=()=>{
        return <div>
        <span className="submitted-new-listing-container">
        <i role="img" className="submitted-new-listing-icon">&#10004;</i>
        <h1>Your request has been submitted.</h1>
        <p>When the donor approves the request, further directions will be provided for exchange.</p>
        <button id="return-to-listings" onClick={this.props.returnToListingsIndex}>Return to Listings</button>
        </span>
    </div>
    }

    //for a new direct request to donate

    forNewDirectRequestsToDonate=()=>{
        return <div>
            <span className="submitted-new-listing-container">
            <i role="img" className="submitted-new-listing-icon">&#10004;</i>
            <h1>Your donation has been submitted.</h1>
            <p>When the requestor approves the submission, further directions will be provided for exchange.</p>
            <button id="return-to-listings" onClick={this.props.returnToListingsIndex}>Return to Listings</button>
            </span>
        </div>
    }

    //for a new listing subnmitted

    forNewListingSubmitted=()=>{

    return <div>
        <span className="submitted-new-listing-container">
        <i role="img" className="submitted-new-listing-icon">&#10004;</i>
        <h1>Your listing has been submitted.</h1>
        <button id="return-to-listings" onClick={this.props.returnToListingsIndex}>Return to Listings</button>
        </span>
        </div>
    }

    chooseWhichToRender=()=>{
        if(this.props.createdANewListing){
           return this.forNewListingSubmitted()
        }
        else if(this.props.newDirectRequestForItem){
            return this.forNewDirectRequestsForItems()
        }

        else{
            return this.forNewDirectRequestsToDonate()
        }
    }

render(){
return(

this.chooseWhichToRender()

)
}
}