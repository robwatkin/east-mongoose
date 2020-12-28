import mongoose from "mongoose";
import Adapter from "../src/adapter"

jest.mock('mongoose');

// beforeEach(() =>  {
//   jest.resetModules();
// });

test('can create an Adapter instance', () => {
  const adapter = new Adapter({ url: "mongodb://localhost:27017/test", options: {} });
  expect(adapter).toBeDefined();
});

describe("with an adapter", () => {
  let adapter;

  beforeEach(() => {
    jest.resetModules();

    adapter = new Adapter({ url: "mongodb://localhost:27017/test", options: {} });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('connect calls mongoose connection', () => {
    adapter.connect().then(() => {
      expect((mongoose.connect as unknown as jest.Mock).mock?.calls?.length).toBe(1);
    });
  });

  test('connect returns db as mongo connection object', () => {
    adapter.connect().then(data => {
      expect(data.db).toBeDefined();
    });
  });

  test("connect calls mongoose.connection.on", () => {
    return (adapter.connect()).then(() => {
      expect((mongoose.connection.on as unknown as jest.Mock).mock.calls.length).toBe(1);
    })
  });

  test("connect catches mongoose error", () => {
    const mongooseError = new Error("Mongoose error");

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // require("mongoose").__setError(mongooseError);

    (mongoose as any).__setError(mongooseError);

    return expect(adapter.connect()).rejects.toBe(mongooseError);
  });

  test("disconnect calls mongoose disconnect", () => {
   
    adapter.connect().then(adapter.disconnect).then(() => {
      expect((mongoose.disconnect as unknown as jest.Mock).mock?.calls?.length).toBe(1);
    });
  })
});
