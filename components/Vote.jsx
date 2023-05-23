import {useSigner,useContractWrite} from 'wagmi'
import * as ballotJson from '../assets/TokenizedBallot.json'
import {ethers} from 'ethers';
import styles from '../styles/InstructionsComponent.module.css';

export default function Vote({propnum}){
	const {data:signer} = useSigner();

	const {data,isLoading,isSuccess,write} = useContractWrite({
		address: '0x8581C8307D0F2D79b235c64F87C01C4C7aabb94d',
		abi: ballotJson.abi,
		functionName: 'vote',
		args: [propnum,ethers.utils.parseUnits('1')]
	});

	

	return(
		<div>
			<button onClick={() => write()} className={styles.button}>Vote</button>
			{isLoading && <div>Check Wallet</div>}
			{isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
		</div>
	)

}