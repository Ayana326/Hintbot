"use client";

import { PyodideInterface, loadPyodide } from "pyodide";
import { useEffect, useState } from "react";

export const usePythonExecuter = (
  stdin: (msg: string) => void,
  stdout: (msg: string) => void,
) => {
  const [executer, setExecuter] = useState<PythonExecuter | null>(null);

  useEffect(() => {
    const initializeExecuter = async () => {
      const _executer = new PythonExecuter("", stdin, stdout);
      await _executer.init();
      setExecuter(_executer);
      return _executer;
    };
    initializeExecuter();
  }, [stdin, stdout]);

  return executer;
};

export class PythonExecuter {
  _pyodide: PyodideInterface | undefined;
  _stdin: ((msg: string) => void) | undefined;
  _stdout: ((msg: string) => void) | undefined;
  stdinLineIndex = 0;
  stdinString = "";
  stdinCallback =  () => {
    let stdinString = this.stdinString;
    let stdinLines = stdinString.split("\n")
    if (this.stdinLineIndex<stdinLines.length){
      return stdinLines[this.stdinLineIndex++]
    }else{
      return ""
    }
  };

  constructor(stdinString:string,stdin: (msg: string) => void, stdout: (msg: string) => void) {
    this._stdin = stdin;
    this._stdout = stdout;
    this.stdinString = stdinString;
  }

  async init() {
    if (!this._pyodide) {
      this._pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
        stdin: this.stdinCallback,
        stdout: this._stdin,
        stderr: this._stdout,
      });
    }
    await this._pyodide.loadPackage(["numpy"]);
    return;
  }

  exec(code: string): void {
    if (this._pyodide) {
      this.stdinLineIndex = 0
      this._pyodide.runPython(code);
      return;
    } else {
      throw Error("Pyodide not found. Please run `init()` first.");
    }
  }
}
