var Attestation = artifacts.require('./Attestation.sol');

contract('Attestation', function(accounts) {

  before(async function(){
    contract = await Attestation.deployed();
  });

  it("Contract is deployed", async function() {
    assert(contract);
  });


  it("Can create an organisation", async () => {

    return new Promise((resolve,reject) =>{
      const uportId = "2os9YQ6FPrTqsWDrMpDxCa6BrPd5x4Mh18p";
      var name = "T";
      var registrationNumber = "12";

      var events = contract.OrganisationAdded([accounts[0], uportId], async (err, result) => {
        assert(result.args.orgAddress === accounts[0]);
        assert(result.args.uportId === uportId);
        assert(result.args.name === name);

        var orgsCount = await contract.getOrgsCount.call();

        assert(orgsCount.toNumber() === 1);

        events.stopWatching();

        resolve();
      });

      contract.addOrganisation(uportId, name, registrationNumber);
    });


  });


  it("Can add multiple orgs", async () => {

    const uportId = "2os9YQ6FPrTqsWDrMpDxCa6BrPd5x4Mh18p";
    var name = "T";
    var registrationNumber = "12";


    await contract.addOrganisation("org1", "org1", "1");

    var orgsCount = await contract.getOrgsCount.call();

    assert(orgsCount == 2);

    for (var i = 0; i < orgsCount.toNumber(); i++){
      var org = await contract.orgs.call(i);
      assert(org[1]);
    }

    org[0].name === "T";
    org[1].name === "org1";

  });

});

