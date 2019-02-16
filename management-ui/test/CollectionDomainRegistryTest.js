var CollectionDomainRegistry = artifacts.require("./CollectionDomainRegistry.sol");

const log = console.log;

contract("CollectionDomainRegistry", accounts => {

    let collectionDomainRegistry;

    async function deployContract() {
        collectionDomainRegistry = await CollectionDomainRegistry.new({ from: accounts[0] });
    }

    it('deploy contract works', async function () {
        await deployContract();
    });
    it('add new domain as owner works', async function () {
        let domain = "domain.test";
        await deployContract();
        let domainNames = await collectionDomainRegistry.collectionDomains.call();
        expect(domainNames).equal("");
        await collectionDomainRegistry.addDomain(domain);
        domainNames = await collectionDomainRegistry.collectionDomains.call();
        expect(domainNames).equal(domain);
    });
    it('add new domain as other user fails', async function () {
        let domain = "domain.test";
        await deployContract();
        try {
            await collectionDomainRegistry.addDomain(domain, {from: accounts[0]});
        } catch(error) {
            assertInvalidOpCode(error);
        }
    });
    it('add multiple domain works', async function () {
        let domain1 = "foo.test";
        let domain2 = "bar.test"
        await deployContract();
        let domainNames = await collectionDomainRegistry.collectionDomains.call();
        expect(domainNames).equal("");
        await collectionDomainRegistry.addDomain(domain1);
        domainNames = await collectionDomainRegistry.collectionDomains.call();
        expect(domainNames).equal(domain1);
        await collectionDomainRegistry.addDomain(domain2);
        domainNames = await collectionDomainRegistry.collectionDomains.call();
        expect(domainNames).equal(domain1 + "," + domain2);
    });

    function assertInvalidOpCode(error) {
		assert(
			error.message.indexOf('VM Exception while processing transaction: revert') >= 0,
			'Method should have reverted'
		);
	}
})