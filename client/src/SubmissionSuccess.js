import React from 'react';

export default class SubmissionSuccess extends React.Component{


    chooseWhichToRender=()=>{
        if(this.props.createdANewListing){
           return <h1>
           Your listing has been submitted.</h1>
        }
        
        else if(this.props.newDirectRequestForItem){
            return <React.Fragment>
            <h1>Your request has been submitted.</h1>
            <p>When the donor approves the request, further directions will be provided for exchange.</p>
            </React.Fragment>
        }

        else{
            return <React.Fragment>
            <h1>Your donation has been submitted.</h1>
            <p>When the requestor approves the submission, further directions will be provided for exchange.</p>
            </React.Fragment>
        }
    }

render(){
return(
        <span className="submitted-new-listing-container">
        <i role="img" className="submitted-new-listing-icon">&#10004;</i>
        {this.chooseWhichToRender()}
        <button id="return-to-listings" onClick={this.props.returnToListingsIndex}>Return to Listings</button>
        </span>
)
}
}