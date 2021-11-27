import React, { Component } from 'react'
import Web3 from 'web3'
import { LEAKAGE_OF_SECRET_ADDRESS, LEAKAGE_OF_SECRET_ABI, KEY_THEFT_ABI, KEY_THEFT_ADDRESS } from './config'
import { Tabs, Tab } from 'react-bootstrap'

class App extends Component {
    componentWillMount() {
        this.loadBlockchainData()
    }

    async getKeyTheftState(){
      if(this.state.keyTheft!=='undefined'){
        let curState = await this.state.keyTheft.methods.getState().call()
        this.setState({keyTheftState: curState})
      }
    }

    async getLeakageOfSecretState(){
      if(this.state.leakageOfSecret!=='undefined'){
        let curState = await this.state.leakageOfSecret.methods.getState().call()
        this.setState({leakageOfSecretState: curState})
      }
    }
    async loadBlockchainData() {
      if(typeof window.ethereum !== "undefined"){
        const web3 = new Web3(window.ethereum)
        const netId = await web3.eth.net.getId()
        const accounts = await web3.eth.getAccounts()
        const balance = await web3.eth.getBalance(accounts[0])
        console.log(accounts[0]);
        this.setState({ account: accounts[0] })
        try{
          const leakageOfSecret = new web3.eth.Contract(LEAKAGE_OF_SECRET_ABI, LEAKAGE_OF_SECRET_ADDRESS)
          const keyTheft = new web3.eth.Contract(KEY_THEFT_ABI, KEY_THEFT_ADDRESS);
          this.setState({keyTheft: keyTheft, leakageOfSecret:leakageOfSecret})
          this.getKeyTheftState()
          this.getLeakageOfSecretState()
        } catch (e) {
          console.log('Error', e)
          window.alert('Contracts not deployed to the current network')
        }
      }
    }

    async initLeak(){
      if(this.state.leakageOfSecret!=='undefined'){
        try{
          await this.state.leakageOfSecret.methods.init().send({from: this.state.account, gas:3000000})
          this.getLeakageOfSecretState()
        } catch (e) {
          console.log('Error, deposit: ', e)
        }
      }
    }

    async commitKeyHashes(keyHashes, noEle, revEle, minDon, tEnd){
      console.log(keyHashes)
      if(this.state.leakageOfSecret!=='undefined'){
        try{
          await this.state.leakageOfSecret.methods.commit(JSON.parse(keyHashes), noEle, revEle, minDon, tEnd).send({from: this.state.account, gas:3000000})
          this.getLeakageOfSecretState()
        } catch (e) {
          console.log('Error, deposit: ', e)
        }
      }
    }

    async revealSample(sampleKeys){
      if(this.state.leakageOfSecret!=='undefined'){
        try{
          await this.state.leakageOfSecret.methods.revealSample(JSON.parse(sampleKeys)).send({from: this.state.account, gas:3000000})
          this.getLeakageOfSecretState()
        } catch (e) {
          console.log('Error, deposit: ', e)
        }
      }
    }

    async donateAmount(donate){
      if(this.state.leakageOfSecret!=='undefined'){
        try{
          await this.state.leakageOfSecret.methods.donate().send({value: donate.toString(),from: this.state.account, gas:3000000})
          this.getLeakageOfSecretState()
        } catch (e) {
          console.log('Error, deposit: ', e)
        }
      }
    }

    async revealRemaining(keys){
      if(this.state.leakageOfSecret!=='undefined'){
        try{
          await this.state.leakageOfSecret.methods.revealRemaining(JSON.parse(keys)).send({from: this.state.account, gas:3000000})
          this.getLeakageOfSecretState()
        } catch (e) {
          console.log('Error, deposit: ', e)
        }
      }
    }

    async initTheft(amount, yC, pkV) {
      if(this.state.keyTheft!=='undefined'){
        try{
          await this.state.keyTheft.methods.initTheft(amount, yC, pkV).send({value: amount.toString(), from: this.state.account, gas:3000000})
          this.getKeyTheftState()
        } catch (e) {
          console.log('Error, deposit: ', e)
        }
        alert("Successfully commited amount for reward")
       
      }
    }

