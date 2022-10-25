import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import { useMoralis, useMoralisWeb3Api,account,isAuthenticated,useWeb3ExecuteFunction} from "react-moralis";
import { ConnectButton,Input,Button} from "web3uikit";
import Player from './Player'
import Webcam from'react-webcam'
import { QrReader } from 'react-qr-reader';
import CryptoPe from './Cryp.png'


const Home = () => {
  const q=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,
           54,55,56,57,58,59,60,61,62,63,64,65
          ]
  const Web3Api = useMoralisWeb3Api();
  const contractProcessor = useWeb3ExecuteFunction();
  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };
  const { isAuthenticated, Moralis,account } = useMoralis();

    const fetchNFTs = async () => {
      const options = {
        chain: "mumbai",
        address:"0xdF5Ce0Eb85390170C08c277B5c07c7F0ea435898"
      }

      const mumbaiNFTs = await Web3Api.account.getNFTs(options);
      console.log(mumbaiNFTs.result[0])
      console.log(account)
     
      // setPfps(images);
    }
    async function maticTweet() {

     
      let options = {
        contractAddress: "0x1CcC44B7EEE16fe3AFca256514b5be424e7f280b",
        functionName: "Pay",
        abi: [{
          "inputs": [
            {
              "internalType": "address",
              "name": "a",
              "type": "address"
            }
          ],
          "name": "Pay",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }],params: {
         a:data
        },
        msgValue: Moralis.Units.ETH(amount),
      }
    
        await contractProcessor.fetch({
          params: options,
          onSuccess: () => {
            console.log("saved on blockchain")
          },
          onError: (error) => {
            console.log(error.data.message)
          }
        });
    
      }
  const [address,setAddress]=useState('')
  const [data, setData] = useState('No result');
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState();

      const handler=(event)=>{
        setAddress(event.target.value)
      }
      const amountset=(event)=>{
        setAmount(event.target.value)
      }
 
 
return(
  <>
  
  
    
      { 
      <div class="connectbutton">
  <ConnectButton/>
  <br></br>
  
  </div>
      }
  
      {!isAuthenticated && <img class="logo" src={CryptoPe}/>}
      
 
     
     {/* Wallet Address<input value={address} onChange={handler}/> */}
     
 {/* <img src={nft}/> */}
 

  <br></br>
  
  {!visible && isAuthenticated &&
  <div class="qr">
  <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            setAddress(result?.text)
            setVisible(true)
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      
      <img class="logo1" src={CryptoPe}/>
      </div>
}     
      {visible && isAuthenticated &&
      <div class="modal">
        <div style={{'color':'white'}}>
          To
          &nbsp;
      {address}
      </div>
      <br></br>
      
     
<Input
  label="Enter Amount"
  
  onChange={amountset}
/>
<br></br>
     <div class="modal-content">
     {address && <Button
      onClick={maticTweet}
      text="Send"
      theme="primary"
/> }
<br></br>
     <Button
     color="red"
      onClick={()=>{
        setVisible(false)
      }}
      text="Cancel"
      theme="colored"
/>
      
      
     
      </div>
      <br></br>
      <img class="logo2" src={CryptoPe}/>
      </div>
     
}
    
  </>
)
}

export default Home;
