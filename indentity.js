const EthCrypto = require('eth-crypto');

async function getMessageHash( message ) 
{
    const messageHash = EthCrypto.hash.keccak256(message);
    return messageHash;
}


async function getKeyPair() {

    const identity = EthCrypto.createIdentity();
    
    return identity;
}

async function signMessage ( messageHash, privateKey )
{
    const signedMessage = EthCrypto.sign(
        privateKey, // privateKey
        messageHash // hash of message
    );

    return signedMessage;
}


async function recoverPublicKey(signature, messageHash)
{
    const signer = EthCrypto.recoverPublicKey(
        signature, // signature
        messageHash // message hash
    );

    return signer;
}


async function getAddressFromPublicKey(publicKey)
{
    const address = EthCrypto.publicKey.toAddress(publicKey );

    return address;
}


async function start()
{
    // started sing message
    const messageHash = await getMessageHash('hello');

    const keyPair = await getKeyPair();
    const privateKey = keyPair["privateKey"];
    const publicKey = keyPair["publicKey"];
    const address = keyPair["address"];

    console.log( "prvate key: " + privateKey);
    console.log( "public key: " + publicKey);
    console.log( "address: " + address);

    const signature = await signMessage(messageHash,privateKey);

    // started get signer address

    const singerPublicKey = await recoverPublicKey(signature, messageHash);

    console.log("recovered public key : " + singerPublicKey);

    const singerAddress = await getAddressFromPublicKey( singerPublicKey );

    console.log( "recovered address: "  + singerAddress );
}




start();