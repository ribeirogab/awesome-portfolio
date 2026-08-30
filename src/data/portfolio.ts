import { type Portfolio, portfolioSchema } from "@/schema/portfolio";
import raw from "../../portfolio.json";

export const portfolio: Portfolio = portfolioSchema.parse(raw);
