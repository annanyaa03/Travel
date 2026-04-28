import { searchHotels } from './src/controllers/hotels.controller.js';

// Mock request and response
const mockReq = (query) => ({
  query
});

const mockRes = () => {
  const res = {};
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.body = data;
    return res;
  };
  return res;
};

async function test() {
  console.log('--- Testing searchHotels controller ---');

  // Test 1: Valid city
  console.log('\nTest 1: Valid city');
  const res1 = mockRes();
  await searchHotels(mockReq({ city: 'Paris' }), res1);
  console.log('Status:', res1.statusCode);
  console.log('Body success:', res1.body?.success);
  console.log('Body city:', res1.body?.data?.city);

  // Test 2: Missing city
  console.log('\nTest 2: Missing city');
  const res2 = mockRes();
  await searchHotels(mockReq({ city: '' }), res2);
  console.log('Status:', res2.statusCode);
  console.log('Body message:', res2.body?.message);

  // Test 3: Malformed city (with :1 suffix)
  console.log('\nTest 3: Malformed city (Paris:1)');
  const res3 = mockRes();
  await searchHotels(mockReq({ city: 'Paris:1' }), res3);
  console.log('Status:', res3.statusCode);
  console.log('Sanitized city:', res3.body?.data?.city);

  // Test 4: Guests as malformed string (2:1)
  console.log('\nTest 4: Malformed guests (2:1)');
  const res4 = mockRes();
  await searchHotels(mockReq({ city: 'London', guests: '2:1' }), res4);
  console.log('Status:', res4.statusCode);
  console.log('Parsed guests should be 2. (Manual check in code needed or log added)');

  console.log('\nTests completed.');
}

// Note: This script might fail to run directly because of imports (supabase, hotelService)
// but it shows the intent and can be used with a test runner or if we mock those services.
// Since I can't easily run it without mocking services, I'll just keep it as a reference
// or try to run it if the user wants.
