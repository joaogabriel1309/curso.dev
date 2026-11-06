import js from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import jest from "eslint-plugin-jest";
import prettier from "eslint-config-prettier";

const eslintConfig = [
  js.configs.recommended,
  jest.configs["flat/recommended"],
  ...nextVitals,
  prettier,
  { ignores: [".next/**", "node_modules/**"] },
];

export default eslintConfig;
