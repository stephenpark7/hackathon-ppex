import React from 'react';

//Not currently using this form for anything, but I will save it just in case

export default class NewDirectRequestForm extends React.Component{

    state={
        item: "",
        location: "",
        quantity: "",
        description: "",
        image: "./Images/mask.jpg",
        type: ""
    }

    formSubmit=(event)=>{
        event.preventDefault();
        this.props.submitNewDirectRequestForItem({
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
    
    formOnChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

//this form will be revised...right now it is just a copy of another form, to start with a template

    render(){
        return(
                <div>
                    <h2>Submit a Direct Request for An Item</h2>
                    <div className="container-for-new-listing-form">
                    <form onSubmit={this.formSubmit} className="form-for-new-listings">
                    <input className="input-field-for-new-listing-form" type="text" name="item" value={this.state.item} placeholder="item to be listed" onChange={this.formOnChange}/>
                    <br></br>
                    <input className="input-field-for-new-listing-form" type="text" name="location" value={this.state.location} placeholder="your location" onChange={this.formOnChange}/>
                    <br></br>
                    <input className="input-field-for-new-listing-form" type="text" name="quantity" value={this.state.quantity} placeholder="quantity" onChange={this.formOnChange}/>
                    <br></br>
                    <input className="input-field-for-new-listing-form" type="text" name="description" value={this.state.description} placeholder="description" onChange={this.formOnChange}/>
                    <br></br>
                    <input className="input-field-for-new-listing-form" type="text" name="image" value={this.state.image} placeholder="image"/>
                    <br></br>
                    <input className="radio-button-for-new-listing-form" type="radio" id="donation" name="type" value="Donation" onChange={this.formOnChange}/>
                    <label for="donation">Donation</label>
                    <br></br>
                    <input className="radio-button-for-new-listing-form" type="radio" id="request" name="type" value="Request" onChange={this.formOnChange}/>
                    <label for="request">Request</label>
                    <br></br>
                    <input className="submit-button-for-new-listing" type="submit" value="Submit" />
                    </form>
                    </div>
                </div>
        )
    }
}