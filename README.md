# authenticity-proof

## Contracts (deployed on ropsten testnet)

### CollectionDomainRegistry
A registry that holds all ENS-domains of CollectionRegistry contracts that were verfied and registered through the service provided by `thank me later!`.

* Address
    * `0x82e37811c79a7730Bd0A145e78187B17142C6ae3`
* ENS-domain
    * `thankmelater.test` (only valid for 28 days)
* Owner
    * `0x82e37811c79a7730Bd0A145e78187B17142C6ae3`

### CollectionRegistry
This is a contract that can be deployed by a creators or manufacturers for general collections or special limited collections.

The contract is open-source and can be used be everyone.

`thank me later!` verifies the identity of creators or manufacturers and registers a subdomain of `thankmelater.test` for each of their collections.

* Address
    * dynamic for each collection
    * can be registered through `thank me later!` and obtain a unique subdomain

## *deprecated (not needed in this project)*
### docker 
1. switch to folder `docker`
2. run `docker build -f Dockerfile.ropsten -t geth_ropsten_ens .`
3. run `docker run -d geth_ropsten_ens`

### geth
* https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts
* https://ethereum.stackexchange.com/questions/28703/full-list-of-geth-terminal-commands