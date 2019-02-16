var CollectionRegistry = artifacts.require("./CollectionRegistry.sol");

require('truffle-test-utils').init();
const log = console.log;

class PlayRound {
    constructor(numberOfPips, weiRequired, winner, second, third, placingPhaseActive) {
        this.numberOfPips = numberOfPips;
        this.weiRequired = weiRequired;
        this.winner = winner;
        this.second = second;
        this.third = third;
        this.placingPhaseActive = placingPhaseActive;
    }
}

contract("CollectionRegistry", accounts => {

    let collectionName = "TestCollection 2019";
    let maxItems = 3;

    let manufacturer = accounts[0];
    let maintainer1 = accounts[1];
    let maintainer2 = accounts[2];
    let maintainers = [maintainer1, maintainer2];
    let invalidMaintainer = accounts[3];


    let item1 = accounts[4];
    let item2 = accounts[5];
    let item3 = accounts[6];
    let item4 = accounts[7];

    let itemIdentifier1 = "1337"
    let itemIdentifier2 = "2"
    let itemIdentifier3 = "3"
    let itemIdentifier4 = "4";

    let emptyMaintainers = [];
    let emptyIdentifier = "";

    let collectionRegistry;

    async function deployContract(_name, _maxItems, _maintainers) {
        collectionRegistry = await CollectionRegistry.new(_name, _maxItems, _maintainers, { from: manufacturer });
    }

    describe('DEPLOYMENT', function() {
        it('should be possible to deploy contract with valid params and manufacturer is correct', async function () {
            await deployContract(collectionName, maxItems, maintainers);
            let maintainerOfCollection = await collectionRegistry.manufacturer.call();
            expect(maintainerOfCollection).equal(manufacturer);
        });
        it('should NOT be possible to deploy contract with empty identifier', async function () {
            try {
                await deployContract(emptyIdentifier, maxItems, maintainers);
                assert.fail('should fail');
            } catch(error){
                assertInvalidOpCode(error);
            }
        });
        it('should NOT be possible to deploy contract with empty maintainers', async function () {
            try {
                await deployContract(collectionName, maxItems, emptyMaintainers);
                assert.fail('should fail');
            } catch(error){
                assertInvalidOpCode(error);
            }
        });
    });
    describe('ADD ITEMS', function() {
        it('should be possible to add valid item as maintainer and event is emitted and checkItem', async function () {
            await deployContract(collectionName, maxItems, maintainers);
            let itemEvent = await collectionRegistry.addItem(item1, itemIdentifier1, "", {from: maintainer1});
            assert.web3Event(itemEvent, {
                event: 'itemAdded',
                args: {
                    0: item1,
                    1: itemIdentifier1,
                    2: '',
                    __length__: 3,
                    publicKey: item1,
                    identifier: itemIdentifier1,
                    metaData: ''
                }
              }, 'itemAdded-event is emitted');
            let itemExists1 = await collectionRegistry.checkItem(item1);
            expect(itemExists1).equal(true);
            let itemExists2 = await collectionRegistry.checkItem(item2);
            expect(itemExists2).equal(false);
        });
        it('should NOT be possible to add an item as invalid maintainer', async function () {
            await deployContract(collectionName, maxItems, maintainers);
            try {
                await collectionRegistry.addItem(item1, itemIdentifier1, "", {from: invalidMaintainer});
                assert.fail('should fail');
            } catch(error){
                assertInvalidOpCode(error);
            }
        });
        it('should NOT be possible to add the same item twice', async function () {
            await deployContract(collectionName, maxItems, maintainers);
            await collectionRegistry.addItem(item1, itemIdentifier1, "", {from: maintainer1});
            // 1. should fail with same publicKey but different identifier
            try {
                await collectionRegistry.addItem(item1, itemIdentifier2, "", {from: maintainer1});
                assert.fail('should fail');
            } catch(error){
                assertInvalidOpCode(error);
            }
            // 2. should fail with same identifier but different publicKey
            try {
                await collectionRegistry.addItem(item2, itemIdentifier1, "", {from: maintainer1});
                assert.fail('should fail');
            } catch(error){
                assertInvalidOpCode(error);
            }
        });
        it('should NOT be possible to add an item with empty identifier', async function () {
            await deployContract(collectionName, maxItems, maintainers);
            try {
                await collectionRegistry.addItem(item1, "", "", {from: maintainer1});
                assert.fail('should fail');
            } catch(error){
                assertInvalidOpCode(error);
            }
        });
        it('should NOT be possible to add a new item if maxItems is reached', async function () {
            await deployContract(collectionName, maxItems, maintainers);
            await collectionRegistry.addItem(item1, itemIdentifier1, "", {from: maintainer1});
            await collectionRegistry.addItem(item2, itemIdentifier2, "", {from: maintainer2});
            await collectionRegistry.addItem(item3, itemIdentifier3, "", {from: maintainer1});
            try {
                await collectionRegistry.addItem(item4, itemIdentifier4, "", {from: maintainer2});
                assert.fail('should fail');
            } catch(error){
                assertInvalidOpCode(error);
            }
        });
    });

    function assertInvalidOpCode(error) {
		assert(
			error.message.indexOf('VM Exception while processing transaction: revert') >= 0,
			'Method should have reverted'
		);
	}
})