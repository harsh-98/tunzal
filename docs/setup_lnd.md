### Process

Install latest version of golang for lnd building
Next go get the lnd and compile it and add $GOPATH/bin to PATH
then:
```
lnd --bitcoin.active --bitcoin.testnet --debuglevel=debug --bitcoin.node=neutrino --neutrino.connect=faucet.lightning.community
```

Use `lncli create` for creating wallet.db and *.macaroon in the `~/.lnd/chain/data/bitcoin/testnet/`

Then on closing the lnd we have to unlock the channel again by `lncli --network  testnet unlock`


### Web interface
Using https://github.com/mably/lncli-web:
- edit config/default.js for setting the correct macaroon path
- connect it with the lnd instance

### Lncli

- `lncli --network  testnet listpeers` list the peer
- `lncli --network  testnet openchannel --node_key=<pub-key> --local_amt=1000000` after connecting to peer
- `lncli --network  testnet pendingchannels` list the pendingchannels
- `lncli --network  testnet listchannels` list the channels
- `lncli --network  testnet  decodepayreq <encoded-pay-req>`
- `lncli --network  testnet getchaninfo <channel-id-not-the-opening-transaction-hash hex:id>`

sample-lnd.conf
sample-btcd.conf

##### Refer:
- https://medium.com/@marcdown/lightning-payments-with-lnd-25a3b7764bcb
- https://api.lightning.community/?shell#pendingupdate

### References:
- https://explorer.acinq.co/
- https://medium.com/chainrift-research/invoiceless-lightning-payments-with-sphinx-ce14af83cb8c sphinx for cashless payment
- https://dev.lightning.community/tutorial 4 tutorials on setting up the lnd cluster you can skip the 1 tutorial , but it is better to have that knowledge
- When running neutrino light wallet with lnd we have to specify the peer address on installation https://faucet.lightning.community/ is given
- Checking the block height of mainnet and testnet https://live.blockcypher.com/btc-testnet/
- slack of the lightingnetwork


### Help from slack

- I found the problem lncli create
- me: earlier i was using the 24 words mnemonics from https://iancoleman.io/bip39/
- And it was throwing some wrong seed version

- slack: ah i see.. Well, that is something many people are still confused. but note that LND does NOT use BIP39.  LND uses aezeed cipher scheme which no other wallets use it
- https://github.com/lightningnetwork/lnd/blob/d541ebe3765bc0db9fe568332f7aabd3a2014612/aezeed/README.md


