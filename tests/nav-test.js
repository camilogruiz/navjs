'use strict'

const test = require('ava');
const sinon = require('sinon');
const itemFixtures = require('./fixtures/item');

let single = Object.assign({}, itemFixtures.single)
let singleItemStub = null;
let multipleItemStub = null;
let loadDataStub = null;
let server = null;

// Creamos un sanbox para utilizar un nuevo spy en cada prueba que se realice
let sandbox = null
test.beforeEach(async () => {
  sandbox = sinon.sandbox.create();

  singleItemStub = sandbox.stub();
  singleItemStub.returns(Promise.resolve(itemFixtures.bySingleItem()));

  multipleItemStub = sandbox.stub();
  multipleItemStub.returns(Promise.resolve(itemFixtures.byMultipleItem()));

  server = sinon.createFakeServer();
});

test.afterEach(() => {
  sandbox && sinon.sandbox.restore();
  server.restore();
})

test.serial('Item#singleItem', async t => {
  let res = await singleItemStub();
  t.true(singleItemStub.called, 'singleItem should be called on model');
  t.true(singleItemStub.calledOnce, 'singleItem should be called once');
  t.deepEqual(res, itemFixtures.bySingleItem(), 'should be the same');
});

test.serial('Item#multipleItem', async t => {
  let res = await multipleItemStub();
  t.true(multipleItemStub.called, 'multipleItem should be called on model');
  t.true(multipleItemStub.calledOnce, 'multipleItem should be called once');
  t.deepEqual(res, itemFixtures.byMultipleItem(), 'should be the same');
});

test.serial("Item#dataServer", async t => {
  // This is part of the FakeXMLHttpRequest API
  server.respondWith("GET", "/api/nav.json",
      [200,
      { "Content-Type": "application/json" },
      JSON.stringify([{ id: 1, label: "Work", url: '#/work', items: [] }])
      ]);
  server.respond();
  t.true(server.responses[0].response.length > 0, 'should get data');
});