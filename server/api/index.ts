import express from "express";
import { Coordinator } from "shared/types/coordinator";
import MyType  from "shared/types/resType";

const api = express();

function getRandomInRange(from: number, to: number) : number {
  return (Math.random() * (to - from) + from);
}

api.post("/", async (req: any, res) => {
  const {count, longFrom, longTo, latFrom, latTo} = req.body;
  var ary: any = []; 
  if(ary !== undefined) {
    for (let index = 0; index < count; index++) {
      ary.push({
        long: getRandomInRange(longFrom,longTo),
        lat: getRandomInRange(latFrom, latTo)
      })
    }
  }
  const returnValue: MyType = {
    success: true,
    successMessage: ary,
    errorMessage: null
  };

  res.json(returnValue).end();
});

export default api;
