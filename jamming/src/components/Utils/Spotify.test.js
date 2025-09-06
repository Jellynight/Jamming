/** @format */

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
//
import "@testing-library/jest-dom";
import Spotify from "./Spotify";

// Mocking the Spotify API
const fetchData = Spotify.requestAuthorization();

global.fetch = jest.fn(() =>
 Promise.resolve({
  json: () => Promise.resolve({ data: "mocked data" }),
 })
);

test("fetchData returns mocked data", async () => {
 const data = await fetchData;
 
 expect(data).toEqual({ data: "mocked data" });
});

test("fetch tracks from spotify api", async () => {

 const dat = await Spotify.search("live");
 expect(dat).toEqual({ data: "mocked data" });
});

test("fetch user data", async () => {
      const d = await Spotify.getUserId();
      expect(d).toEqual({ data: 'mocked data'})
})
