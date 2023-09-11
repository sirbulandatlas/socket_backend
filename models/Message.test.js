const mockDb = require("mock-knex");
const { knex } = require("../utils");
const tracker = require("mock-knex").getTracker();
const Message = require("./Message");

describe("Message", () => {
  beforeEach(() => {
    tracker.install();
  });

  afterEach(() => {
    tracker.uninstall();
  });

  beforeAll(() => {
    mockDb.mock(knex);
  });

  afterAll(() => {
    mockDb.unmock(knex);
  });

  it("should insert message details into the database", async () => {
    const expectedData = {
      content: "Test message",
      sender_id: 1,
      send_by: "user123",
      conversation_id: 123,
    };

    const expectedInsertedData = {
      ...expectedData,
      id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };

    tracker.on("query", function sendResult(query) {
      query.response([
        expectedInsertedData
      ]);
    });
    
    const [insertedMessage] = await Message.saveMessageDetails(expectedData);

    expect(insertedMessage).toEqual(expectedInsertedData);
  });
});
