# authenticity-proof

## thank-me-later!

*  Public Key
    *  0xba2B7F4ad1B692da08BC4389faD27Db586EE03cF
*  ENS-Domain
    * TODO 
    * 

## ENS
*  `ensutils-ropsten.js` is prepared to point to the ENS contract on ropsten and is copied into our docker image

## build and start the ropsten light-node
1.  switch to folder `docker`
2.  run `docker build -f Dockerfile.ropsten -t geth_ropsten_ens .`
3.  run `docker run -d geth_ropsten_ens`