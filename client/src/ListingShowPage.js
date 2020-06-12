import React from 'react';

export default class DonationListingShowPage extends React.Component{

    //these first functions are for when the user is navigating from the profile page


profileListingIsExpanded=()=>{
    return <button className="button" 
    onClick={()=> { 
        this.props.deleteItem(this.props.currentlyExpandedListing) 
    } }>Delete This Listing</button> 
}

ifDirectDonationOrRequestExpanded=()=>{
    return <div>
        <button className="button" onClick={()=>this.props.acceptRequest(this.props.currentlyExpandedListing)}>Accept</button> 
        <button className="button" onClick={()=>this.props.declineRequest(this.props.currentlyExpandedListing)}>Decline</button> 
    </div>
}

ifRequestApproved=()=>{
    return <div>
    </div>
}

whichButtonsToRenderFromProfilePage=()=>{
    if(this.props.typeOfListingExpanded === "donation listing" || this.props.typeOfListingExpanded === "request listing"){
        return this.profileListingIsExpanded()
    }

    else if(this.props.typeOfListingExpanded=== "direct donation" || this.props.typeOfListingExpanded=== "direct request"){
        return this.ifDirectDonationOrRequestExpanded()
    }
    else{
        return this.ifRequestApproved()
    }
}

//the following function are for when a uesr is navigating from the general listings



displayInfoAboutRequest=()=>{

    return <div>

        {this.props.donationListingShowPageExpanded ?

            this.props.userType==="donor" ?
            <React.Fragment></React.Fragment>
            :
            <button className="button" onClick={()=>this.props.initiateNewRequestForItem(this.props.currentlyExpandedListing)}>Request This Donation</button>
        
        :
            this.props.userType==="requester" ?
            <React.Fragment></React.Fragment>
            :   
            <button className="button" onClick={()=>this.props.initiateNewRequestToDonate(this.props.currentlyExpandedListing)}>Fulfill This Request</button>       
        }

    </div>
}

whichButtonsToRender=()=>{
    if(this.props.profileListingExpanded){
        return this.whichButtonsToRenderFromProfilePage()
    }
    else{
        return this.displayInfoAboutRequest()
    }
}
    
render(){

    return(
        <div className="div-for-showpage">
        
        {this.props.donationListingShowPageExpanded ?
        <h1>Donation</h1>
        :
        <h1>Request</h1>
        }

        <div className="div-for-showpage-info">
            <p className="showpage-item-name">{this.props.currentlyExpandedListing.name}</p>
            <p className="showpage-item-quantity">Quantity: {this.props.currentlyExpandedListing.quantity} {this.props.currentlyExpandedListing.unit}</p>
        </div>

        <p className="showpage-item-description">{this.props.currentlyExpandedListing.description}</p>

        <img className='listing-showpage-image' src= {require(`${this.props.currentlyExpandedListing.image}`)} alt= {this.props.currentlyExpandedListing.name}/>

        <div className="listing-showpage-location-container">
        <h3>Location</h3>
        <p className="listing-showpage-location">{this.props.currentlyExpandedListing.address}</p>
        <p className="listing-showpage-location">{this.props.currentlyExpandedListing.city}</p>
        <p className="listing-showpage-location">{this.props.currentlyExpandedListing.state}</p>
        <p className="listing-showpage-location">{this.props.currentlyExpandedListing.postal}</p>

        </div>

        {this.whichButtonsToRender()}
    
        <button className= "button" onClick={this.props.returnToListingsIndex}>Return to Listings</button>

        </div>

        )
}

}