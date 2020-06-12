import React from 'react';
import ListingShowPage from './ListingShowPage';
import SubmissionSuccess from './SubmissionSuccess';

//issues with image

export default class Listings extends React.Component{

    state={
        name: "",
        quantity: "",
        unit: "",
        description: "",
        image: "",
        type: "",
        address: "",
        city: "",
        state: "",
        postal: "",
    }

displayTheDonationListings=()=>{
    return this.props.donationListings.map(donation=>{
        return <div>
<p onClick={()=>this.props.goToDonationListingShowPage(donation)} className="background-for-general-listings"><img className='general-listing' src= {require(`${donation.image}`)} alt= {donation.name}/></p>
        </div>
    })
}

displayTheRequestListings=()=>{
    return this.props.requestListings.map(request=>{
        return <div>
<p onClick= {()=>this.props.goToRequestListingShowPage(request)} className="background-for-general-listings"><img className='general-listing' src= {require(`${request.image}`)} alt= {request.name}/></p>
        </div>
    })
}

formSubmitted=(event)=>{
    event.preventDefault();
    this.props.createANewListing({

        name: this.state.name,
        quantity: this.state.quantity,
        unit: this.state.unit,
        description: this.state.description,
        image: this.chooseAnImage(),
        type: this.state.type,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        postal: this.state.postal,
    })

    this.setState({
        name: "",
        quantity: "",
        unit: "",
        description: "",
        image: "",
        type: "",
        address: "",
        city: "",
        state: "",
        postal: "",
    })
}

chooseAnImage=()=>{

    if(this.state.name==="Mask"){
        return "./Images/mask.jpg"
    }

    else if(this.state.name==="Acetaminophen"){
        return "./Images/acetaminophen.jpg" 
    }
    else if(this.state.name==="Latex gloves"){
         return "./Images/latex_gloves.jpg"
    }
    else if(this.state.name==="Alcohol pads"){
       return "./Images/alochol_pads.jpg"
    }

    else if(this.state.name==="Band-aids"){
        return "./Images/bandaid_box.jpg"
    }
}

formCompleted=(event)=>{
    this.setState({
        [event.target.name]: event.target.value
    })
}

    render(){

        //console.log(this.state.image)

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

                    <label htmlFor="name">Item name</label>
                    <select className="input-field-for-new-listing-form" name="name" onChange={this.formCompleted}>
                    <option value="-">-</option>
                    <option value="Mask">Mask</option>
                    <option value="Band-aids">Band-aids</option>
                    <option value="Alcohol pads">Alcohol pads</option>
                    <option value="Latex gloves">Latex Gloves</option>
                    <option value="Acetaminophen">Acetaminophen</option>
                    </select>

                    <br></br>
                    <label htmlFor="Quantity">Quantity</label>
                    <input className="input-field-for-new-listing-form" type="text" name="quantity" value={this.state.quantity} placeholder="quantity" onChange={this.formCompleted}/>
                    <br></br>

                    <label htmlFor="unit">Unit</label>
                    <select className="input-field-for-new-listing-form" name="unit" onChange={this.formCompleted}>
                    <option value="-">-</option>
                    <option value="box(es)">box(es)</option>
                    <option value="package(s)">package(s)</option>
                    <option value="container(s)">container(s)</option>
                    <option value="bottle(s)">bottle(s)</option>
                    </select>

                    <br></br>

                    <label htmlFor="description">Description</label>
                    <input className="input-field-for-new-listing-form" type="text" name="description" value={this.state.description} placeholder="description" onChange={this.formCompleted}/>
                    <br></br>
                    {/* <label htmlFor="address">Address</label>
                    <input className="input-field-for-new-listing-form" type="text" name="address" value={this.state.address} placeholder="address" onChange={this.formCompleted}/>
                    <br></br>
                    <label htmlFor="city">City</label>
                    <input className="input-field-for-new-listing-form" type="text" name="city" value={this.state.city} placeholder="city" onChange={this.formCompleted}/>
                    <br></br>
                    <label htmlFor="state">State</label>
                    <input className="input-field-for-new-listing-form" type="text" name="state" value={this.state.state} placeholder="state" onChange={this.formCompleted}/>
                    <br></br>
                    <label htmlFor="postal">Zipcode</label>
                    <input className="input-field-for-new-listing-form" type="text" name="postal" value={this.state.postal} placeholder="zipcode" onChange={this.formCompleted}/> */}

                    <br></br>

                    <input className="radio-button-for-new-listing-form" type="radio" id="donation" name="type" value="donation" onChange={this.formCompleted}/>
                    <label htmlFor="donation">Donation</label>
                    <br></br>
                    <input className="radio-button-for-new-listing-form" type="radio" id="request" name="type" value="request" onChange={this.formCompleted}/>
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
                initiateNewRequestToDonate={this.props.initiateNewRequestToDonate}
                typeOfListingExpanded={this.props.typeOfListingExpanded}/> 
        )
    }
}