import React from 'react';

export default class Home extends React.Component{

state={
    currentImage: 0,
}

intervalId=0;

settingInterval=()=>{
    if(this.state.currentImage<=3){
        this.setState({
            currentImage: this.state.currentImage + 1
                })
    }

    else{
        this.setState({
            currentImage: this.state.currentImage-4
        })
    }
}

componentDidMount=()=>{   
      this.intervalId= setInterval(this.settingInterval, 3000); 
}

componentWillUnmount=()=>{
    clearInterval(this.intervalId);
}

renderImages=()=>{
    const medicalSupplies = [
{img: <img  className='featured-listing' src= {require('./Images/alcohol_pads.jpg')} alt= 'box of alcohol pads'/>, name: "Alcohol Pads"},
{img: <img className='featured-listing' src= {require('./Images/bandaid_box.jpg')} alt= 'box of bandaids'/>, name: "Bandaids"},
{img: <img className='featured-listing' src= {require('./Images/mask.jpg')} alt= 'face mask'/>, name: "Face Mask"},
{img: <img className='featured-listing' src= {require('./Images/acetaminophen.jpg')} alt= 'acetaminophen'/>, name: "Acetaminophen"},
{img: <img className='featured-listing' src= {require('./Images/latex_gloves.jpg')} alt= 'latex gloves'/>, name: "Latex Gloves"}

    ]

    return <div id= "featured-product-container">
        <p>{medicalSupplies[this.state.currentImage].img}</p>
        <p>{medicalSupplies[this.state.currentImage].name}</p>
    </div>
}

    render(){
        return(
            <div className= "home-page-container">
        <h2 className= "heading">Welcome to the Coronavirus Donation Center</h2>
        <h3 className= "heading">Featured Listings</h3>
        <div id= "container-for-featured-listings">
        {this.renderImages()}
        </div>
        </div>
        )
    }
}