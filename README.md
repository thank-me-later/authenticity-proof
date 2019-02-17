# authenticity-proof

## Components
* Ethereum Smart Contracts
    * [CollectionDomainRegistry](management-ui/contracts/CollectionDomainRegistry.sol) (1 instance)
        * here we store all ENS-domains of CollectionRegistry instances in a comma separated list
    * [CollectionRegistry](management-ui/contracts/CollectionRegistry.sol) (∞ instances)
        * contains an array of items that belong to this collection
        * new (unique) items can be added until maxLimit is reached
* Management UI
    * list existing collections by `ENS-domain`
        * ENS-lookup
    * deploy new `CollectionRegistry` instances
    * register ENS-subdomain for the new instance
    * add items to existing collections
* Mobile APP
    * NFC communication
    * ENS-lookup for collections
    * verification of items
        * check if items exist in collection
        * generate random msg
        * verify signed random msg
* Arduino (prototype for NFC+SecureElement)
    * NFC communication
    * sign message

***Disclaimer***

* *due to the limitations of the arduino hardware it wasn't possible to generate an ethereum keypair and sign messages on the hardware.*
* *the final product would be a minuscule device that combines NFC with a secure element and is able to generate keypairs and sign messages*

## Flows
* [CollectionRegistryFlow / ProductVerificationFlow](documentation)

## Slides
* [Identity__of_Things.pdf](slides/Identity__of_Things.pdf)

## Contracts (deployed on ropsten testnet)

### CollectionDomainRegistry
A registry that holds all ENS-domains of CollectionRegistry contracts that were verified and registered through the service provided by `thank me later!`.

* Address
    * [0x82e37811c79a7730Bd0A145e78187B17142C6ae3](https://ropsten.etherscan.io/address/0x82e37811c79a7730Bd0A145e78187B17142C6ae3)
* ENS-domain
    * `thankmelater.test` (only valid for 28 days)
* Owner
    * `0xba2B7F4ad1B692da08BC4389faD27Db586EE03cF`

### CollectionRegistry
This is a contract that can be deployed by a creators or manufacturers for general collections or special limited collections.

The contract is open-source and can be used be everyone.

`thank me later!` verifies the identity of creators or manufacturers and registers a subdomain of `thankmelater.test` for each of their collections.

* Address
    * dynamic for each collection
    * can be registered through `thank me later!` and obtain a unique subdomain
* Example (`crew-collection`)
    * address [0x0BF28f9876feE68D05B56A0Bc33D3c3dfAF95820](https://ropsten.etherscan.io/address/0x0bf28f9876fee68d05b56a0bc33d3c3dfaf95820)
    * domain `crew.thankmelater.test`
    * maintainers
        * `0xFb43318088588a4cb9Bd172b54C0B1c0F328570B`

## *deprecated (not needed in this project)*
### docker 
1. switch to folder `docker`
2. run `docker build -f Dockerfile.ropsten -t geth_ropsten_ens .`
3. run `docker run -d geth_ropsten_ens`

### geth
* https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts
* https://ethereum.stackexchange.com/questions/28703/full-list-of-geth-terminal-commands