    async claimSecretKey(r, w, commit, response) {
      if(this.state.keyTheft!=='undefined'){
        try{
          await this.state.keyTheft.methods.claimSecretKey(r, w, commit,response).send({from: this.state.account, gas:3000000})
          this.getKeyTheftState()
        } catch (e) {
          console.log('Error, deposit: ', e)
        }
        alert("Successfully claimed reward for key theft")
       
      }
    }

    constructor(props) {
        super(props)
        this.state = {
          account: '',
          keyTheft: null,
          rewardAmount: 0,
          r: 0,
          w: 0,
          commit: 0,
          reponse: 0,
          stateKeyTheft:"",
          leakageOfSecret: null,
          tEnd: 0,
          keyHashes:[],
          noEle : 0,
          revEle: 0,
          minDon: 0,
          donate: 0,
          sampleKeys: null,
          allKeys: null,
          keyTheftState: null,
          leakageOfSecretState: null,
          pkV:0,
          yC:0
        }
    }

    render() {
      return (
        <div className='text-monospace'>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
        <img className="App-logo"  height="32"/>
          <b>Criminal Smart Contracts</b>
        </a>
        </nav>
        <div className="container-fluid mt-5 text-center">
          <br></br>
          <h1>Welcome to Criminal Smart Contract</h1>
          <h3>Key Theft</h3>
          <h3>Account: {this.state.account}</h3>
          <div className="row">
             <main role="main" className="col-lg-12 d-flex text-center">
             <div className="content mr-auto ml-auto">

              <Tabs defaultActiveKey="chooseCrime" id="uncontrolled-tab-example">
                <Tab eventKey="leakageOfSecret" title="leakageOfSecret">
                   <div className="content mr-auto ml-auto">
                   <h3 id = "leakageOfSecretState">{this.state.leakageOfSecretState}</h3>
                   <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                      <Tab eventKey="commitLOS" title="commitLOS">
                          <div>
                         
                            <form onSubmit={(e) => {
                              e.preventDefault()
                              this.initLeak()
                            }}>
                           
                              <button type='submit' className='btn btn-primary'>Init Leakage Of Secret</button>
                            </form>

                          </div>
                      </Tab>
                      <Tab eventKey="commit" title="Commit Keys">
                          <div>
                          <br></br>
                            Commit key hashes for leakage of Secret
                            <form onSubmit={(e) => {
                              e.preventDefault()
                              let keyHashes = this.keyHashes.value     
                              let noEle = this.noEle.value            
                              let revEle = this.revEle.value            
                              let minDon = this.minDon.value            
                              let tEnd = this.tEnd.value            
       
                              this.commitKeyHashes(keyHashes, noEle, revEle, minDon, tEnd)
                            }}>
                              <div className='form-group mr-sm-2'>
                                <br></br>
                                <input
                                  id='keyHashes'
                                 
                                  type='string'
                                  ref={(input) => { this.keyHashes = input }}
                                  className="form-control form-control-md"
                                  placeholder='KeyHashes...'
                                  required />
                                <input
                                  id='noEle'
                                 
                                  type='number'
                                  ref={(input) => { this.noEle = input }}
                                  className="form-control form-control-md"
                                  placeholder='NoEle...'
                                  required />
                                <input
                                  id='revEle'
                                 
                                  type='number'
                                  ref={(input) => { this.revEle = input }}
                                  className="form-control form-control-md"
                                  placeholder='revEle...'
                                  required />
                                <input
                                  id='minDon'
                                 
                                  type='number'
                                  ref={(input) => { this.minDon = input }}
                                  className="form-control form-control-md"
                                  placeholder='minDon...'
                                  required />
                                <input
                                  id='tEnd'
                                 
                                  type='number'
                                  ref={(input) => { this.tEnd = input }}
                                  className="form-control form-control-md"
                                  placeholder='tEnd...'
                                  required />
                              </div>
                              <button type='submit' className='btn btn-primary'>Claim</button>
                            </form>
                          </div>
                      </Tab>
                      <Tab eventKey="revealSample" title="revealSample">
                        <div>
                          <br></br>
                            Reveal sample of keys
                            <form onSubmit={(e) => {
                              e.preventDefault()
                                
                              let sampleKeys = this.sampleKeys.value
                              this.revealSample(sampleKeys)
                            }}>
                                 <input
                                  id='sampleKeys'
                                 
                                  type='string'
                                  ref={(input) => { this.sampleKeys = input }}
                                  className="form-control form-control-md"
                                  placeholder='sampleKeys...'
                                  required />
                                  <button type='submit' className='btn btn-primary'>Reveal Sample Keys</button>

                            </form>
                        </div>
                      </Tab>
                      <Tab eventKey="donate" title="donate">
                          <div>
                         
                            <form onSubmit={(e) => {
                              e.preventDefault()
                              let donate = this.donate.value
                              this.donateAmount(donate)
                            }}>
                              <input
                                  id='donate'
                                 
                                  type='number'
                                  ref={(input) => { this.donate = input }}
                                  className="form-control form-control-md"
                                  placeholder='donate...'
                                  required />
                              <button type='submit' className='btn btn-primary'>Donate Amount</button>
                            </form>

                          </div>
                      </Tab>
                      <Tab eventKey="revealAll" title="revealAll">
                        <div>
                          <br></br>
                            Reveal all keys
                            <form onSubmit={(e) => {
                              e.preventDefault()
                                
                              let allKeys = this.allKeys.value
                              this.revealRemaining(allKeys)
                            }}>
                                 <input
                                  id='allKeys'
                                 
                                  type='string'
                                  ref={(input) => { this.allKeys = input }}
                                  className="form-control form-control-md"
                                  placeholder='allKeys...'
                                  required />
                                  <button type='submit' className='btn btn-primary'>Reveal All Keys</button>

                            </form>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </Tab>
                <Tab eventKey="keyTheft" title="keyTheft">
                 <div className="content mr-auto ml-auto">
                     <h3 id = "keyTheftState">{this.state.keyTheftState}</h3>
                     <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="commit" title="Commit">
                          <div>
                          <br></br>
                            How much do you want to commit?
                          
                            <form onSubmit={(e) => {
                              e.preventDefault()
                              let amount = this.rewardAmount.value    
                              let yC = this.yC.value            
                              let pkV = this.pkV.value            
        
                              this.initTheft(amount, yC, pkV)
                            }}>
                              <div className='form-group mr-sm-2'>
                              <br></br>
                                <input
                                  id='rewardAmount'
                                 
                                  type='number'
                                  ref={(input) => { this.rewardAmount = input }}
                                  className="form-control form-control-md"
                                  placeholder='amount...'
                                  required />
                                 <input
                                  id='yC'
                                 
                                  type='number'
                                  ref={(input) => { this.yC = input }}
                                  className="form-control form-control-md"
                                  placeholder='Public Key of contractor...'
                                  required />
                                <input
                                  id='pkV'
                                 
                                  type='number'
                                  ref={(input) => { this.pkV = input }}
                                  className="form-control form-control-md"
                                  placeholder='Public Key Verifier...'
                                  required />
                              </div>
                              <button type='submit' className='btn btn-primary'>Init</button>
                            </form>

                          </div>
                        </Tab>
                     
                        <Tab eventKey="revealKeys" title="Reveal Keys">
                          <div>
                          <br></br>
                            Enter values for Non interactive zero knowledge proof
                          
                            <form onSubmit={(e) => {
                              e.preventDefault()
                              let r = this.r.value  
                              let w = this.w.value 
                              let commit = this.commit.value 
                              let response = this.response.value          
                              this.claimSecretKey(r, w, commit, response)
                            }}>
                              <div className='form-group mr-sm-2'>
                              <br></br>
                                
                                <input
                                  id='r'
                                 
                                  type='number'
                                  ref={(input) => { this.r = input }}
                                  className="form-control form-control-md"
                                  placeholder='r...'
                                  required />
                                   <input
                                  id='w'
                                 
                                  type='number'
                                  ref={(input) => { this.w = input }}
                                  className="form-control form-control-md"
                                  placeholder='w...'
                                  required />
                                   <input
                                  id='commit'
                                 
                                  type='number'
                                  ref={(input) => { this.commit = input }}
                                  className="form-control form-control-md"
                                  placeholder='commit...'
                                  required />
                                  <input
                                  id='reponse'
                                 
                                  type='number'
                                  ref={(input) => { this.response = input }}
                                  className="form-control form-control-md"
                                  placeholder='reponse...'
                                  required />
                              </div>
                              <button type='submit' className='btn btn-primary'>Claim</button>
                            </form>

                          </div>
                        </Tab>
                      </Tabs>
                 </div>
                 </Tab>
                 </Tabs>
                 </div>
             </main>
          </div>
        </div>
      </div>
      );
    }
}

export default App;