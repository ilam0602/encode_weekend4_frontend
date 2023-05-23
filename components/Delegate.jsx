import { useState } from "react";
import { useSigner, useContractWrite } from "wagmi";
import * as tokenJson from "../assets/MyERC20Votes.json";
import Link from "next/link";
import styles from '../styles/InstructionsComponent.module.css';

export default function Delegate() {
  const { data: signer } = useSigner();

  const [address, setAddress] = useState(null);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0xBd8D607d146aC196051280d4Cb7952D95dA6F3bd",
    abi: tokenJson.abi,
    functionName: "delegate",
    args: [address],
  });

  return (
    <div className={styles.request_button}>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
				className={styles.button}
      />
      <button onClick={() => write()} className={styles.button}>Delegate</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && (
        <div className={styles.request_button}>
          Delegate Transaction:<br/>
          <Link href={`https://goerli.etherscan.io/tx/${data.hash}`} className={styles.tx_link}>
            {data.hash}
          </Link>
        </div>
      )}
    </div>
  );
}
