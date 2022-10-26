const Hello = artifacts.require("Hello");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Hello", function (accounts) {
  it("should assert true", async function () {
    await Hello.deployed();
    return assert.isTrue(true);
  });
  //Describe a function called greet()
  describe("greet()",()=> {
    it("should return 'Hello, World!'",async()=>{
      const hello = await Hello.deployed();
      const result = await hello.greet();
      const expected = "Hello, World!";
      assert.equal(result, expected, "Greeted with  Hello world");
    })
  })
  //It should retrun "Hello, World!"

  //Essure function can be called by owner
  describe("owner()",()=>{
    // It can Return Owner
    it("should return the Owner",async()=>{
      const hello = await Hello.deployed();
      const result = await hello.owner();
      assert(result, "the current owner");
    })
    // It can Return Owner Adress
    it("should return the Current Owner Adress",async()=>{
      const hello = await Hello.deployed();
      const result = await hello.owner();
      const expected = accounts[0];
      assert.equal(result, expected,"the current owners adress");
    })
  })
  //update the greetie

  describe("setGreetie()",()=> {
    it("should return the Current Owner Adress",async()=>{
    //deploy
    const hello = await Hello.deployed();
    //set expected
    const expected = "Hello, Human!";
    //set greetie
    const greetie = "Human!";
    //call setGreetie
    await hello.setGreetie(greetie);
    // get actuak
    const actual = await hello.greet();
    //assert
    assert.equal(actual, expected, "Greeted with  'Hello, Human!'");
    })
  })
});
