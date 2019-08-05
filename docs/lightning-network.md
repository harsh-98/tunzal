# Entry to lightning network

Lightning network is network of nodes running at layer 2 over bitcoin blockchain. Transactions are possible between different nodes via payment channels at minimal fee. And we can also pay a third party to which we don't have directly connection, via other nodes. This based on telephone/network routing or onion routing. For routing the traffic, nodes can charge a fee. If the cummulative sum of fee for that path is less than the bitcoin transaction fee then it is better to do offchain transaction. Only the opening and closing of channel is recorded on blockchain. Refer [this](https://medium.com/coinmonks/the-lightning-network-how-to-install-and-hopefully-make-money-6e3058e3fa7c) for understanding how lightning network works and the economics behind it.

If we want to connect to lighning network, we have to run full bitcoin node and lnd node. There are many implementations of lightning node like lnd, clightning etc. Refer [readme](https://github.com/lightningnetwork/lnd/tree/master/docker) on how to setup lightning network cluster, for understanding the entire architecture of lightning network.

Refer [BOLT](https://github.com/lightningnetwork/lightning-rfc)(Basis of Lightning Technology) for understanding the lightning node compliance and currently available features.

## BTC pay server

[BTCpayserver](https://github.com/btcpayserver/btcpayserver) provides the functionality of generating invoices for specific addresses, which user can pay. BTCpayserver accepts payment in bitcoin, litecoin and many more, apart from that we can also pay using lightning network. Each BTCpayserver are independent to each other and a service which anyone can deploy. If you want to deploy BTCpay server refer [btcpayserver-docker](https://github.com/btcpayserver/btcpayserver-docker) and [this](https://medium.com/@caribbeanblockchain/btcpay-implementation-guide-accept-crypto-as-a-payment-method-in-the-caribbean-eef3ae1f0ce5) article.
Apart from self hosted BTCpayserver, third-party hosted nodes are also available refer [this](https://bitcoinshirt.co/btcpay-stores/). Pros and cons of using third-party servers is listed on [docs](https://docs.btcpayserver.org/deployment/thirdpartyhosting) of btcpayserver. Join [t.me/btcpayserver](t.me/btcpayserver) for resolving your queries.

## Building applications
It is safe to use bitcoin testnet while testing lightning network as this project is experimental and there is always the risk of losing funds.

To use the service provided by BTCpayserver, we need to create an account, store and merchant facade. I am going to use [testnet.demo.btcpayserver.org](testnet.demo.btcpayserver.org) hosted by BTCpayserver organisation itself. While creating store we have to provide the derviation scheme refer [http://bip32.org/](http://bip32.org/), [https://iancoleman.io/bip39/](https://iancoleman.io/bip39/) and [https://gobittest.appspot.com/PrivateKey](https://gobittest.appspot.com/PrivateKey).

Append the


Reference:
- WIF https://en.bitcoin.it/wiki/Wallet_import_format


# How to use iancoleman with bitpayserver
Generate the passphrase, select the type of network here. `BTC: Bitcoin testnet` and select the format of generated account xpub and xpriv. Then copy the account xpub and append the required prefix and paste in the derivation scheme. Test the hint address and paste first entry.
BTCpayserver derivation scheme -- Because bip44 is legacy, bip49(no suffix) is p2sh and bip84 doesn't have a suffix.

Answer from roughtdust on btcpayserver telegram channel.
```
I think btcpayserver should use a different method for determining the derivation scheme. They are actually different. xpub for legacy, ypub for p2sh-p2wkh and zpub for p2wkh. For multisig, simply using a 2 [xpubA] [xpubB] [xpubC] will signify a 2 of 3 multisig.
```

# For understanding P2PKH, P2SH, P2PK, P2WPKH, P2WSH
- https://programmingblockchain.gitbook.io/programmingblockchain/other_types_of_ownership/p2wsh_pay_to_witness_script_hash
- https://www.soroushjp.com/2014/12/20/bitcoin-multisig-the-hard-way-understanding-raw-multisignature-bitcoin-transactions/
- https://en.bitcoin.it/wiki/List_of_address_prefixes
- https://github.com/lightningnetwork/lnd/pull/2455?source=post_page
- https://bitcoinfaucet.uo1.net/ bitcoin faucet unlimited