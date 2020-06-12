import React from 'react';

//Not currently using this form for anything, but I will save it just in case

export default class NewDirectRequestForm extends React.Component{

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

    formSubmit=(event)=>{
        event.preventDefault();
        this.props.submitNewDirectRequestForItem({

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
    
        else if(this.state.name==="Bandaids"){
            return "./Images/bandaid_box.jpg"
        }
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
                    <input className="input-field-for-new-listing-form" type="text" name="item" value={this.state.name} placeholder="item to be listed" onChange={this.formOnChange}/>
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