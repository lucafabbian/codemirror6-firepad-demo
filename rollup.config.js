import {nodeResolve} from "@rollup/plugin-node-resolve"
import css from 'rollup-plugin-css-only';
import virtual from '@rollup/plugin-virtual';



// get config from env var
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG)



export default {
  input: "./src/index.js",
  output: {
    file: "./dist/editor.bundle.js",
    format: "iife"
  },
  plugins: [
    virtual({
      firebaseConfig: `export default ` + JSON.stringify(firebaseConfig)
    }),
    css({ output: 'bundle.css' }),
    nodeResolve(),
  ]
}
