import React, {Component} from 'react';
import { connect } from 'react-redux'
import { attest } from '../../modules/attest';
import { bindActionCreators } from 'redux'

class Attest extends Component{

  constructor(props){
    super(props);

      console.log('props', props);

    this.state = {
      uportId : props.profile.address,
      credentialName : "",
      credentialValue : ""
    };

  }

  setInputValue(event){
    event.preventDefault();

    const target = event.target;
    const type = target.type;
    const value = target.value;

    const name = target.name;

    var newState = {...this.state};

    newState[name] = type == "number" ? Number(value) : value;

    this.setState(newState);
  }

  submitAttestation(event){
      event.preventDefault();

    var { uportId, credentialName, credentialValue} = this.state;
    this.props.attest(uportId, credentialName, credentialName);

  }

  render(){
    return (
        <div>
        <h3>Attest a user</h3>
        <label>Uport Id</label>
        <input value={this.state.uportId} type="text" name="uportId" onChange={(e) => this.setInputValue(e)} />

        <label>Credential Name</label>
        <input value={this.state.credentialName} type="text" name="credentialName" onChange={(e) => this.setInputValue(e)} />

        <label>Credential Value</label>
        <input value={ this.state.credentialValue } type="text" name="credentialValue" id="credentialValue"  onChange={(e) => this.setInputValue(e)}/>

        <button onClick={(e) => this.submitAttestation(e)}>Attest</button>
        </div>
           );
  }
}

const mapStateToProps = state => ({
    profile:state.user.profile
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
        attest
    },dispatch);

const AttestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Attest);

export default AttestContainer;
