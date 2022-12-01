import axios from 'axios'

describe('api exists', () => {
  it('GET /info for users should return 200 response', (done) => {
    axios.get("https://dev-marketplace-api.fly.dev/members")
     .then((response) => {
       expect(response.status).toBe(200); 
       done();
     })
  })  
  it('GET /info for properties should return 200 response', (done) => {
    axios.get("https://dev-marketplace-api.fly.dev/properties")
     .then((response) => {
       expect(response.status).toBe(200); 
       done();
     })
  })
  it("API Response for members should be valid json", (done) => {
    axios.get("https://dev-marketplace-api.fly.dev/members")
      .then((response) => {
        expect(() => {
          JSON.stringify(response.body);
      }).not.toThrow();
      done();
      })
    });  
  it("API Response for properties should be valid json", (done) => {
  axios.get("https://dev-marketplace-api.fly.dev/properties")
    .then((response) => {
      expect(() => {
        JSON.stringify(response.body);
    }).not.toThrow();
    done();
    })
  });
 });
