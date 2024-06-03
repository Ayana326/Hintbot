import { Editor } from "@monaco-editor/react";
import { Button } from "@mui/material";
import { FC, MouseEventHandler, useState } from "react";

const DefaultCode: string = `import sys

def main(args):
  print(args)

if __name__ == "__main__":
  args = sys.argv
  main(args[1])
`;

export const IDE: FC<{
  onSubmit?: (code:string)=>void
  onChanged?: (code:string)=>void
}> = ({
  onSubmit=()=>{},onChanged=()=>{},
}) => {
  const [code, setCode] = useState<string>(DefaultCode);
  return (
    <div className="flex items-start flex-col">
      <div className="w-full p-2  border bg-white">
        <div className="">
          <label htmlFor="comment" className="sr-only">
            Add your code
          </label>
          <Editor
            height="40vh"
            defaultLanguage="python"
            defaultValue={code}
            onChange={(v)=>{
              setCode(v??"");
              onChanged(v??"");
            }}
          />
        </div>
        <div className="flex justify-between pt-2">
          <div className="flex items-center space-x-5"></div>
          <div className="flex-shrink-0">
            <Button
              onClick={()=>{onSubmit(code)}}
              variant="outlined"
              color="error"
            >
              実行
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
