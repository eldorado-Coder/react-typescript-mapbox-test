import express from "express";
import { Coordinator } from "shared/types/coordinator";
import { MyType } from "shared/types/restypes";
import { RangeType } from "shared/types/rangetype";

const api = express();

function getRandomInRange(from: number, to: number) : number {
  return (Math.random() * (to - from) + from);
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

api.post("/", async (req, res) => {
  var count = 10;
  var ary: any = [];

  if(ary !== undefined) {
    for (let index = 0; index < count; index++) {
      ary.push({
        long: getRandomInRange(10,11),
        lat: getRandomInRange(11,12)
      })
    }
  }
  console.log(ary)
  const returnValue: MyType = {
    success: true,
    successMessage: ary,
    errorMessage: null
  };

  res.json(returnValue).end();
});

export default api;
