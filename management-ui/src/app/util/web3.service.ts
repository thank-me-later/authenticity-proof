import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ensAbi, ensAddress } from '../../../../contractAbi';
import { environment } from '../../environments/environment';

declare let require: any;
const Web3 = require('web3');

declare let window: any;

@Injectable()
export class Web3Service {
  private web3: any;
  private accounts: string[];
  public ready = false;

  public accountsObservable = new Subject<string[]>();

  constructor() {
    window.addEventListener('load', (event) => {
      this.bootstrapWeb3();
    });
  }

  public bootstrapWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!');

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    setInterval(() => this.refreshAccounts(), 100);
  }

  sendTransaction(prepared) {
    return prepared.send({
      from: this.accounts[0]
    });
  }

  // used from https://gist.github.com/sterlu/9e47011baedf60921b12d7c3183e25ba
  private namehash(name) {
    var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (name !== '') {
      var labels = name.split(".");
      for (var i = labels.length - 1; i >= 0; i--) {
        node = this.web3.utils.sha3(node + this.web3.utils.sha3(labels[i]).slice(2), { encoding: 'hex' });
      }
    }
    return node.toString();
  }

  deployContract(abi, bytecode, args) {
    const contract = new this.web3.eth.Contract(abi);
    return contract.deploy({
      data: bytecode,
      arguments: args
    })
      .send({
        from: this.accounts[0]
      });
  }

  getContract(abi, address) {
    const contract = new this.web3.eth.Contract(abi, address);
    return contract;
  }

  getEnsRegistry() {
    return this.web3.eth.registry;
  }

  getAddressByEnsName(ensName) {
    return this.web3.eth.ens.getAddress(ensName);
  }

  getSubdomainAddress(ensname) {
    const ens = new this.web3.eth.Contract(ensAbi, ensAddress);
    return ens.methods.resolver(this.namehash(ensname)).call();
  }

  registerEnsDomain(ensName, address) {
    const ens = new this.web3.eth.Contract(ensAbi, ensAddress);

    const parentDomain = environment.topDomain;

    return ens.methods
      .setSubnodeOwner(this.namehash(parentDomain), this.web3.utils.sha3(ensName), this.accounts[0])
      .send({ from: this.accounts[0] })
      .then(() => ens.methods
        .setResolver(this.namehash(ensName + '.' + parentDomain), address)
        .send({ from: this.accounts[0] }))
      .then(() => ensName + '.' + parentDomain);
  }

  private refreshAccounts() {
    this.web3.eth.getAccounts((err, accs) => {
      console.log('Refreshing accounts');
      if (err != null) {
        console.warn('There was an error fetching your accounts.');
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }

      if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
        console.log('Observed new accounts');

        this.accountsObservable.next(accs);
        this.accounts = accs;
      }

      this.ready = true;
    });
  }
}
