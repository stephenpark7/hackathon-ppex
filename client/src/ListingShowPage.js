import React from 'react';

export default class DonationListingShowPage extends React.Component{


displayInfoAboutRequest=()=>{
    return <div className="div-for-showpage">
        
        {this.props.donationListingShowPageExpanded ?
        <h1>Donation</h1>
        :
        <h1>Request</h1>
        }

        <div className="div-for-showpage-info">
            <p className="showpage-item-name">{this.props.currentlyExpandedListing.item}</p>
            <p className="showpage-item-quantity">Quantity: {this.props.currentlyExpandedListing.quantity}</p>
        </div>

        <p className="showpage-item-description">{this.props.currentlyExpandedListing.description}</p>

        <img className='listing-showpage-image' src= {require(`${this.props.currentlyExpandedListing.image}`)} alt= {this.props.currentlyExpandedListing.item}/>

        <div className="listing-showpage-location-container">
        <h3>Location</h3>
        <p className="listing-showpage-location">{this.props.currentlyExpandedListing.location}</p>
        </div>
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

<button className= "button" onClick={this.props.returnToListingsIndex}>Return to Listings</button>


            {this.props.profileListingExpanded ?

        <button className="button">This button will do something tomorrow</button>

        :

        <React.Fragment></React.Fragment>

        }


    </div>
}
    
render(){
    return(
        this.displayInfoAboutRequest()
        )
}

}