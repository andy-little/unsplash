import { rest } from "msw";
import { data } from "./mockData";
export const handlers = [
    rest.get("https://api.unsplash.com/photos", (req, res, ctx) => {
        return res(ctx.json(data));
    }),
];
